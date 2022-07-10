import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION
} from 'redux/auth/constants';

const initialState = {
  isLoading: false,
  authenticated: undefined,
  user: undefined,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        authenticated: action.payload
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case GET_AUTH_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    }
    case GET_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isLoading: false
      };
    }
    default: {
      return state;
    }
  }
};
