import { Link, redirect } from 'react-router-dom';
import { Tooltip } from 'bootstrap';
import { useState, useEffect } from 'react';

import { DATA_SOURCES } from '../../utils/attributes';
import { NOTIF_REDIRECT, QUERY_METABOLITE } from '../../model/actions';
import { useDispatch, useSelector } from 'react-redux';


/**
 * Welcoming and main search bar page
 * @returns 
 */
export default function MetaboliteSearch() {
  const [attrSearchOption, setAttrSearchOption] = useState('names');
  const dispatch = useDispatch();

  const search_mids = useSelector((state) => state.metabolites.search_mids)
  // const queried_mid = useSelector((state) => state.metabolites.queried_mid)

  // useEffect(()=>{
  //   // redirect if search resulted in a direct hit
  //   if (queried_mid) {
  //     dispatch({ type: NOTIF_REDIRECT, to: '/metabolite/'+queried_mid });
  //   }
  // }, [queried_mid]);

  // if (queried_mid) {
  //   console.info(123, 123, 123);
  // }

  if (search_mids) {
    console.log("search", search_mids);
  }

  const onSearch = (e) => {
    const searchExpr = e.target.value;

    if (e.key === 'Enter' && !(!searchExpr && searchExpr.match(/^ *$/) !== null)) {
      // @TODO: investigate if there's a better way to load api from page param (or <Link to />)
      dispatch({ type: QUERY_METABOLITE, attr: attrSearchOption, value: searchExpr });

      e.target.value = "";
    }
  };

  return <div className="input-group input-group-lg mb-4 mt-4">
    <label className="input-group-text" htmlFor="input-search"><i className='ra ra-magnifying-glass'></i></label>

    <select className="form-select input-search-type" id="input-search-type" value={attrSearchOption} onChange={(e) => setAttrSearchOption(e.target.value)}>
      <option value="names">Name</option>
      <option value="inchi">InChI</option>
      <option value="inchikey">InChI Key</option>
      { DATA_SOURCES.map(([edb_tag, tag_name])=>(<option key={edb_tag} value={edb_tag}>{ tag_name }</option>)) }
    </select>

    <input type="text" onKeyDown={onSearch} className="form-control" placeholder="Search database ID, InChI key, etc..." aria-label="Example text with button addon" id="input-search" />
  </div>
}
