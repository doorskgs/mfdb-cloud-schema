"""
This script parses discovery.json into universal and unique MDB items by grouping the same records
and evaluating their consistency class and if MDB records belonging to the same metabolite are equal
"""
import sys
from time import time
from collections import defaultdict, Counter

from eme.pipe.utils import print_progress
from tabulate import tabulate

from discovery_migration.normalize_discovery_runs import load_normalized_runs, DiscRunResult
from cloudapp.project import project
from import_local_ddb import build_items_from_discovery, build_mid_search_key

if 'live-demo' in sys.argv:
    import boto3

    file_sources = ['demo_aws']
else:
    # local import
    with project.app_builder('FaaS:eme_app', env='dev') as app_builder:
        # import dev version of tomcru DDB
        app_builder.init_services()
        app_builder.inject_dependencies()
        import boto3
        app_builder.deject_dependencies()

    file_sources = ['hmdb', 'pubchem', 'chebi_lipmaps_kegg']

ddb = boto3.resource('dynamodb')
meta_table = ddb.Table('Metabolites')
meta_table._truncate()


print("Importing to local DDB...")
t1 = time()
inserted_mdb = 0 # consistent mdb inserted
inserted_mdb_incs = 0 # inconsistent mdb inserted
inserted_items = 0 # inserted DDB items (mdb + search_key) inserted
batch_commits = 5000

# keeping MDB items that share SMILES (because SMILES often can have collisions)
mids_for_smiles = defaultdict(list)

with meta_table.batch_writer() as batch:
    for disco, dtype in load_normalized_runs(file_sources):
        if dtype == DiscRunResult.Clear:
            for item in build_items_from_discovery(disco):

                if item['mid'].startswith('S:'):
                    mids_for_smiles[item['mid']].append(item['mrf'])
                else:
                    # insert to DDB
                    batch.put_item(Item=item)

                    inserted_items+=1
                    if inserted_items % batch_commits == 0:
                        batch.session.commit()

            inserted_mdb += 1
            if inserted_mdb % 1000 == 0:
                print_progress("  {spinner} {iter} [{dt}s]", inserted_mdb, si=(inserted_mdb // 1000), tstart=t1)

    print("Processing SMILES keys...")
    for smiles, mids in mids_for_smiles.items():
        for item in build_mid_search_key(mids, [smiles]):
            batch.put_item(Item=item)

            inserted_items += 1
            if inserted_items % batch_commits == 0:
                batch.session.commit()

    batch.session.commit()

print("Done!")
print("Total DDB items inserted:", inserted_items)
print("Consistent MDB metabolites inserted:", inserted_mdb)
print("Inconsistent MDB metabolites inserted:", inserted_mdb_incs)
