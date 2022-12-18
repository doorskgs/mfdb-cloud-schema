import { Fragment } from 'react';

import { Center } from '../Common/Center';
import { CopyBox, CopyBtn } from '../Common/CopyBox';

import Formula from './Formula';
import ExternalID from './ExternalID';
import { AttributeSolDiv } from './AttributeSol';


/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListAttributes({ metabolite }) {

  return <table className='table table-borderless table-hover table-sm table-condensed mb-0'>
    <tbody>
      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.formula) ? 'align-top pt-2' : 'align-middle')}>Formula:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.formula} child_wrap={(content)=><Formula formula={content} />} />
        </td>
      </tr>

      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.mass) ? 'align-top pt-2' : 'align-middle')}>Mass:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.mass} child_wrap={(content)=><span>{ content }</span>} />
        </td>
      </tr>
      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.mi_mass) ? 'align-top pt-2' : 'align-middle')}>Monoisotopic mass:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.mi_mass} child_wrap={(content)=><span>{ content }</span>} />
        </td>
      </tr>
      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.charge) ? 'align-top pt-2' : 'align-middle')}>Charge:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.charge} child_wrap={(content)=><span>{ content }</span>} />
        </td>
      </tr>

      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.inchi) ? 'align-top pt-2' : 'align-middle')}>InChI:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.inchi} child_wrap={(content)=><CopyBox value={content} />} />
        </td>
      </tr>
      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.inchikey) ? 'align-top pt-2' : 'align-middle')}>InChI Key:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.inchikey} child_wrap={(content)=><CopyBox value={content} />} />
        </td>
      </tr>

      <tr>
        <th className={'ps-3 ' + (Array.isArray(metabolite.smiles) ? 'align-top pt-2' : 'align-middle')}>Smiles:</th>
        <td className='align-middle' >
          <AttributeSolDiv attr={metabolite.smiles} child_wrap={(content)=><CopyBox value={content} />} />
        </td>
      </tr>
  
    </tbody>
  </table>
}