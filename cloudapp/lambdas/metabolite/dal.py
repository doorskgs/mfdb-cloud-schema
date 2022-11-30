import boto3
from botocore.exceptions import ClientError

ROOM_TPL = 'Chat:room:{}'
ddb = boto3.resource('dynamodb')
table = ddb.Table('EsEnts')


def get_metabolite(meta_id):
    try:
        response = table.update_item(
            Key={'sid': 'meta:'},
            UpdateExpression=f"set conids.#uid = :usr",
            ExpressionAttributeNames={'#uid': uid},
            ExpressionAttributeValues={':usr': [username, conid]},
            ReturnValues="ALL_NEW"
        )

        if response is None or 'Item' not in response:
            return None
        return response['Item']
    except ClientError:
        return None


def leave_room(room_id, uid, conid):
    try:
        response = table.update_item(
            Key={'eid': ROOM_TPL.format(room_id)},
            UpdateExpression="delete conids.#uid",
            ExpressionAttributeNames={'#uid': uid},
            ReturnValues="ALL_NEW"
        )

        if response is None or 'Item' not in response:
            return None
        return response['Item']
    except ClientError:
        return None


def add_message(room_id, msg, t0, uid, username):
    try:
        response = table.update_item(
            Key={'eid': ROOM_TPL.format(room_id)},
            UpdateExpression=f"set messages = list_append(messages, :msg)",
            ExpressionAttributeValues={':msg': [t0, uid, username, msg]},
            ReturnValues="ALL_NEW"
        )

        if response is None or 'Item' not in response:
            return None
        return response['Item']
    except ClientError:
        return None


def get_room(room_id):
    try:
        response = table.get_item(Key={'eid': ROOM_TPL.format(room_id)})

        if response is None or 'Item' not in response:
            return {"messages": [], "conids": {}}

        return response['Item']
    except ClientError:
        return {"messages": [], "conids": {}}


def create_room(room_id, t0, uid):
    try:
        response = table.put_item(
            Item=dict(
                eid=ROOM_TPL.format(room_id),
                uid=uid,
                created_at=t0,
                messages=[],
                conids={}
            )
        )

        if response is None or 'Item' not in response:
            return None
        return response['Item']
    except ClientError:
        return None

