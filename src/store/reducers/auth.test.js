import reducer from './auth';
import * as types from '../types';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

describe('Auth reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store token upon login', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SUCCESS,
      idToken: 'test-token',
      userId: 'test-user-id'
    })).toEqual({
      token: 'test-token',
      userId: 'test-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});
