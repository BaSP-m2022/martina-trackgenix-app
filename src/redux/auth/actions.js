import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS
} from 'redux/auth/constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const getAuthenticationPending = () => {
  return {
    type: GET_AUTH_PENDING
  };
};

export const getAuthenticationSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthenticationError = (error) => {
  return {
    type: GET_AUTH_PENDING,
    payload: error
  };
};
