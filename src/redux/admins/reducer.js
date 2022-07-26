import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  CHANGE_STATUS_ADMINS_PENDING,
  CHANGE_STATUS_ADMINS_SUCCESS,
  CHANGE_STATUS_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR
} from 'redux/admins/constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
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
        error: true
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((a) => a._id !== action.payload),
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case CHANGE_STATUS_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CHANGE_STATUS_ADMINS_SUCCESS:
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
    case CHANGE_STATUS_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_ADMIN_SUCCESS:
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
    case EDIT_ADMIN_ERROR:
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
