import json
import os

import chembl_ikey

import dal
import padding
import routing
from exceptions import InvalidMDBAttrException, InvalidInChIException

# whether to depad EDB_IDs and Inchi
DDB_DEPAD = True


def handler(event, context):

    if resp := routing.handle(event, context):
        return resp

    return {
        "statusCode": 400,
        "body": ""
    }


@routing.route('/metabolites/{mid}')
def fetch_metabolite(event, context):
    """
    Query by Primary MID. This is usually the InChI Key, or rarely a unique ID generated from Chebi/HMDB IDs (in case inchi is missing)
    :param event: aws api gw 2.0 event
    :param context: aws lambda context
    :return: aws api gw 2.0 response
    """
    mid = event['queryStringParameters']['mid']

    # query by primary ID
    meta = dal.get_by_inchix(mid)

    return metabolite_response('mid', mid, meta, [mid])


@routing.route('/metabolites/by/{edb_tag}/{edb_id}')
def query_by_edb_id(event, context):
    """

    :param event: aws api gw 2.0 event
    :param context: aws lambda context
    :return: aws api gw 2.0 response
    """
    attr = event['queryStringParameters']['edb_tag']
    value = event['queryStringParameters']['edb_id']

    # guarantee presence or absence of ID padding depending on what's inserted to DDB
    if DDB_DEPAD:
        query_value = padding.depad_id(value, attr)
    else:
        query_value = padding.pad_id(value, attr)

    meta, mids = query_metabolite(attr, query_value)

    return metabolite_response(attr, query_value, meta, mids)


@routing.route('/metabolites/struct/{struct_tag}', methods=['POST'])
def query_by_struct(event, context):
    """

    :param event: aws api gw 2.0 event
    :param context: aws lambda context
    :return: aws api gw 2.0 response
    """
    struct_tag = event['queryStringParameters']['struct_tag']
    body = json.loads(event['body'])

    try:
        struct_value = body[struct_tag]

        if struct_tag == 'inchi':
            # transform inchi to inchikey so that there's no need to store DDB search key entries for inchi
            struct_tag = 'inchikey'
            struct_value = chembl_ikey.inchi_to_inchikey(struct_value)

            if struct_value is None:
                raise InvalidInChIException()

            meta = dal.get_by_inchix(struct_value)

            return metabolite_response(struct_tag, struct_value, meta, [struct_value])
        elif struct_tag in {'inchikey', 'smiles', 'formula'}:

            meta, mids = query_metabolite(struct_tag, struct_value)

            return metabolite_response(struct_tag, struct_value, meta, mids)
        elif struct_tag == 'mol':
            # @todo: implement MOL/SDF queries
            raise dal.InvalidMDBAttrException("MOL queries are not implemented yet.")
        else:
            raise dal.InvalidMDBAttrException(f"Invalid struct query '{struct_tag}'")
    except (dal.InvalidMDBAttrException, KeyError) as e:
        err_code = e.code if hasattr(e, 'code') else dal.InvalidMDBAttrException.code

        return {
            "statusCode": 400,
            "body": json.dumps({
                "code": err_code,
                "err": "invalid_attr",
                "message": str(e),
            })
        }


def query_metabolite(attr, query_value):
    try:
        mid_ref = dal.get_inchix_by_attr(attr, query_value)

        if isinstance(mid_ref, list):
            # Inchi/MID is only queried if a single item is found for query parameters
            # this is to save network traffic
            if len(mid_ref) == 1:
                meta = dal.get_by_inchix(mid_ref[0])
            else:
                meta = None
            mids = mid_ref
        elif mid_ref is None:
            meta = None
            mids = []
        else:
            meta = dal.get_by_inchix(mid_ref)
            mids = [mid_ref]

    except InvalidMDBAttrException as e:
        return {
            "statusCode": 400,
            "body": json.dumps({
                "code": e.code,
                "err": "invalid_attr",
                "message": str(e),
            })
        }

    return meta, mids


def metabolite_response(attr: str, value: str, meta: dict | None, mids: list):
    return {
        "statusCode": 200 if meta and mids else 404,
        "body": json.dumps({
            "query": {
                "attr": attr,
                "value": value,
                "direct_hit": len(mids) == 1 or bool(meta)
            },
            "metabolite": meta,
            "mids": mids
        })
    }
