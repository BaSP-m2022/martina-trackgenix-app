import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  CHANGE_STATUS_PENDING,
  CHANGE_STATUS_SUCCESS,
  CHANGE_STATUS_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};
export const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};
export const getProjectsError = () => {
  return {
    type: GET_PROJECTS_ERROR
  };
};

export const deleteProjectPending = () => ({
  type: DELETE_PROJECT_PENDING
});

export const deleteProjectSuccess = (projectId) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectId
});

export const deleteProjectError = () => ({
  type: DELETE_PROJECT_ERROR
});

export const changeStatusPending = () => ({
  type: CHANGE_STATUS_PENDING
});

export const changeStatusSuccess = (projectId) => ({
  type: CHANGE_STATUS_SUCCESS,
  payload: projectId
});

export const changeStatusError = () => ({
  type: CHANGE_STATUS_ERROR
});

export const addProjectPending = () => ({
  type: ADD_PROJECT_PENDING
});

export const addProjectSuccess = (project) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: project
});

export const addProjectError = () => ({
  type: ADD_PROJECT_ERROR
});

export const editProjectPending = () => ({
  type: EDIT_PROJECT_PENDING
});

export const editProjectSuccess = (project) => ({
  type: EDIT_PROJECT_SUCCESS,
  payload: project
});

export const editProjectError = () => ({
  type: EDIT_PROJECT_ERROR
});
