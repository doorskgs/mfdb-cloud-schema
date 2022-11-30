import os
from tomcru import TomcruProject

project = TomcruProject(os.path.dirname(os.path.realpath(__file__)))

with project.project_builder('test api') as tc:
    tc.parse_project_apis()
    #tc.parser('swagger').add('dkgs')

    tc.parse_envvars('aws')

    tc.add_layer('DkgsDal', ['dkgsdal'], folder='dkgsdal', single_file=True, in_house=True)

    tc.build_service('dynamodb')
    tc.build_service('boto3')

