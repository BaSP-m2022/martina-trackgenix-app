import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
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
export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const addProjectPending = () => ({
  type: ADD_PROJECT_PENDING
});

export const addProjectSuccess = (project) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: project
});

export const addProjectError = (error) => ({
  type: ADD_PROJECT_ERROR,
  payload: error
});

export const editProjectPending = () => ({
  type: EDIT_PROJECT_PENDING
});

export const editProjectSuccess = (project) => ({
  type: EDIT_PROJECT_SUCCESS,
  payload: project
});

export const editProjectError = (error) => ({
  type: EDIT_PROJECT_ERROR,
  payload: error
});
