import os
from tomcru import TomcruProject

project = TomcruProject(os.path.dirname(os.path.realpath(__file__)))

with project.project_builder('test api') as tc:
    tc.parse_project_apis()
    tc.parser('swagger').add('metabolite_index')

    tc.parse_envvars('aws')

    tc.add_layer('ChemblIkey', ['chembl_ikey'], folder='chembl_ikey', in_house=True)

    tc.build_service('dynamodb')
    tc.build_service('boto3')
