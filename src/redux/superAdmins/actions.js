import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  CLEAN_SUPERADMIN_ERROR
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

export const addSuperAdminPending = () => {
  return {
    type: ADD_SUPERADMIN_PENDING
  };
};

export const addSuperAdminSuccess = (data) => {
  return {
    type: ADD_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const addSuperAdminError = (error) => {
  return {
    type: ADD_SUPERADMIN_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = () => {
  return {
    type: DELETE_SUPERADMIN_PENDING
  };
};

export const deleteSuperAdminSuccess = (data) => {
  return {
    type: DELETE_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPERADMIN_ERROR,
    payload: error
  };
};

export const editSuperAdminPending = () => {
  return {
    type: EDIT_SUPERADMIN_PENDING
  };
};

export const editSuperAdminSuccess = (data) => {
  return {
    type: EDIT_SUPERADMIN_SUCCESS,
    payload: data
  };
};

export const editSuperAdminError = (error) => {
  return {
    type: EDIT_SUPERADMIN_ERROR,
    payload: error
  };
};

export const cleanSuperAdminError = () => {
  return {
    type: CLEAN_SUPERADMIN_ERROR
  };
};
