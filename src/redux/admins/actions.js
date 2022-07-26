import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  CHANGE_STATUS_ADMINS_PENDING,
  CHANGE_STATUS_ADMINS_SUCCESS,
  CHANGE_STATUS_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR
} from 'redux/admins/constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (admins) => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins
});

export const getAdminsError = () => ({
  type: GET_ADMINS_ERROR
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminSuccess = (adminId) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: adminId
});

export const deleteAdminError = () => ({
  type: DELETE_ADMIN_ERROR
});

export const changeStatusAdminsPending = () => ({
  type: CHANGE_STATUS_ADMINS_PENDING
});

export const changeStatusAdminsSuccess = (adminId) => ({
  type: CHANGE_STATUS_ADMINS_SUCCESS,
  payload: adminId
});

export const changeStatusAdminsError = () => ({
  type: CHANGE_STATUS_ADMINS_ERROR
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminSuccess = (admin) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: admin
});

export const addAdminError = () => ({
  type: ADD_ADMIN_ERROR
});

export const editAdminPending = () => ({
  type: EDIT_ADMIN_PENDING
});

export const editAdminSuccess = (admin) => ({
  type: EDIT_ADMIN_SUCCESS,
  payload: admin
});

export const editAdminError = () => ({
  type: EDIT_ADMIN_ERROR
});
