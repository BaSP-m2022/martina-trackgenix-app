import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  ADD_TASKS_PENDING,
  ADD_TASKS_SUCCESS,
  ADD_TASKS_ERROR,
  EDIT_TASKS_PENDING,
  EDIT_TASKS_SUCCESS,
  EDIT_TASKS_ERROR
} from './constants';

export const getTasksPending = () => ({
  type: GET_TASKS_PENDING
});

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks
});

export const getTasksError = (error) => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const deleteTasksPending = () => ({
  type: DELETE_TASKS_PENDING
});

export const deleteTasksSuccess = (taskId) => ({
  type: DELETE_TASKS_SUCCESS,
  payload: taskId
});

export const deleteTasksError = (error) => ({
  type: DELETE_TASKS_ERROR,
  payload: error
});

export const addTasksPending = () => ({
  type: ADD_TASKS_PENDING
});

export const addTasksSuccess = (tasks) => ({
  type: ADD_TASKS_SUCCESS,
  payload: tasks
});

export const addTasksError = (error) => ({
  type: ADD_TASKS_ERROR,
  payload: error
});

export const editTasksPending = () => ({
  type: EDIT_TASKS_PENDING
});

export const editTasksSuccess = (tasks) => ({
  type: EDIT_TASKS_SUCCESS,
  payload: tasks
});

export const editTasksError = (error) => ({
  type: EDIT_TASKS_ERROR,
  payload: error
});
