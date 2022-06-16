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
  EDIT_SUPERADMIN_ERROR
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

export const getSuperAdminsError = () => {
  return {
    type: GET_SUPERADMINS_ERROR
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

export const addSuperAdminError = () => {
  return {
    type: ADD_SUPERADMIN_ERROR
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

export const deleteSuperAdminError = () => {
  return {
    type: DELETE_SUPERADMIN_ERROR
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

export const editSuperAdminError = () => {
  return {
    type: EDIT_SUPERADMIN_ERROR
  };
};
