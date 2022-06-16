import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: false
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        })
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload),
        isLoading: false
      };
    case DELETE_PROJECT_ERROR:
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
