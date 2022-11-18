import os
import shutil

from eme.pipe import Producer
from metabolite_index import EDBSource


class SkippedIdExplorer(Producer):
    """
    """
    produces = tuple[EDBSource, str], "edb_tag_id"

    def initialize(self):
        path = self.cfg.get('settings.file')

        if os.path.exists(path+'.tmp'):
            # copy previously saved skipped files and retry with them
            shutil.copy(path+'.tmp', path)
            os.remove(path+'.tmp')

        if os.path.exists(path):
            self.fh = open(path)
        else:
            self.fh = None

    async def produce(self, data):

        if self.fh is not None:
            for line in self.fh:
                edb_id, edb_tag, error = line.split(',')
                yield (edb_id, EDBSource(edb_tag)), self.produces

        self.mark_finished()

    def dispose(self):
        self.fh.close()
