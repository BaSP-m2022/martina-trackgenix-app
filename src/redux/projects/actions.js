import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR,
  CLEAN_PROJECTS_ERROR
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

export const deleteProjectsPending = () => ({
  type: DELETE_PROJECTS_PENDING
});

export const deleteProjectsSuccess = (projectsId) => ({
  type: DELETE_PROJECTS_SUCCESS,
  payload: projectsId
});

export const deleteProjectsError = (error) => ({
  type: DELETE_PROJECTS_ERROR,
  payload: error
});

export const cleanProjectsError = () => ({
  type: CLEAN_PROJECTS_ERROR
});
