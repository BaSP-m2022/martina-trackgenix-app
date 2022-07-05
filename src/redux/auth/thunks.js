import {
  loginPending,
  loginSuccess,
  loginError,
  getAuthenticationError,
  getAuthenticationSuccess,
  getAuthenticationPending,
  setAuthentication
} from 'redux/auth/actions';
import firebaseApp from 'helper/firebase';

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginPending());
    return firebaseApp
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async (response) => {
        const token = await response.user.getIdToken();
        const {
          claims: { role }
        } = await response.user.getIdTokenResult();
        return dispatch(loginSuccess({ role, token }));
      })
      .catch((error) => {
        return dispatch(loginError(error.toString()));
      });
  };
};

export const getAuth = (token) => {
  return (dispatch) => {
    dispatch(getAuthenticationPending());
    return fetch(`${process.env.REACT_APP_API_URL}/auth/`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAuthenticationSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAuthenticationError(error.toString()));
      });
  };
};

export const logOut = () => {
  return (dispatch) => {
    return firebaseApp
      .auth()
      .signOut()
      .then(() => {
        dispatch(setAuthentication());
        return { error: false, message: 'Log Out Successfully' };
      })
      .catch((error) => {
        console.error(error);
        return {
          error: true,
          message: error
        };
      });
  };
};
