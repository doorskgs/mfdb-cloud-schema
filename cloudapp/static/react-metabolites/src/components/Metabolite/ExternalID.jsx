import { Fragment } from 'react';
import { id_to_url, pad_id } from '../../utils/padding';
import { CopyBtn } from '../Common/CopyBox';

/**
 * Displays an external DB ID as a link to the original entry page and copy feature
 * @param {props} props
 * @returns 
 */
export default function ExternalID({edb_id, edb_tag}) {
  if (edb_id) {
    return <Fragment>
      <a className='btn btn-link text-decoration-none' href={ id_to_url(edb_id, edb_tag) } target="_blank" >{ pad_id(edb_id, edb_tag) }</a> 
      <CopyBtn value={edb_id} />
    </Fragment>;
  }

  return <Fragment>
    <a className='btn btn-link text-decoration-none'>-</a> 
  </Fragment>
}