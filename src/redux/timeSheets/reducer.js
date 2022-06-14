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

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const timeSheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: false
      };
    case GET_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((t) => t._id !== action.payload),
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
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: false
      };
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        }),
        isLoading: false,
        error: false
      };
    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};
