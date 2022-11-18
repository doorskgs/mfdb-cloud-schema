# 1 -------------------------------
import boto3
ddb = boto3.resource('dynamodb')
table = ddb.Table("YFiles")
file = table.get_item(Key={"fhash":"asdasdasd1"})

# 2 -------------------------------