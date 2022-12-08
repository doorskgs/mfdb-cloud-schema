import { Fragment } from 'react';

/**
 * 
 * @param {props} props
 * @returns 
 */
export default function CardTabsSkeleton(props) {
  return <div className='card'>
    <div className='card-header'>
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <button className="skelet nav-link active" type="button"></button>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      { props.children }
    </div>
  </div>
}