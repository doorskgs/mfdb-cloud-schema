
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
 * Returns primary name. Returns shortest non-attribute name or synonym.
 * 
 * This algorithm will be replaced by pubchem & chebi's IUPAC names in the future
 * @param {metabolite entry} metabolite 
 * @returns string
 */
export function get_primary_name(metabolite) {
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



export function colorize_moltext(text) {
  const coloring = {
      'C': '<b class="text-dark">{$}</b>',
      'O': '<b class="text-danger">{$}</b>',
      'N': '<b class="text-info">{$}</b>',
      'P': '<b style="color:orange;">{$}</b>',
      'S': '<b class="text-warning">{$}</b>',
      'Cl': '<b class="text-success">{$}</b>',
      'H': '<b style="color:#939393;">{$}</b>',
      empty: '<i style="">{$}</i>'
  };

  return text.replace(/([A-Z]{1}[a-z]{0,2})(\d*)/gm, function(match, a,b){
      if (coloring[a])
          return coloring[a].replace('{$}', a+b);
      else
          return a+b;
  });
}
