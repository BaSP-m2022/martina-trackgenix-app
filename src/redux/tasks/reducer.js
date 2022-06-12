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

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a._id !== action.payload),
        isLoading: false
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TASKS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // Update TASKS list
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        })
      };
    case EDIT_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default: {
      return state;
    }
  }
};
