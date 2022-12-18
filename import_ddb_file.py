import json
from time import time

from discovery_migration.normalize_discovery_runs import load_normalized_runs, DiscRunResult
from import_local_ddb import build_items_from_discovery
from eme.pipe.utils import print_progress

print("Creating DDB bulk upload json...")

t1 = time()
inserted = 0
fname = 'discovery_migration/tmp/mdb_ddb.json'

dtype: DiscRunResult
with open(fname, 'w', encoding='utf8') as fh:

    for disco, dtype in load_normalized_runs():
        if dtype == DiscRunResult.Clear:
            for item in build_items_from_discovery(disco):
                json.dump(item, fh)
                fh.write('\n')

                inserted += 1
                if inserted % 1000:
                    print_progress("  {spinner} {iter} [{dt}s]", inserted, si=(inserted//1000), tstart=t1)

print((time()-t1) / 60, 'mins')
