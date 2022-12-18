_PADDINGS = {
    'hmdb_id': 'HMDB',
    'chebi_id': 'CHEBI:',
    #'kegg_id': 'C',
    'lipmaps_id': 'LM',
    'inchi': 'InChI='
}

def depad_id(db_id, db_tag):
    if db_id is None:
        return None

    db_id = db_id.removeprefix(_PADDINGS.get(db_tag, ""))

    return db_id

def pad_id(db_id, db_tag):
    padding = _PADDINGS.get(db_tag)

    if padding is None or db_id.startswith(padding):
        _id = str(db_id)
    else:
        _id = padding+db_id

    return _id
