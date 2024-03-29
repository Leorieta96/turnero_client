import {
  ADD_DAY,
  GET_DAY,
  UPDATE_DAY,
  GET_TURN_RESULT,
  LOADING_RX,
  ERROR_RX,
  SAVE_TURN,
  RESTART_DATA
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_DAY:
    case GET_DAY:
    case UPDATE_DAY:
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
        turn: { day: action.payload.day._doc, paciente: action.payload.paciente, turns: action.payload.turn.turns },
        turns: action.payload.day.turns,
        day: action.payload.day,
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
    case RESTART_DATA:
      return {
        ...state,
        day: null,
        turn: null,
        turns: [],
        message: '',
        loading: false,
        turnResult: null
      };
    default:
      return state;
  }
};
