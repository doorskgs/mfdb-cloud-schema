import {
  GET_METABOLITE,
  GET_METABOLITE_SUCCESS,
  GET_METABOLITE_ERROR
} from '../actions';


const init_state = {
};

export default (state = init_state, action) => {
  switch (action.type) {
    case GET_METABOLITE:
      return {
        ...state,
        loading: true,
      }
    case GET_METABOLITE_SUCCESS:
      return {
        ...state,
        loading: false,
        metabolite: action.metabolite
      }
    case GET_METABOLITE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.message,
      }
    default:
      return state;
  }
};
