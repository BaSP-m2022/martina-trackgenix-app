import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  ADD_SUPERADMINS_PENDING,
  ADD_SUPERADMINS_SUCCESS,
  ADD_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR,
  EDIT_SUPERADMINS_PENDING,
  EDIT_SUPERADMINS_SUCCESS,
  EDIT_SUPERADMINS_ERROR
} from './constants';

const stateInit = {
  list: [],
  isLoading: false,
  error: ''
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
        error: action.payload
      };
    case ADD_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: [...state, action.payload],
        isLoading: false
      };
    case ADD_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((b) => b._id !== action.payload),
        isLoading: false
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case EDIT_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_SUPERADMINS_SUCCESS:
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
    case EDIT_SUPERADMINS_ERROR:
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
