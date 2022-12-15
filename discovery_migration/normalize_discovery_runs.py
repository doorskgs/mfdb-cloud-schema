from collections import Counter
from tabulate import tabulate
from time import time

import import_local_ddb as imp


print("Reading discovery run results...")
disco_run_groups = imp.load_discoveries_grouped(mid_depth=3)

consistent_discoveries = []
inconsistent_discoveries = {}

attr_to_validate_on = ['inchikey', 'pubchem_id', 'chebi_id', 'hmdb_id', 'mass', 'mi_mass', 'smiles', 'inchi', 'kegg_id', 'names']
attr_inequal_mergeable = ['smiles', 'names']
invalid_attrs = Counter()

print("Validating...")
t1 = time()

for mid, disco_group in disco_run_groups.items():
    disco_group[0]

    # for invalid_attr in imp.validate_attributes(disco_group, attr_to_validate_on):
    #     # invalid, try to automatically solve the problem
    #     # if the inequivalence is only with names / smiles, then they're considered to be equal runs, merging
    #     invalid_attrs[invalid_attr] += 1
    #     break




print("Number of inequal MDB:", invalid_mdb2, total, (invalid_mdb2 / total)*100)
print("Number of inequal attributes:")
for attr, cnt in invalid_attrs.most_common():
    print(attr, ' --> ', cnt)

t2 = time()
print((t2-t1) / 60, 'mins')
del disco_run_groups
