import React from 'react'
import { CopyBox } from '../Common/CopyBox'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function AttributeSolListGroup({ attr, copybox }) {
  let wrap = (val) => <span>{ val }</span>;

  if (copybox) {
    wrap = (val) => <CopyBox value={val} />
  }
  
  if (Array.isArray(attr))
    return <ul className='list-group'>{ attr.map(sm=><li className='list-group-item'>{ wrap(sm) }</li>) }</ul>;
  
  return <span>{ wrap(attr) }</span>
}

/**
 * 
 * @param {*} props
 * @returns 
 */
export function AttributeSolDiv({ attr, child_wrap }) {

  if (Array.isArray(attr))
    return <div>{ attr.map(sm=><div className='py-1'>{ child_wrap(sm) }</div>) }</div>;

  return <span>{ child_wrap(attr) }</span>
}
