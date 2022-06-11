import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  EDIT_SUPERADMINS_PENDING,
  EDIT_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMINS_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};

export const addSuperAdminsPending = () => {
  return {
    type: ADD_SUPERADMINS_PENDING
  };
};

export const addSuperAdminsSuccess = (data) => {
  return {
    type: ADD_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const addSuperAdminsError = (error) => {
  return {
    type: ADD_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (data) => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};

export const editSuperAdminsPending = () => {
  return {
    type: EDIT_SUPERADMINS_PENDING
  };
};

export const editSuperAdminsSuccess = (data) => {
  return {
    type: EDIT_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const editSuperAdminsError = (error) => {
  return {
    type: EDIT_SUPERADMINS_ERROR,
    payload: error
  };
};
