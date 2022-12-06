import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

import { GET_METABOLITE, SET_LOADING } from '../model/actions'
import { get_primary_name } from '../utils/attributes';

import { Center } from '../components/Center';
import { Formula } from '../components/Formula';
import { CopyBox } from '../components/CopyBox';
import { CopyBtn } from '../components/CopyBtn';
import { ExternalID } from '../components/ExternalID';
import { AttributeOptList } from '../components/AttributeOptList';


const MetaboliteView = () => {
  let { mid } = useParams();
  const dispatch = useDispatch();
  const metabolite = useSelector((state) => state.metabolites.metabolite)
  const loading = useSelector((state) => state.loading.loading)

  useEffect(()=>{
    // @TODO: investigate if there's a better way to load api from page param (or <Link to />)
    dispatch({ type: GET_METABOLITE, mid: mid });
    //dispatch({ type: SET_LOADING });
  }, [mid]);

  if (loading || metabolite === undefined) {
    return <Center>
        <div className="mb-4">
          <span className='fw-bold'>Loading</span><br/>
          <span>{mid}</span>
        </div>

        <div className="loading-spinner" />
      </Center>
  } else if (metabolite === null) {
    return <Center>
      <h1 className="display-1 fw-bold">No such metabolite</h1>

      <p className="fs-3 h5">
        <span className="text-danger">Oops!</span> This metabolite doesn't seem to exist.
      </p>
      <p className="lead">
        text
      </p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </Center>
  }

  // @todo: include primary name AND/OR IUPAC name as special attribs
  const primary_name = get_primary_name(metabolite);

  return <div className="container page">
    <h1 className='display-4'>{ primary_name }</h1>

    <div className='row'>
      <div className='col-12 col-md-6 mr-2 p-2'>
        <div className='card'>
          <div className='card-header'>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button className="nav-link active" id="tab-attributes" data-bs-toggle="tab" data-bs-target="#tab-content-attributes" type="button" role="tab" aria-current="true">Attributes</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" id="tab-structures" data-bs-toggle="tab" data-bs-target="#tab-content-structures" type="button" role="tab" >Structure</button>
              </li>
            </ul>
          </div>
          <div className="tab-content">

            <table id="tab-content-attributes" role="tabpanel" aria-labelledby="tab-attributes" className='tab-pane fade show active table table-borderless table-hover table-sm table-condensed mb-0'>
              <tbody>
                <tr><th className='ps-3'>Formula:</th><td><Formula formula={metabolite.formula} /></td></tr>
                <tr><th className='ps-3'>Mass:</th><td>{metabolite.mass}</td></tr>
                <tr><th className='ps-3'>Monoisotopic mass:</th><td>{metabolite.mi_mass}</td></tr>
                <tr><th className='ps-3'>charge:</th><td>{metabolite.charge}</td></tr>
                <tr><th className='ps-3'>InChI:</th><td><CopyBox value={metabolite.inchi} /></td></tr>
                <tr><th className='ps-3'>InChI Key:</th><td><CopyBox value={metabolite.inchikey} /></td></tr>
                <tr><th className='ps-3'>Smiles:</th><td><AttributeOptList attr={metabolite.smiles} copybox={true} /></td></tr>
              </tbody>
            </table>

            <div id="tab-content-structures" role="tabpanel" aria-labelledby="tab-structures" className='tab-pane fade card-body'>
              tesomsz
            </div>

          </div>
        </div>
      </div>
      <div className='col-12 col-md-6 mr-2 p-2'>
        <div className='card'>
        <div className='card-header'>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <button className="nav-link active" id="tab-ids" data-bs-toggle="tab" data-bs-target="#tab-content-ids" type="button" role="tab" aria-current="true">Identifiers</button>
              </li>
              <li className="nav-item">
                <button className="nav-link" id="tab-names" data-bs-toggle="tab" data-bs-target="#tab-content-names" type="button" role="tab" >Names</button>
              </li>
            </ul>
          </div>
          <div className="tab-content">
  
            <table id="tab-content-ids" role="tabpanel" aria-labelledby="tab-ids" className='tab-pane fade show active table table-borderless table-hover table-sm table-condensed mb-0'>
              <tbody>
                <tr>
                  <th className='ps-3'>Pubchem:</th>
                  <td><ExternalID edb_id={metabolite.pubchem_id} edb_tag={'pubchem_id'} /></td>
                </tr>
                <tr>
                  <th className='ps-3'>Chebi:</th>
                  <td><ExternalID edb_id={metabolite.chebi_id} edb_tag={'chebi_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>CAS id:</th>
                  <td>
                    { metabolite.cas_id && (<Fragment>
                      <span className='py-2 px-3 text-primary'>{ metabolite.cas_id }</span>
                      <CopyBtn value={metabolite.cas_id} />
                    </Fragment>)}
                  </td>
                </tr>
                <tr>
                  <th className='ps-3'>HMDB:</th>
                  <td><ExternalID edb_id={metabolite.hmdb_id} edb_tag={'hmdb_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>LipidMaps:</th>
                  <td><ExternalID edb_id={metabolite.lipmaps_id} edb_tag={'lipmaps_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>KEGG:</th>
                  <td><ExternalID edb_id={metabolite.kegg_id} edb_tag={'kegg_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>ChemSpider:</th>
                  <td><ExternalID edb_id={metabolite.chemspider_id} edb_tag={'chemspider_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>Metlin:</th>
                  <td><ExternalID edb_id={metabolite.metlin_id} edb_tag={'metlin_id'}/></td>
                </tr>
                <tr>
                  <th className='ps-3'>Swiss Lipids:</th>
                  <td><ExternalID edb_id={metabolite.swisslipids_id} edb_tag={'swisslipids_id'}/></td>
                </tr>
              </tbody>
            </table>

            <div id="tab-content-names" role="tabpanel" aria-labelledby="tab-names" className='tab-pane fade card-body ids-list p-0'>
              <ul className='list-group'>
                { metabolite.names.map(sm=><li key={sm} className='list-group-item'>{ sm }</li>) }
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default MetaboliteView;
