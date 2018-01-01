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
