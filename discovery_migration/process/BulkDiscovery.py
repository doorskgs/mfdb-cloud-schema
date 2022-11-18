from eme.mapper import map_to
from eme.pipe import Process
from metabolite_index import MetaboliteDiscovery, discovery, EDBSource
from metabolite_index.consistency import ConsistencyClass, get_consistency_class, MetaboliteConsistent


class BulkDiscovery(Process):
    consumes = tuple[EDBSource, str], "edb_tag_id"
    produces = (
        (MetaboliteConsistent, "mdb"),
        (MetaboliteDiscovery, "mdb_inconsistent"),
        (tuple[EDBSource, str, str], "skipped_id")
    )

    def initialize(self):
        self.disco = discovery(self.cfg, verbose=self.app.debug and self.app.verbose)
        self.processed = 0

    async def produce(self, data: tuple[EDBSource, str]):
        edb_id, edb_tag = data
        if self.app.debug:
            assert isinstance(edb_tag, EDBSource)

        meta: MetaboliteDiscovery = self.disco.add_scalar_input(edb_tag, edb_id)

        try:
            self.disco.run_discovery()

            cpkeys, c2ndids, cm = get_consistency_class(meta)

            if cpkeys == ConsistencyClass.Consistent and c2ndids == ConsistencyClass.Consistent:
                # if consistent, save to consistent class for CSV/DB saving
                metabolite: MetaboliteConsistent = map_to(meta, MetaboliteConsistent)

                yield metabolite, self.produces[0]
            else:
                # inconsistent -> save to different CSV/DB for later analysis
                yield meta, self.produces[1]

        except Exception as e:
            if self.app.debug:
                raise e
            else:
                print("    DISCO ERR:", e)
                # error happened during Discovery, save to skipped id file
                yield (edb_id, edb_tag, str(e)), self.produces[2]

        self.processed += 1
        if self.processed % 1000 == 0:
            self.app.print_progress(self.processed)

        self.disco.clear()
