import boto3
from botocore.exceptions import ClientError

ROOM_TPL = 'Chat:room:{}'
ddb = boto3.resource('dynamodb')
table = ddb.Table('Metabolites')


def get_metabolite(meta_id):
    try:
        response = table.get_item( Key={'mid': meta_id} )

        if response is None or 'Item' not in response:
            return {"messages": [], "conids": {}}

        return response['Item']
    except ClientError:
        return {"messages": [], "conids": {}}
