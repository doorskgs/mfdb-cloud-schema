import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { NOTIF_RESET } from '../../model/actions';

//import { Alert } from 'bootstrap';


/**
 * Renders flash notifications and api error notifications on top of page
 * @param {*} props 
 * @returns 
 */
export default function Notifications(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigation is executed as the result of a redux action in this app
  const redirect_to = useSelector((state) => state.notifications.redirect_to);
  useEffect(()=>{
    if (redirect_to) {
      // @TODO: return with <Navigate /> instead?
      navigate(redirect_to);
    }
  }, [redirect_to]);

  // show/dismiss bootstrap alert
  // const [showNotification, setShowNotification] = useState(true);
  const notification = useSelector((state) => state.notifications.notification);
  const hideNotification = () => dispatch({ type: NOTIF_RESET });

  const icon = notification ? (notification.theme === 'danger' ? 'ra-warning' : 'ra-'+notification.theme) : '';

  return <div className='body-ft-padding' id='notification'>
    { notification && (
      <div className='container'>
        <div className={"alert alert-warning alert-dismissible fade " + (notification && 'show')} role="alert" id='notification'>
          <span className={"bi flex-shrink-0 me-2 ra " + icon} role="img" aria-label="notification"></span>

          { (notification && notification.code) && <strong>{ notification.code }:</strong> }
          { (notification) && <span> { notification.text }</span> }

          <button type="button" className="btn-close" onClick={hideNotification}></button>
        </div>
      </div>
    )}
  </div>
}
