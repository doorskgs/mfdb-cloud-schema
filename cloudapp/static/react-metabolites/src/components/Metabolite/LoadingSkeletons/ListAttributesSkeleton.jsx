import { Fragment } from 'react';

function vwidth(pmin, pmax, parentwidth=100) {
  return `${Math.round((Math.random()*(pmax-pmin)+pmin)*parentwidth)}%`;
}

/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListAttributesSkeleton({ number }) {

  return <table className='table  table-sm table-condensed mb-0'>
    <tbody>
      <tr style={{height:'32px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.36, 0.4)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.4, 0.56)}}/></td>
      </tr>
      <tr style={{height:'32px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.15, 0.2)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.15, 0.2)}}/></td>
      </tr>
      <tr style={{height:'32px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.65, 0.7)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.24, 0.56)}}/></td>
      </tr>
      <tr style={{height:'32px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.34, 0.4)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.24, 0.56)}}/></td>
      </tr>

      <tr style={{height:'39px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.34, 0.42)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.9, 0.9)}}/></td>
      </tr>
      <tr style={{height:'39px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.4, 0.48)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.9, 0.9)}}/></td>
      </tr>
      <tr style={{height:'39px'}}>
        <th className='align-middle' style={{width: '50%'}}><div className='skelet anim rounded text' style={{width: vwidth(0.38, 0.42)}}/></th>
        <td className='align-middle'><div className='skelet anim rounded text me-2' style={{width: vwidth(0.9, 0.9)}}/></td>
      </tr>

    </tbody>
  </table>
}