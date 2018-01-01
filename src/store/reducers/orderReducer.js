import * as types from '../types';
import { updateObject } from '../../helpers';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_LOAD:
      return updateObject(state, { purchased: false });
    case types.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case types.PURCHASE_BURGER_SUCCESS: {
      const newOrder = {
        ...action.orderData,
        id: action.id
      };
      return updateObject(state, {
        loading: false,
        purchased: true,
        // Concat returns the new array so we are updating state immutably here
        orders: state.orders.concat(newOrder)
      });
    }
    case types.PURCHASE_BURGER_FAILURE:
      return updateObject(state, { loading: false });
    case types.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case types.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false
      });
    case types.FETCH_ORDERS_FAILURE:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default orderReducer;
