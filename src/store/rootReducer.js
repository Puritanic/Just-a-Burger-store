import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerReducer from './reducers/burgerReducer';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/auth';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

export const store = createStore(
  combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
