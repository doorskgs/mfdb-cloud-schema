import os

from eme.pipe import Consumer
from metabolite_index import EDBSource


class SkippedIdSaver(Consumer):
    """
    """
    consumes = tuple[EDBSource, str, str], "skipped_edb_tag_id"

    def initialize(self):
        path = self.cfg.get('settings.file')

        self.fh = open(path, 'w')

    async def produce(self, data):
        pass

    def dispose(self):
        self.fh.close()
