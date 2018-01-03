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

export const logout = () => ({
  type: types.AUTH_LOGOUT
});

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
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err) => {
      console.log(err.response.data.error.message);
      dispatch(authFailure(err.response.data.error));
    });
};
