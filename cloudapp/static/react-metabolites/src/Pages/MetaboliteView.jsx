import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GET_METABOLITE } from '../model/actions'
import { useEffect } from 'react';


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

  let metabolite_keys = "";
  if (metabolite) {
    metabolite_keys = Object.keys(metabolite);
  }

  return <div className="container">
    metabolite view for { mid }
    { loading && <div className='bg-danger'>Loading...</div> }

    { metabolite && <div>
      metabolite { metabolite_keys }
    </div>}
  </div>;
}

export default MetaboliteView;
