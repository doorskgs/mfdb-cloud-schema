import boto3
from botocore.exceptions import ClientError
from exceptions import InvalidMDBAttrException, InconsistentInChIAsMidException


ROOM_TPL = 'Chat:room:{}'
ddb = boto3.resource('dynamodb')
table = ddb.Table('Metabolites')


attr_prefix = {
    'pubchem_id': 'P', 'chebi_id': 'C', 'hmdb_id': 'H', 'kegg_id': 'K', 'lipmaps_id': 'L',
    'smiles': 'S', 'pname': 'N',
    'cas_id': 'A', 'chemspider_id': 'X', 'metlin_id': 'M', 'swisslipids_id': 'Sw',
    'inchikey': '',
    # 'formula': 'F',
    # 'inchikey': 'I', 'inchi': 'Iv',
}

def get_by_inchix(inchix) -> dict | None:
    try:
        response = table.get_item( Key={'mid': inchix} )

        if response is None or 'Item' not in response:
            return None

        item = response['Item']
        if 'mrf' in item:
            # secondary inchi key, this refers to an MID inchi key, essentially a redirection
            if isinstance(item['mrf'], list):
                # no secondary inchi search key should be in the state where it refers to multiple MIDs
                raise InconsistentInChIAsMidException()
            return get_by_inchix(item['mrf'])

        return item
    except ClientError:
        return None

def get_inchix_by_attr(attr, value) -> str | list | None:
    P = attr_prefix.get(attr, attr_prefix.get(attr + '_id'))
    if P is None:
        # nonexistent or non-queryable attr
        raise InvalidMDBAttrException()
    elif attr == 'inchikey':
        raise InvalidMDBAttrException()

    try:
        search_key = ':'.join([P, value])
        search_item = table.get_item( Key={'mid': search_key} )
    except ClientError as e:
        raise InvalidMDBAttrException(str(e))

    if search_item is None or 'Item' not in search_item:
        return None

    return search_item['Item']['mrf']
