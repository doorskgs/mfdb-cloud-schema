from mfdb_parsinglib.edb_formatting import try_flatten
from mfdb_parsinglib import EDB_ID, EDB_ID_OTHER, COMMON_ATTRIBUTES

# what attributes to include in mdb DDB item
ALL_ATTR = (EDB_ID | EDB_ID_OTHER | COMMON_ATTRIBUTES) - {'description'}
ATTR_OTHER_MAPPING = { "logp", "chebi_star", "state" }

# what attributes to build DDB index from
SEARCH_ATTR = EDB_ID | EDB_ID_OTHER | {'inchikey', 'smiles', 'pname'}
RANGE_ATTR = {'mass', 'mi_mass', 'charge', 'logp'}


def generate_ddb_search_keys(mdb: dict):
    """
    Creates DynamoDB items and indexes
    :param mdb: metabolite discovery result
    :return:
    """
    mdb_item = {}

    # copy or calculate MDB ID
    mdb_item['mid'] = 1

    # copy and flatten edb_ids and attributes if possible
    for k in ALL_ATTR:
        val = mdb[k]
        if val:
            mdb_item[k] = try_flatten(val)

    # copy other (edb specific) attributes
    for k in ATTR_OTHER_MAPPING:
        val = mdb['attr_other'].get(k)
        if val:
            mdb_item[k] = try_flatten(val)

    # get primary name, prio: pubchem > chebi > shortest name
    sorted_names = sorted(mdb['names'], key=lambda x: len(x))
    mdb_item['pname'] = mdb.get("pc_iupac_name", mdb.get("ch_iupac_name", sorted_names))

    yield mdb_item

    # create search keys