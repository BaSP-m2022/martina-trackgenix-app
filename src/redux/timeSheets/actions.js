import {
  GET_TIMESHEET_SUCCESS,
  GET_TIMESHEET_PENDING,
  GET_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR,
  CLEAN_TIMESHEET_ERROR
} from './constants';

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

export const cleanTimeSheetError = () => ({
  type: CLEAN_TIMESHEET_ERROR
});
