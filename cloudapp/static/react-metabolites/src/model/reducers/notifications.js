import {
  NOTIF_RESET,
  NOTIF_SET_LOADING,
  NOTIF_FLASH,
  NOTIF_REDIRECT
} from '../actions';


const init_state = {
  api_loading: false,

  notif_id: null,
  notification: null
};

export default (state = init_state, action) => {
  switch (action.type) {
    case NOTIF_SET_LOADING:
      // This action is used for debugging purposes only.
      // api_loading is automatically set when Saga begins loading data
      return {
        ...state,

        api_loading: action.data ?? false,
      }

    case NOTIF_RESET:
      // Used to reset all notification state (also happens at SPA routing)
      return {
        ...state,

        api_loading: false,
        notification: null
      }
    case NOTIF_FLASH:
      return {
        ...state,

        notif_id: Math.random(),
        notification: { ...action }
      }
    case NOTIF_REDIRECT:
      return {
        ...state,

        redirect_to: action.to
      }
    default:
      return state;
  }
};
