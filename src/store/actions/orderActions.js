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

export const initPurchase = (orderData, token) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axios
    .post(`users/${orderData.userId}/orders.json?auth=${token}`, orderData)
    .then((response) => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFailure(err));
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

export const fetchOrders = (
  token = localStorage.getItem('token'),
  userId = localStorage.getItem('userId')
) => (dispatch) => {
  dispatch(fetchOrdersStart());
  axios
    .get(`users/${userId}/orders.json?auth=${token}`)
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

// "orders": {
//   ".read": "auth !== null",
//     ".write": "auth !== null"
// }
