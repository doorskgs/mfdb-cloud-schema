import { combineReducers } from 'redux';

// import auth from './reducers/auth';
import counter from './reducers/counter';
//import { routerReducer } from 'react-router-redux';

export default combineReducers({
  counter,
  //router: routerReducer
});