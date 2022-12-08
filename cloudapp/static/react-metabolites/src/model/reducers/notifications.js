import {
  NOTIF_RESET,
  NOTIF_SET_LOADING,
} from '../actions';


const init_state = {
  api_loading: false,
  api_error: null,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case NOTIF_SET_LOADING:
      // This action is used for debugging purposes only.
      // api_loading is automatically set when Saga begins loading data
      return {
        ...state,

        api_loading: action.data,
      }

    case NOTIF_RESET:
      // Used to reset all notification state (also happens at SPA routing)
      return {
        ...state,

        api_loading: false,
        api_error: null
      }

    default:
      return state;
  }
};
