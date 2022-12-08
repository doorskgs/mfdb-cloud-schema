import React from 'react'

/**
 * Displays chemical formula with numbers as subtext
 * @param {*} param0 
 * @returns 
 */
export default function Formula({ formula, colored = false }) {
  let wasDigit = false;
  const sb = [];

  for (const char of formula) {
    const isDigit = !isNaN(char);

    if (isDigit && !wasDigit)
      sb.push('<sub>');
    if (!isDigit && wasDigit)
      sb.push('</sub>');

    sb.push(char);

    wasDigit = isDigit;
  }

  return <span dangerouslySetInnerHTML={{ __html: sb.join('') }} />
}

// @UNUSED
function colorize_moltext(text) {
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
