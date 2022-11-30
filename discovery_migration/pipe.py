"""
This script executes bulk discovery on EDB items to create universal MDB items and save them in a discovery.json file
"""

import asyncio
import math
import os
import time

from eme.pipe import Producer
from mfdb_parsinglib import EDBSource, MetaboliteDiscovery, MetaboliteConsistent
from mfdb_parsinglib.dal import EDBRepository, get_repo, ctx

from eme.entities import load_settings
from eme.pipe import pipe_builder
from eme.pipe.ProcessImpl import JSONLinesSaver

from process.BulkDiscovery import BulkDiscovery

DB_CFG = load_settings(os.path.dirname(__file__) + '/db.ini')
cfg_path = os.path.join(os.path.dirname(__file__), 'config')
TABLE_NAME = 'edb_tmp'

TASK_SPLIT = 5
STOP_AT = None#400000
remaining_ids = []


async def task_bulk_discovery(task_id: int, t1, edb_ids: list, json_saver):
    with pipe_builder() as pb:
        pb.cfg_path = cfg_path
        pb.set_runner('serial')

        pb.add_processes([
            BulkDiscovery("bulk_discovery", consumes=(list, "edb_ids"), produces=(dict, "mdb")),

            json_saver
        ])
        app = pb.build_app()

    print(f"TASK #{task_id}: Discovering {len(edb_ids)} EDB records from local db...")

    app.debug = True

    app.start_flow(edb_ids, (list, "edb_ids"))
    await app.run()

    print(f"Task #{task_id}: done!")

async def main():
    await ctx.initialize_db(pool_size=(TASK_SPLIT, TASK_SPLIT))

    edb_ids = []
    repo: EDBRepository = get_repo(MetaboliteConsistent)
    async for edb_id, edb_source in repo.list_ids_iter(stop_at=STOP_AT):
        edb_ids.append((edb_id, edb_source))

    L = math.ceil(len(edb_ids) / TASK_SPLIT)

    print(f"Spawning {TASK_SPLIT} tasks to process {len(edb_ids)} edb_ids")
    t1 = time.time()

    # shared JSON lines for one kegg dump file
    json_disco_saver = JSONLinesSaver("json_saver", consumes=(dict, "mdb"))
    def noop(): pass
    json_disco_saver.dispose = noop

    # spawn N tasks
    tasks = [asyncio.create_task(task_bulk_discovery(i, t1, edb_ids[L * i:L * (i + 1)], json_disco_saver)) for i in range(TASK_SPLIT)]
    await asyncio.gather(*tasks)

    try:
        json_disco_saver.fh.close()
    except:
        pass


if __name__ == "__main__":
    asyncio.run(main())
