import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const timeSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: false
      };
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((timesheet) => timesheet._id !== action.payload),
        isLoading: false,
        error: false
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
