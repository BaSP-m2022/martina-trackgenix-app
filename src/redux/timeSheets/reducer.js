import {
  GET_TIMESHEET_SUCCESS,
  GET_TIMESHEET_PENDING,
  GET_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_ERROR,
  CLEAN_TIMESHEET_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: ''
};

export const timeSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: false,
        message: ''
      };
    case GET_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((t) => t._id !== action.payload.timeSheetsId),
        isLoading: false,
        error: false,
        message: action.payload.message
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case CLEAN_TIMESHEET_ERROR:
      return {
        ...state,
        error: false,
        message: ''
      };
    default:
      return state;
  }
};
