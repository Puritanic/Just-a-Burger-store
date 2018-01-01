import * as types from '../types';

const initialState = {
  orders: [],
  loading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case types.PURCHASE_BURGER_SUCCESS: {
      const newOrder = {
        ...action.orderData,
        id: action.id
      };
      return {
        ...state,
        loading: false,
        // Concat returns the new array so we are updating state immutably here
        orders: state.orders.concat(newOrder)
      };
    }
    case types.PURCHASE_BURGER_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default orderReducer;
