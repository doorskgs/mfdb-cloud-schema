import { Fragment } from 'react';

import { Center } from '../Common/Center';
import { CopyBox, CopyBtn } from '../Common/CopyBox';

import Formula from './Formula';
import ExternalID from './ExternalID';
import AttributeOptList from './AttributeOptList';


/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListAttributes({ metabolite }) {
  return <table className='table table-borderless table-hover table-sm table-condensed mb-0'>
    <tbody>
      <tr><th className='ps-3 align-middle'>Formula:</th><td className='align-middle' ><Formula formula={metabolite.formula} /></td></tr>
      <tr><th className='ps-3 align-middle'>Mass:</th><td className='align-middle' >{metabolite.mass}</td></tr>
      <tr><th className='ps-3 align-middle'>Monoisotopic mass:</th><td className='align-middle'>{metabolite.mi_mass}</td></tr>
      <tr><th className='ps-3 align-middle'>charge:</th><td className='align-middle' >{metabolite.charge}</td></tr>
      <tr><th className='ps-3 align-middle'>InChI:</th><td className='align-middle' ><CopyBox value={metabolite.inchi} /></td></tr>
      <tr><th className='ps-3 align-middle'>InChI Key:</th><td className='align-middle'><CopyBox value={metabolite.inchikey} /></td></tr>
      <tr><th className='ps-3 align-middle'>Smiles:</th><td className='align-middle' ><AttributeOptList attr={metabolite.smiles} copybox={true} /></td></tr>
    </tbody>
  </table>
}