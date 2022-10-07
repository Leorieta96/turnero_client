import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: '',
    loading: false
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //funciones
  // retorna el usuario autenticado
  const authenticatedUser = async () => {
    const token = localStorage.getItem('token');
    // Funcion para enviar el token por header
    tokenAuth(token);
    try {
      const respuesta = await clienteAxios.get('/api/auth');
      //             console.log(respuesta);
      dispatch({
        type: GET_USER,
        payload: respuesta.data.user
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR
        //payload: error.response.data.msg
      });
    }
  };
  const registerUser = async datos => {
    dispatch({
      type: LOADING_USER
    });
    try {
      const respuesta = await clienteAxios.post('/api/auth/signup', datos);
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: respuesta.data
      });
      // obtener el usuario
      authenticatedUser();
    } catch (error) {
      //console.log(error.response.data.msg);  trae el mensaje que envia el servidor por send.json
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.msg.toString()
      });
    }
  };
  //iniciar sesion
  const login = async datos => {
    try {
      dispatch({
        type: LOADING_USER
      });
      const respuesta = await clienteAxios.post('/api/auth/login', datos);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: respuesta.data
      });
      //obtener usuario
      authenticatedUser();
    } catch (error) {
      console.log(error.response.data); // trae el mensaje que envia el servidor por send.json
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
      setTimeout(() => {
        dispatch({
          type: RESTART_MESSAGE
        });
      }, 6000);
    }
  };

  //cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        registerUser,
        login,
        authenticatedUser,
        cerrarSesion
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
