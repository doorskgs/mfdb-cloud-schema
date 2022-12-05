import { combineReducers } from 'redux';

// import auth from './reducers/auth';
import counter from './reducers/counter';
import metabolites from './reducers/metabolite';
//import { routerReducer } from 'react-router-redux';


// @TODO: remove combineReducers and use data-type dependent logic
// https://redux.js.org/usage/structuring-reducers/beyond-combinereducers
export default combineReducers({
  counter,
  metabolites,
  //router: routerReducer
});
