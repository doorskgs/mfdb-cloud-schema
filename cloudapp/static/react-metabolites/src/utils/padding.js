
const _PADDINGS = {
  'hmdb_id': 'HMDB',
  'chebi_id': 'CHEBI:',
  //'kegg_id': 'C',
  'lipmaps_id': 'LM',
  'inchi': 'InChI='
}

function guess_db(db_id) {
  for ( const [db_tag, _pad] of Object.entries(_PADDINGS)) {
    if (db_id.startsWith(_pad))
      return db_tag
  }
}

export function id_to_url(edb_id, edb_source) {
  // if edb_source is null:
  //     edb_source = guess_db(db_id)
  //     if edb_source is null:
  //         return null

  if (edb_id == null)
    return "#";

  edb_id = pad_id(edb_id, edb_source)
  let url = null;

  if (edb_source == 'hmdb_id')
    url = `https://hmdb.ca/metabolites/${edb_id}`
  else if (edb_source == 'chebi_id')
    url = `https://www.ebi.ac.uk/chebi/searchId.do;?chebiId=${edb_id}`
  else if (edb_source == 'kegg_id')
    url = `https://www.genome.jp/dbget-bin/www_bget?cpd:${edb_id}`
  else if (edb_source == 'pubchem_id')
    url = `https://pubchem.ncbi.nlm.nih.gov/compound/${edb_id}`
  else if (edb_source == 'lipmaps_id')
    url = `https://www.lipidmaps.org/data/LMSDRecord.php?LMID=${edb_id}`

  return url
}

export function depad_id(db_id, db_tag) {
  if (db_id == null)
    return null
  const prefix = _PADDINGS[db_tag] ||  "";

  if (prefix && db_id.startsWith(prefix))
    return db_id.substring(prefix.length);
  return db_id
}

export function pad_id(db_id, db_tag) {
  const prefix = _PADDINGS[db_tag] ||  "";

  if (prefix && !db_id.startsWith(prefix))
    return prefix+db_id;
 
  return db_id;
}
