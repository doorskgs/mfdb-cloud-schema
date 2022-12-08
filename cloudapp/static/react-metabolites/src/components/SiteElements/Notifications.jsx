import { useSelector, useDispatch } from 'react-redux'

import { Center } from '../Common/Center';

/**
 * Renders flash notifications and api error notifications on top of page
 * @param {*} props 
 * @returns 
 */
export default function Notifications(props) {
  //const missing_data = useSelector((state) => state.notifications.missing_data);
  // const api_loading = useSelector((state) => state.notifications.api_loading);
  // const api_error = useSelector((state) => state.notifications.api_error);

  // console.log(api_loading)

  // if (api_loading) {
  //   return <Center>
  //       <div className="mb-4">
  //         <span className='fw-bold'>Loading</span><br/>
  //         <span>{api_loading || ''}</span>
  //       </div>

  //       <div className="loading-spinner" />
  //     </Center>
  // }

  return <div>heyheyheyheyahey yaheyahey</div>
}
