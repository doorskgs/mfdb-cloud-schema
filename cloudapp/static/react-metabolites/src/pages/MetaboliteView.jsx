import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GET_METABOLITE } from '../model/actions'
import { Fragment, useEffect } from 'react';


const MetaboliteView = () => {
  let { mid } = useParams();
  const dispatch = useDispatch();
  const metabolite = useSelector((state) => state.metabolites.metabolite)
  const loading = useSelector((state) => state.metabolites.loading)

  useEffect(()=>{
    // @TODO: investigate if there's a better way to load api from page param (or <Link to />)
    console.log('verjem a szajaba')

    dispatch({type: GET_METABOLITE, mid: mid});
  }, [mid]);

  // todo: loading / not metabolite / metabolite found subpages render


  //Object.entries(metabolite).map((attr,val)=>())
  
  return <div className="container">
    { loading && <div className='bg-danger'>Loading metabolite {mid}...</div> }

    { metabolite && <table className='table table-condensed table-striped'>
      <tbody>
        <tr><th>names:</th><td>{ [metabolite.names[0],metabolite.names[1],metabolite.names[2]].map((name,i)=><span key={i}>{ name }<br/></span>) }</td></tr>
        <tr><th>inchi:</th><td>{metabolite.inchi}</td></tr>
        <tr><th>inchikey:</th><td>{metabolite.inchikey}</td></tr>
        <tr><th>smiles:</th><td>{metabolite.smiles}</td></tr>
        <tr><th>chebi_id:</th><td>{metabolite.chebi_id}</td></tr>
        <tr><th>kegg_id:</th><td>{metabolite.kegg_id}</td></tr>
        <tr><th>lipmaps_id:</th><td>{metabolite.lipmaps_id}</td></tr>
        <tr><th>pubchem_id:</th><td>{metabolite.pubchem_id}</td></tr>
        <tr><th>hmdb_id:</th><td>{metabolite.hmdb_id}</td></tr>
        <tr><th>cas_id:</th><td>{metabolite.cas_id}</td></tr>
        <tr><th>chemspider_id:</th><td>{metabolite.chemspider_id}</td></tr>
        <tr><th>metlin_id:</th><td>{metabolite.metlin_id}</td></tr>
        <tr><th>smiles:</th><td>{metabolite.smiles}</td></tr>
        <tr><th>charge:</th><td>{metabolite.charge}</td></tr>
        <tr><th>mass:</th><td>{metabolite.mass}</td></tr>
        <tr><th>mi_mass:</th><td>{metabolite.mi_mass}</td></tr>
      </tbody>
    </table>}
  </div>;
}

export default MetaboliteView;
