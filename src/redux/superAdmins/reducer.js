import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMIN_PENDING,
  ADD_SUPERADMIN_SUCCESS,
  ADD_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  DELETE_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  CLEAN_SUPERADMIN_ERROR
} from './constants';

const stateInit = {
  list: [],
  isLoading: false,
  error: false,
  message: ''
};

export const superAdminsReducer = (state = stateInit, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case ADD_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_SUPERADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((b) => b._id !== action.payload)
      };
    case DELETE_SUPERADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          } else {
            return p;
          }
        })
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case CLEAN_SUPERADMIN_ERROR:
      return {
        ...state,
        error: false,
        message: ''
      };
    default: {
      return state;
    }
  }
};
