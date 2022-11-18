import os

from eme.data_access import get_repo
from eme.pipe import Producer
from metabolite_index import EDBSource
from metabolite_index.dal import ExternalDBEntity, EDBRepository


class IdExplorer(Producer):
    """
    Lists unexplored chebi
    """
    produces = tuple[EDBSource, str], "edb_tag_id"

    def initialize(self):
        self.path = self.cfg.get('settings.file')

        self.start_offset = 0

        if os.path.exists(self.path):
            with open(self.path) as fh:
                self.start_offset = int(fh.readline().strip('\n'))
        self.current_id = self.start_offset

        self.repo: EDBRepository = get_repo(ExternalDBEntity)
        self.stop_at = self.cfg.get('settings.stop_after', cast=int, default=float('inf'))

        print('    ID starts from:', self.current_id)

    async def produce(self, data):

        for edb_record in self.repo.list_iter(start_from=self.start_offset, stop_at=self.stop_at):
            yield (edb_record.edb_id, EDBSource(edb_record.edb_source)), self.produces

    def dispose(self):
        # save last point to start from
        with open(self.path, 'w') as fh:
            fh.write(str(self.current_id))
