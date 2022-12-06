import React from 'react'

export function Formula({ formula, colored = false }) {
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
