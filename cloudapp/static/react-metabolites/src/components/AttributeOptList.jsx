import React from 'react'
import { CopyBox } from './CopyBox';


export const AttributeOptList = ({ attr, copybox }) => {
  let wrap = (val) => <span>{ val }</span>;


  if (copybox) {
    wrap = (val) => <CopyBox value={val} />
  }
  
  if (Array.isArray(attr))
    return <ul className='list-group'>{ attr.map(sm=><li className='list-group-item'>{ wrap(sm) }</li>) }</ul>;
  
  return <span>{ wrap(attr) }</span>
}
