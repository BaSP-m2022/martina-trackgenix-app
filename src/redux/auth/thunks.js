import {
  loginPending,
  loginSuccess,
  loginError,
  getAuthenticationError,
  getAuthenticationSuccess,
  getAuthenticationPending
} from 'redux/auth/actions';
import firebaseApp from 'helper/firebase';
import { useSelector } from 'react-redux';

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

export const getAuth = () => {
  return (dispatch) => {
    dispatch(getAuthenticationPending());
    const token = useSelector((state) => state.auth.authenticated?.token);
    return fetch(`${process.env.REACT_APP_API}/auth/`, { headers: { token } })
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
