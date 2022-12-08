import { Link } from 'react-router-dom';
import { Tooltip } from 'bootstrap';
import { useEffect } from 'react';

import { DATA_SOURCES } from '../utils/attributes';


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

  return <div className="page">
    <div className='container p-3'>
      <div className='text-center'>
        <h1 className='display-5'>All metabolites in one api</h1>
        <p className='fs-5 lead'>
          Normalize your metabolite datasets, accessing all major databases, through a single API.<br/>
          Our index accelerates data processing of metabolome research.
        </p>
      </div>

      <div className='text-center'>
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

          <div className="input-group input-group-lg mb-4">
            <label className="input-group-text" htmlFor="input-search"><i className='ra ra-magnifying-glass'></i></label>

            <select className="form-select input-search-type" id="input-search-type">
              { DATA_SOURCES.map(([edb_tag, tag_name])=>(<option key={edb_tag} value={edb_tag}>{ tag_name }</option>)) }
              <option value="inchi">InChI</option>
              <option value="inchikey">InChI Key</option>
            </select>

            <input type="text" className="form-control" placeholder="Search database ID, InChI key, etc..." aria-label="Example text with button addon" id="input-search" />
          </div>

          <div className='row'>
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

    <div className="bg-light bg-light p-3">
      <div className="row">
        <div className="col-6 offset-3">
          <div className='row'>
            <div className='col-8'>
              <h1>How to use</h1>
              <p>
                Use our Python / RStudio packages to find missing metabolite database identifiers and chemical attributes in your dataframes. We support the following databases so far:
              </p>
              <p>
                Don't want to rely on our API? Use our Python packages to fill missing IDs on your local device. The local tool only takes a few minutes and 15GB disk space to set up and can be used instantly to resolve missing metabolite data.
              </p>
            </div>
            <div className='col-4'>
              <ul>
                <li>InChI & InChI key</li>
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
