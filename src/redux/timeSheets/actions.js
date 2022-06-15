import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR
} from './constants';

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
