import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import burgerReducer from './reducers/burgerReducer';
import orderReducer from './reducers/orderReducer';
import authReducer from './reducers/auth';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
