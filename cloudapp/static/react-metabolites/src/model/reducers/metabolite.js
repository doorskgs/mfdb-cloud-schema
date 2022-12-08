import {
  GET_METABOLITE,
  GET_METABOLITE_SUCCESS,
  GET_METABOLITE_ERROR
} from '../actions';


const init_state = {
  metabolites: {},

  loaded_metabolite: null
};

export default (state = init_state, action) => {
  switch (action.type) {
    case GET_METABOLITE:
      return {
        ...state,
        
        api_error: null,
        api_loading: action.mid,
      }
    case GET_METABOLITE_SUCCESS:
      return {
        ...state,

        api_loading: false,
        loaded_metabolite: action.metabolite,
        metabolites: {...state.metabolites, [action.metabolite.mid]: action.metabolite}
      }
    case GET_METABOLITE_ERROR:
      return {
        ...state,

        api_loading: false,
        api_error: action.message,
      }
    default:
      return state;
  }
};
