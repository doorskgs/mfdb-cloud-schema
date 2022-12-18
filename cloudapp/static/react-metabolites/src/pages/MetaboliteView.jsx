import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';

import { GET_METABOLITE, NOTIF_MISSING_DATA } from '../model/actions'
import { get_primary_name, DATA_SOURCES } from '../utils/attributes';

import { Center } from '../components/Common/Center';

import ListAttributes from '../components/Metabolite/ListAttributes';
import ListIDs from '../components/Metabolite/ListIDs';
import ListNames from '../components/Metabolite/ListNames';
import CardTabsSkeleton from '../components/Metabolite/LoadingSkeletons/CardTabsSkeleton';
import ListAttributesSkeleton from '../components/Metabolite/LoadingSkeletons/ListAttributesSkeleton';
import ListIDsSkeleton from '../components/Metabolite/LoadingSkeletons/ListIDsSkeleton';


const MetaboliteView = () => {
  let { mid } = useParams();
  const dispatch = useDispatch();
  const metabolite = useSelector((state) => state.metabolites.metabolites[mid])
  
  const api_error = useSelector((state) => state.notifications.api_error)
  
  useEffect(()=>{
    // @TODO: investigate if there's a better way to load api from page param (or <Link to />)
    dispatch({ type: GET_METABOLITE, mid: mid });
  }, [mid]);

  if (metabolite === undefined) {
    // don't render while loading
    return <div className="container page">
      <h1 className='display-4 align-middle' style={{height: '65px', paddingTop:'18px'}}><div className='skelet text' style={{width: '120px', height:'28px'}}></div></h1>

      <div className='row'>
        <div className='col-12 col-md-6 mr-2 p-2'>
          <CardTabsSkeleton>
            <ListAttributesSkeleton />
          </CardTabsSkeleton>
        </div>
        <div className='col-12 col-md-6 mr-2 p-2'>
          <CardTabsSkeleton>
            <ListIDsSkeleton number={9} />
          </CardTabsSkeleton>
        </div>
      </div>
    </div>

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
            <div id="tab-content-attributes" role="tabpanel" aria-labelledby="tab-attributes" className='tab-pane fade show active mb-0'>
              <ListAttributes metabolite={metabolite} />
            </div>

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
  
            <div id="tab-content-ids" role="tabpanel" aria-labelledby="tab-ids" className='tab-pane fade show active'>
              <ListIDs metabolite={metabolite} />
            </div>

            <div id="tab-content-names" role="tabpanel" aria-labelledby="tab-names" className='tab-pane fade card-body ids-list p-0'>
              <ListNames names={metabolite.names} />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>;
}

export default MetaboliteView;
