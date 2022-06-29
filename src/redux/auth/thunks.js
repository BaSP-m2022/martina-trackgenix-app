import { loginPending, loginSuccess, loginError } from 'redux/auth/actions';
import firebaseApp from 'helper/firebase';

// export const login = (credentials) => {
//   return (dispatch) => {
//     console.log('credentials', credentials);
//     dispatch(loginPending());
//     return firebaseApp
//       .auth()
//       .signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then(async (response) => {
//         console.log('user', firebaseApp);
//         const token = await response.user.getIdToken();
//         console.log('token', token);
//         const {
//           claims: { role }
//         } = await response.user.getIdTokenResult();
//         return dispatch(loginSuccess({ role, token }));
//       })
//       .catch((error) => {
//         return dispatch(loginError(error.toString()));
//       });
//   };
// };

export const login = (credentials) => {
  return async (dispatch) => {
    console.log('credentials', credentials);
    dispatch(loginPending());
    try {
      const firebaseRes = firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      console.log('user', firebaseRes);
      const token = await firebaseRes.user.getIdToken();
      console.log('token', token);
      const {
        claims: { role }
      } = await firebaseRes.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};
