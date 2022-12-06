import {
  SET_LOADING
} from '../actions';


const init_state = {
  loading: false
};

export default (state = init_state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
};
