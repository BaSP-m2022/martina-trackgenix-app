import {
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_ERROR,
  GET_TIMESHEET_SUCCESS,
  GET_TIMESHEET_PENDING,
  GET_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR
} from './constants';

export const addTimeSheetSuccess = (timeSheet) => ({
  type: ADD_TIMESHEET_SUCCESS,
  payload: timeSheet
});
export const addTimeSheetPending = () => ({
  type: ADD_TIMESHEET_PENDING
});
export const addTimeSheetError = (error) => ({
  type: ADD_TIMESHEET_ERROR,
  payload: error
});
export const editTimeSheetSuccess = (timeSheet) => ({
  type: EDIT_TIMESHEET_SUCCESS,
  payload: timeSheet
});
export const editTimeSheetPending = () => ({
  type: EDIT_TIMESHEET_PENDING
});
export const editTimeSheetError = (error) => ({
  type: EDIT_TIMESHEET_ERROR,
  payload: error
});
export const getTimeSheetSuccess = (timeSheets) => ({
  type: GET_TIMESHEET_SUCCESS,
  payload: timeSheets
});
export const getTimeSheetPending = () => ({
  type: GET_TIMESHEET_PENDING
});
export const getTimeSheetError = (error) => ({
  type: GET_TIMESHEET_ERROR,
  payload: error
});
export const deleteTimeSheetSuccess = (timeSheetsId) => ({
  type: DELETE_TIMESHEET_SUCCESS,
  payload: timeSheetsId
});
export const deleteTimeSheetPending = () => ({
  type: DELETE_TIMESHEET_PENDING
});
export const deleteTimeSheetError = (error) => ({
  type: DELETE_TIMESHEET_ERROR,
  payload: error
});
