import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  ADD_EMPLOYEE_PENDING,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_ERROR
} from 'redux/employees/constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a._id !== action.payload),
        isLoading: false
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        })
      };
    case EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default: {
      return state;
    }
  }
};
