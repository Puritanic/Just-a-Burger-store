import * as types from '../types';
import { updateObject } from '../../helpers';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case types.AUTH_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        token: action.idToken,
        userId: action.userId
      });
    case types.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null });
    case types.AUTH_FAILURE:
      return updateObject(state, { error: action.err, loading: false });
    default:
      return state;
  }
};
