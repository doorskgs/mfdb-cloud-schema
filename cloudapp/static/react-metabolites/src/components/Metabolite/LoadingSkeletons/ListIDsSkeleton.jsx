import { Fragment } from 'react';

function vwidth(pmin, pmax, parentwidth=100) {
  return `${Math.round((Math.random()*(pmax-pmin)+pmin)*parentwidth)}%`;
}


/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListIDsSkeleton({ number }) {
  const children = [];

  for (let i = 0; i < number; i++) {
    children.push(<tr key={'skelet-listids-'+i} style={{height:'46px'}}>
      <td className='ps-3 align-middle' style={{width: '17.3%'}}>
        <div className='skelet anim rounded me-2 img-dbicon'/>
      </td>
      <th className='align-middle' style={{width: '30%'}}>
        <div className='skelet anim rounded text' style={{width: vwidth(0.32, 0.68)}}/>
      </th>
      <td className='align-middle' style={{position: 'relative', left: '8px'}}>
        <div className='skelet anim rounded text me-2' style={{width: vwidth(0.24, 0.56)}}/>
      </td>
    </tr>);
  }

  return <table className='table table-borderless table-sm table-condensed mb-0'>
    <tbody>
      { children }
    </tbody>
  </table>
}