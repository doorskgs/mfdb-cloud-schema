import { combineReducers } from 'redux';

// import auth from './reducers/auth';
import metabolites from './reducers/metabolite';
import notifications from './reducers/notifications';

// @TODO: remove combineReducers and use data-type dependent logic
// https://redux.js.org/usage/structuring-reducers/beyond-combinereducers
export default combineReducers({
  notifications,

  metabolites,
});
