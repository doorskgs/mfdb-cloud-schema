import asyncio
import os

from eme.pipe import pipe_builder
from eme.pipe.ProcessImpl import DBSaver
from eme.pipe.ProcessImpl import CSVSaver

from metabolite_index import MetaboliteDiscovery, EDBSource
from metabolite_index.consistency import MetaboliteConsistent

from process.BulkDiscovery import BulkDiscovery
from process.IdExplorer.IdExplorer import IdExplorer
from process.IdExplorer.SkippedIdExplorer import SkippedIdExplorer
from process.IdExplorer.SkippedIdSaver import SkippedIdSaver


def build_pipe():

    with pipe_builder() as pb:
        pb.cfg_path = os.path.join(os.path.dirname(__file__), 'config')
        pb.set_runner('serial')

        pb.add_processes([
            IdExplorer('id_explorer', produces='edb_tag_id'),
            SkippedIdExplorer('skipped_ids', produces='edb_tag_id'),

            BulkDiscovery('bulk_discovery', consumes='edb_tag_id', produces=(
                (MetaboliteConsistent, "mdb"),
                (MetaboliteDiscovery, "mdb_inconsistent"),
                (tuple[EDBSource, str, str], "skipped_edb_tag_id_err")
            )),

            SkippedIdSaver("skipped_ids_saver", consumes=(tuple[EDBSource, str, str], "skipped_edb_tag_id_err")),
            CSVSaver("mdb_csv", consumes=(MetaboliteConsistent, "mdb")),
            #DBSaver("mdb_dump", consumes=(MetaboliteConsistent, "mdb"), table_name='mdb', conn=conn),
            # Debug("debug_names", consumes=(MetaboliteExternal, "edb_dump")),
        ])
        app = pb.build_app()

    return app

if __name__ == "__main__":
    from utils.ding import dingdingding

    app = build_pipe()
    mute = False
    app.debug = True

    # draw_pipes_network(pipe, filename='spike', show_queues=True)
    # debug_pipes(pipe)
    asyncio.run(app.run())

    if not app.debug and not mute:
        dingdingding()
