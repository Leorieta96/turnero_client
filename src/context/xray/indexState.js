import React, { useReducer } from 'react';
import XRayContext from './xrayContext';
import XRayReducer from './xrayReducer';
import clienteAxios from '../../config/axios';
import {
  ADD_DAY,
  GET_DAY,
  GET_TURN,
  GET_TURN_RESULT,
  LOADING_RX,
  ERROR_RX,
  SAVE_TURN,
  RESTART_DATA
} from '../../types';

const IndexState = props => {
  const initialState = {
    day: null,
    turn: null,
    turns: [],
    message: '',
    loading: false,
    turnResult: null
  };

  const [state, dispatch] = useReducer(XRayReducer, initialState);

  //funciones
  const addDay = async datos => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.post('/api/day', datos);
      dispatch({
        type: ADD_DAY,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const getDay = async data => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.get(`/api/day?date=${data.date}&&id_service=${data.id_service}`);
      dispatch({
        type: GET_DAY,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response
      });
    }
  };

  const saveTurn = async datos => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.post('/api/turn', datos);
      dispatch({
        type: SAVE_TURN,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response.data.msg
      });
    }
  };

  const getTurnResult = async data => {
    dispatch({
      type: LOADING_RX
    });
    try {
      const respuesta = await clienteAxios.get(`/api/turn?code=${data.code}&&dni=${data.dni}`);
      dispatch({
        type: GET_TURN_RESULT,
        payload: respuesta.data
      });
    } catch (error) {
      dispatch({
        type: ERROR_RX,
        payload: error.response
      });
    }
  };

  const restartData = () => {
    dispatch({
      type: LOADING_RX
    });
    dispatch({
      type: RESTART_DATA
    });
  };

  return (
    <XRayContext.Provider
      value={{
        day: state.day,
        turns: state.turns,
        turn: state.turn,
        turnResult: state.turnResult,
        message: state.message,
        loading: state.loading,
        addDay, // agrega los turnos
        getDay, // trae los turnos del dia
        getTurnResult,
        saveTurn,
        restartData
      }}
    >
      {props.children}
    </XRayContext.Provider>
  );
};

export default IndexState;
