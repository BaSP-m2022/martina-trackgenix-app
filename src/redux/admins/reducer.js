import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR,
  ADD_ADMINS_PENDING,
  ADD_ADMINS_SUCCESS,
  ADD_ADMINS_ERROR,
  EDIT_ADMINS_PENDING,
  EDIT_ADMINS_SUCCESS,
  EDIT_ADMINS_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a.id !== action.payload),
        isLoading: false
      };
    case DELETE_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case ADD_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMINS_SUCCESS:
      return {
        ...state,
        list: [...state, action.payload],
        isLoading: false
      };
    case ADD_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // Update the updated admin into the previous admin list
        list: state.list.map((a) => {
          if (a._id === action.payload._id) {
            return action.payload;
          }
          return a;
        })
      };
    case EDIT_ADMINS_ERROR:
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
