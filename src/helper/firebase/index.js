import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvmi-IhN0_qIbKNXXmJD2Qg35hf-7jzts',
  authDomain: 'basp-2022-trackgenix.firebaseapp.com',
  projectId: 'basp-2022-trackgenix',
  storageBucket: 'basp-2022-trackgenix.appspot.com',
  messagingSenderId: '537447283020',
  appId: '1:537447283020:web:1b0b8b34a59fd26e6577e9'
};

const firebaseApp = initializeApp(firebaseConfig);

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      sessionStorage.setItem('token', token);
    }
  });
};

export default firebaseApp;
