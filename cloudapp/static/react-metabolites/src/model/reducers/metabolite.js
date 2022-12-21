import {
  GET_METABOLITE,
  GET_METABOLITE_SUCCESS,
  GET_METABOLITE_ERROR,
  QUERY_METABOLITE,
  QUERY_METABOLITE_SUCCESS,
  QUERY_METABOLITE_ERROR,
} from '../actions';

// import { createBrowserHistory } from "history";

const init_state = {
  metabolites: {},

  // latest loaded entities
  //queried_mid: null,
  loaded_metabolite: null,

  // search suggestions - populated if multiple MIDs are found in search
  search_mids: null,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case GET_METABOLITE:
    case QUERY_METABOLITE:
      // initiating api fetch
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
    case QUERY_METABOLITE_SUCCESS:
      if (action.metabolite) {
        return {
          ...state,

          loaded_metabolite: action.metabolite,
          //queried_mid: action.metabolite.mid,
          search_mids: action.mids.length > 0 ? action.mids : null,

          metabolites: {...state.metabolites, [action.mid]: action.metabolite}
        }
  
      } else {
        return {
          ...state,

          loaded_metabolite: null,
          //queried_mid: null,
          search_mids: action.mids.length > 0 ? action.mids : null,
        }
      }
    case QUERY_METABOLITE_ERROR:
      return {
        ...state,

        loaded_metabolite: null,
        //queried_mid: null,
        search_mids: null
      }

    default:
      return state;
  }
};
