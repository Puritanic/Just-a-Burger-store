import * as types from '../types';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: types.PURCHASE_BURGER_SUCCESS,
  id,
  orderData
});

export const purchaseBurgerFailure = error => ({
  type: types.PURCHASE_BURGER_FAILURE,
  error
});

export const purchaseBurgerStart = () => ({
  type: types.PURCHASE_BURGER_START
});

export const initPurchase = orderData => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then((response) => {
      console.log(response);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((error) => {
      dispatch(purchaseBurgerFailure(orderData.error.msg));
    });
};

export const purchaseLoad = () => ({
  type: types.PURCHASE_LOAD
});

export const fetchOrdersStart = () => ({
  type: types.PURCHASE_BURGER_START
});

export const fetchOrdersSuccess = orders => ({
  type: types.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFailure = err => ({
  type: types.FETCH_ORDERS_FAILURE,
  err
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get('/orders.json')
    .then((res) => {
      const fetchedOrders = [];
      // eslint-disable-next-line
      for (const key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((err) => {
      dispatch(fetchOrdersFailure(err));
    });
};
