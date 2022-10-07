import {
  REGISTER_SUCCESSFUL,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  CERRAR_SESION,
  RESTART_MESSAGE,
  LOADING_USER
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
    case LOGIN_SUCCESSFUL:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: '',
      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false
      };
    case RESTART_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
