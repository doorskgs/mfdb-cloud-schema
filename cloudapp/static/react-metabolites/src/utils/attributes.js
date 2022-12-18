
export const DATA_SOURCES = [
  ["pubchem_id", "PubChem"],
  ["chebi_id", "Chebi"],
  ["hmdb_id", "HMDB"],
  ["kegg_id", "Kegg"],
  ["lipmaps_id", "Lipidmaps"],

  ["cas_id", "CAS Ref"],
  ["swisslipids_id", "SwissLipids"],
  ["metlin_id", "Metlin"],
  ["chemspider_id", "ChemSpider"],
];

/**
 * Checks if a Discovery attribute is contained in the second parameter.
 * Can compare scalar with set or scalar with scalar.
 * @param {first value} attr1 
 * @param {second value} attr2 
 */
export function disc_contain(attr1, attr2) {
  if (attr2 instanceof Set)
    return attr2.has(attr1);
  else
    return attr1 == attr2;
}

/**
 * Creates set from scalar or iterable
 * @param {value} val 
 */
export function disc_set(val) {
  if (val instanceof Set || Array.isArray(val))
    return new Set(val);
  return new Set([val]);
}

/**
 * Returns primary name or shortest non-attribute name or synonym.
 * 
 * This algorithm is most often replaced by pubchem & chebi's IUPAC names on the backend (=> pname attribute)
 * @param {metabolite entry} metabolite 
 * @returns string
 */
export function get_primary_name(metabolite) {
  if (metabolite.pname) {
    // if disc. alg backend has already resolved primary name, just return that
    return Array.isArray(metabolite.pname) ? metabolite.pname[0] : metabolite.pname;
  }

  // return "least complex" name or synonym
  const names_ordered = [...metabolite.names].sort((a,b) => a.length-b.length);

  const excludes = new Set([
    ...disc_set(metabolite.formula),
    ...disc_set(metabolite.inchi),
  ])

  for (const name of names_ordered) {
    if (!excludes.has(name))
      return name;
  }

  // if all names are filtered (unlikely) then return shortest name
  return names_ordered[0]
}
