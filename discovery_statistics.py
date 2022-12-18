from collections import Counter
from tabulate import tabulate
from time import time

from discovery_migration.normalize_discovery_runs import load_normalized_runs

n_results = Counter()
n_total = 0

print("Validating...")
t1 = time()


for disco, dtype in load_normalized_runs():
    n_results[dtype] += 1
    n_total += 1

# Print out statistics
table = []
table.append( ["Total runs:", n_total])

for k,cnt in n_results.most_common():
    table.append( [
        str(k).removeprefix('DiscRunResult.').replace('|', ' '),
        cnt
    ])

for row in table:
    row.append(round((row[1] / n_total) * 100, 1))
print(tabulate(table, headers=('Stat', 'N', '%')))
#
# print("Inconsistent attribute occurences:")
# for k,v in inconsistent_attributes.most_common():
#     print('  ', k, ':', v)

t2 = time()
print((t2-t1) / 60, 'mins')
