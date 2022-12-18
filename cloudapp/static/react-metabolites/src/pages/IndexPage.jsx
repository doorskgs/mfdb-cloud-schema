import { Link, redirect, useNavigate } from 'react-router-dom';
import { Tooltip } from 'bootstrap';
import { useEffect } from 'react';

import { DATA_SOURCES } from '../utils/attributes';
import MetaboliteSearch from '../components/Search/MetaboliteSearch';
import { useDispatch } from 'react-redux';
import { TEST_SPIKE } from '../model/actions';


/**
 * Welcoming and main search bar page
 * @returns 
 */
const IndexPage = () => {

  useEffect(()=>{
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Tooltip(tooltipTriggerEl)
    });
  }, []);

  const navigate = useNavigate();

  const asd = () =>{
    return navigate("/tesomsz");
  }


  return <div className="page">
    <div className='container p-3'>
      <div className='text-center mb-5'>
        <h1 className='display-5'>All metabolites in one api</h1>
        <p className='fs-5 lead'>
          Normalize your metabolite datasets, accessing all major databases, through a single API.<br/>
          Our index accelerates data processing of metabolome research.
        </p>
      </div>

      <div className='text-center mb-4'>
        <Link to="/tools/python">
          <img src="/img/tools/l_py.png" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Getting started with the MIDB Python client package." className="rounded-circle mx-3 img-tool-icon" />
        </Link>

        <Link to="/tools/rlang">
          <img src="/img/tools/l_r.png" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Getting started with the MIDB R Studio client package." className="rounded-circle mx-3 img-tool-icon" />
        </Link>

        <Link to="/tools/javascript">
          <img src="/img/tools/l_js.png" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Getting started with the MIDB Javascript client package." className="rounded-circle mx-3 img-tool-icon" />
        </Link>

        <Link to="/tools/javascript">
          <img src="/img/tools/l_api.png" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Read how to use our Rest & GraphQL API directly." className="rounded-circle mx-3 img-tool-icon" />
        </Link>
      </div>

    </div>

    <div className="bg-primary border-primary p-3 text-white">
      <div className="row">
        <div className="col-6 offset-3">

          <MetaboliteSearch />

          <div className='row pt-3 pb-4'>
            <div className='col-4 text-center'>
              <i className='ra ra-2x ra-cube'></i>

              <p className='lead'>Draw and Search</p>
            </div>
            <div className='col-4 text-center'>
              <i className='ra ra-2x ra-open-book'></i>

              <p className='lead'>Citation</p>
            </div>
            <div className='col-4 text-center'>
              <i className='ra ra-2x ra-database'></i>

              <p className='lead'>I don't know</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className='container-fluid bg-light py-3'>
      <div className="row">
        <div className="col-6 offset-3">
          todo: add cardinality & consistence statistics

          <button className='btn btn-danger' onClick={asd}>Press me</button>
        </div>
      </div>      
    </div>

    <div className='container-fluid py-5'>
      <div className='row'>
        <div className="col-8 offset-2">
          <div className='d-flex'>
            <div className='flex-fill'>
              <h1>How to use</h1>
              <p>
                Use our Python / RStudio packages to find missing metabolite database identifiers and chemical attributes in your dataframes. We support the following databases so far:
              </p>
              <p>
                Don't want to rely on our API? Use our Python packages to fill missing IDs on your local device. The local tool only takes a few minutes and 15GB disk space to set up and can be used instantly to resolve missing metabolite data.
              </p>
            </div>
            <div className='border-start mx-3 ps-2'>
              <ul>
                <li>InChI</li>
                <li>InChI key</li>
                { DATA_SOURCES.map(([edb_tag, tag_name])=>(<li key={edb_tag}>{ tag_name }</li>)) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>;
}

export default IndexPage;
