import { Link } from 'react-router-dom';
import { Tooltip } from 'bootstrap';
import { useState, useEffect } from 'react';

import { DATA_SOURCES } from '../../utils/attributes';
import { QUERY_METABOLITE } from '../../model/actions';
import { useDispatch } from 'react-redux';

/**
 * Welcoming and main search bar page
 * @returns 
 */
export default function MetaboliteSearch() {
  const [attrSearchOption, setAttrSearchOption] = useState('inchi');
  const dispatch = useDispatch();

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
      <option value="inchi">InChI</option>
      <option value="inchikey">InChI Key</option>
      { DATA_SOURCES.map(([edb_tag, tag_name])=>(<option key={edb_tag} value={edb_tag}>{ tag_name }</option>)) }
    </select>

    <input type="text" onKeyDown={onSearch} className="form-control" placeholder="Search database ID, InChI key, etc..." aria-label="Example text with button addon" id="input-search" />
  </div>
}
