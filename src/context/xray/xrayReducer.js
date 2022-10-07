import {
  ADD_DAY,
  GET_DAY,
  GET_TURN_RESULT,
  LOADING_RX,
  ERROR_RX,
  SAVE_TURN
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_DAY:
    case GET_DAY:
      return {
        ...state,
        day: action.payload,
        turns: action.payload?.turns || [],
        message: '',
        loading: false
      };
    case SAVE_TURN:
      return {
        ...state,
        turn: action.payload,
        message: '',
        loading: false
      };
    case GET_TURN_RESULT:
      return {
        ...state,
        turnResult: action.payload,
        message: '',
        loading: false
      };
    case ERROR_RX:
      return {
        ...state,
        message: action.payload,
        loading: false
      };
    case LOADING_RX:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
