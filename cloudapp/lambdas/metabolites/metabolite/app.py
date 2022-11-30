import os
import dal


def handler(event, context):

    # TODO: authenticate with JWT
    mid = event['queryStringParameters']['mid']

    # TODO: get by index & attributes

    meta = dal.get_metabolite(mid)

    if not meta:
        return {
            "statusCode": 404,
            "body": ""
        }

    return {
        "query": {
            "mid": mid
        },
        "metabolite": meta
    }
