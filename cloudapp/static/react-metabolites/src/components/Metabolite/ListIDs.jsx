import { Fragment } from 'react';

import { CopyBtn } from '../Common/CopyBox';

import ExternalID from './ExternalID';

/**
 * 
 * @param {props} props
 * @returns 
 */
export default function ListIDs({ metabolite }) {
  return <table className='table table-borderless table-hover table-sm table-condensed mb-0'>
    <tbody>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/pubchem.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>Pubchem:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.pubchem_id} edb_tag={'pubchem_id'} /></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/chebi.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>Chebi:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.chebi_id} edb_tag={'chebi_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/cas.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>CAS Ref:</th>
        <td className='align-middle'>
          { metabolite.cas_id && (<Fragment>
            <span className='py-2 px-3 text-primary'>{ metabolite.cas_id }</span>
            <CopyBtn value={metabolite.cas_id} />
          </Fragment>)}
        </td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/hmdb.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>HMDB:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.hmdb_id} edb_tag={'hmdb_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/lipidmaps.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>LipidMaps:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.lipmaps_id} edb_tag={'lipmaps_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/kegg.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>KEGG:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.kegg_id} edb_tag={'kegg_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/chemspider.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>ChemSpider:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.chemspider_id} edb_tag={'chemspider_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/metlin.png'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>Metlin:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.metlin_id} edb_tag={'metlin_id'}/></td>
      </tr>
      <tr>
        <td className='align-middle ps-3'><img src={'/img/dbicons/swisslipids.gif'} className='me-2 img-dbicon'/></td>
        <th className='align-middle'>Swiss Lipids:</th>
        <td className='align-middle'><ExternalID edb_id={metabolite.swisslipids_id} edb_tag={'swisslipids_id'}/></td>
      </tr>
    </tbody>
  </table>
}