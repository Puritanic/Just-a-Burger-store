import axios from 'axios';
import * as types from '../types';

export const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = (idToken, userId) => ({
  type: types.AUTH_SUCCESS,
  idToken,
  userId
});

export const authFailure = err => ({
  type: types.AUTH_FAILURE,
  err
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: types.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expirationTime => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => (dispatch) => {
  // ...
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  // https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDgd-FaffAonHw-vPMAGx9Na_5EZzdDXpg';
  if (!isSignup) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDgd-FaffAonHw-vPMAGx9Na_5EZzdDXpg';
  }
  axios
    .post(url, authData)
    .then((response) => {
      console.log(response.data);

      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', response.data.localId);

      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
      dispatch(authFailure(err.response.data.error));
    });
};

export const setAuthRedirect = path => ({
  type: types.AUTH_SET_REDIRECT,
  path
});

// Persistent Auth State using local storage :|
export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(userId));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
