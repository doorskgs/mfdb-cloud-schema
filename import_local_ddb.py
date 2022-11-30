"""
This script parses discovery.json into universal and unique MDB items by grouping the same records
and evaluating their consistency class and if MDB records belonging to the same metabolite are equal
"""
import time

from eme.mapper import map_to
from eme.pipe.utils import print_progress
from mfdb_parsinglib.consistency import ConsistencyClass
from mfdb_parsinglib.views.MetaboliteConsistent import MetaboliteConsistent
from mfdb_parsinglib.views.MetaboliteDiscovery import MetaboliteDiscovery

from cloudapp.project import project
import json
from collections import defaultdict, Counter

from mfdb_parsinglib import get_mdb_id

with project.app_builder('FaaS:eme_app', env='dev') as app_builder:
    # import dev version of DDB mock
    app_builder.init_services()
    app_builder.inject_dependencies()
    import boto3
    app_builder.deject_dependencies()

ddb = boto3.resource('dynamodb')
meta_table = ddb.Table('Metabolites')

meta_table._truncate()


mdb_discoveries: dict[str | None, list[dict]] = defaultdict(list)


with open('discovery_migration/tmp/discovery.json') as fh:
    for line in fh:
        if not line:
            continue

        mdb = json.loads(line)
        mdb_discoveries[get_mdb_id(mdb, level=2)].append(mdb)

print("No ID cardinality:", len(mdb_discoveries.get(None, [])))


attr_invalidated = Counter()

attr_to_validate_on = ['inchikey', 'pubchem_id', 'chebi_id', 'hmdb_id', 'mass', 'mi_mass', 'smiles', 'inchi', 'kegg_id', 'names']

def list_equal(lst):
    if len(lst) == 0:
        return True
    return all(ele == lst[0] for ele in lst)


batch_commits = 5000
i = 0
t1 = time.time()

with meta_table.batch_writer() as batch:
    for mdb_id, mdbs in mdb_discoveries.items():
        # check equivalence of discovery results
        for attr in attr_to_validate_on:
            vals = [mdb[attr] for mdb in mdbs]

            if not list_equal(vals):
                break
        else:
            mdb = mdbs[0]
            discovery_result = mdb.pop('result')

            if discovery_result['is_consistent'] == ConsistencyClass.Consistent.value:
                # map to consistent view and save
                disco = MetaboliteDiscovery(**mdb)
                meta_consistent: MetaboliteConsistent = map_to(disco, MetaboliteConsistent)

                mdb = meta_consistent.as_dict
                mdb['mid'] = str(mdb_id)

                # insert to DDB
                batch.put_item(Item=mdb)

                if i % batch_commits == 0:
                    batch.session.commit()

                    print_progress("{spinner} {dt}    Processing... {iter}", i=i, si=i, tstart=t1)
                i += 1

            # @later: handle inconsistent, missing and invalid equality cases
