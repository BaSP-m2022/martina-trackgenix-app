import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR,
  ADD_ADMINS_PENDING,
  ADD_ADMINS_SUCCESS,
  ADD_ADMINS_ERROR,
  EDIT_ADMINS_PENDING,
  EDIT_ADMINS_SUCCESS,
  EDIT_ADMINS_ERROR
} from './constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (admins) => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const deleteAdminsPending = () => ({
  type: DELETE_ADMINS_PENDING
});

export const deleteAdminsSuccess = (adminsId) => ({
  type: DELETE_ADMINS_SUCCESS,
  payload: adminsId
});

export const deleteAdminsError = (error) => ({
  type: DELETE_ADMINS_ERROR,
  payload: error
});

export const addAdminsPending = () => ({
  type: ADD_ADMINS_PENDING
});

export const addAdminsSuccess = (admins) => ({
  type: ADD_ADMINS_SUCCESS,
  payload: admins
});

export const addAdminsError = (error) => ({
  type: ADD_ADMINS_ERROR,
  payload: error
});

export const editAdminsPending = () => ({
  type: EDIT_ADMINS_PENDING
});

export const editAdminsSuccess = (adminsId) => ({
  type: EDIT_ADMINS_SUCCESS,
  payload: adminsId
});

export const editAdminsError = (error) => ({
  type: EDIT_ADMINS_ERROR,
  payload: error
});
