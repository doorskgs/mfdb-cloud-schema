import {
  GET_METABOLITE,
  GET_METABOLITE_SUCCESS,
  GET_METABOLITE_ERROR,
  QUERY_METABOLITE,
  QUERY_METABOLITE_SUCCESS,
  QUERY_METABOLITE_ERROR,
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
      }
    case GET_METABOLITE_SUCCESS:
      return {
        ...state,
        loaded_metabolite: action.metabolite,
        metabolites: {...state.metabolites, [action.metabolite.mid]: action.metabolite}
      }
    case GET_METABOLITE_ERROR:
      return {
        ...state,
        loaded_metabolite: null,
        metabolites: {...state.metabolites, [action.mid]: null},
      }

    default:
      return state;
  }
};
