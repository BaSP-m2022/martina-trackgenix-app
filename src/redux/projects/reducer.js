import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
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
        error: action.payload
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload),
        isLoading: false
      };
    case DELETE_PROJECTS_ERROR:
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

export default projectReducer;
