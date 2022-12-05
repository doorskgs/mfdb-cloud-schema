import {
  SET_COUNTER
} from '../actions';

const init_state = {
  cnt: 0
};

export default (state = init_state, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return {
        ...state,
        cnt: action.count,
        errors: action.error ? action.payload.errors : null
      };
    default:
      return state;
  }
};
