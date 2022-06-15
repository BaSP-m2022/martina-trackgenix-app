import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR
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
