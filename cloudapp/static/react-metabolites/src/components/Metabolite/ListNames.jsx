import { Fragment } from 'react';

/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListNames({ names }) {
  return <ul className='list-group'>
    { names.map(sm=><li key={sm} className='list-group-item'>{ sm }</li>) }
  </ul>
}