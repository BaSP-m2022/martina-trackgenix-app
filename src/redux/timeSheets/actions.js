import {
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_ERROR,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_ERROR,
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
export const addTimeSheetError = () => ({
  type: ADD_TIMESHEET_ERROR
});
export const editTimeSheetSuccess = (timeSheet) => ({
  type: EDIT_TIMESHEET_SUCCESS,
  payload: timeSheet
});
export const editTimeSheetPending = () => ({
  type: EDIT_TIMESHEET_PENDING
});
export const editTimeSheetError = () => ({
  type: EDIT_TIMESHEET_ERROR
});
export const getTimeSheetSuccess = (timeSheets) => ({
  type: GET_TIMESHEETS_SUCCESS,
  payload: timeSheets
});

export const getTimeSheetPending = () => ({
  type: GET_TIMESHEETS_PENDING
});

export const getTimeSheetError = () => ({
  type: GET_TIMESHEETS_ERROR
});

export const deleteTimeSheetSuccess = (timeSheetId) => ({
  type: DELETE_TIMESHEET_SUCCESS,
  payload: timeSheetId
});

export const deleteTimeSheetPending = () => ({
  type: DELETE_TIMESHEET_PENDING
});

export const deleteTimeSheetError = () => ({
  type: DELETE_TIMESHEET_ERROR
});
