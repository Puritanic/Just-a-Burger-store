import axios from '../../axios-orders';
import * as types from '../types';

export const addIngredient = name => ({
  type: types.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = name => ({
  type: types.REMOVE_INGREDIENT,
  ingredientName: name
});

export const fetchIngredientsFailed = () => ({
  type: types.FETCH_INGREDIENTS_FAILED
});

const setIngredients = ingredients => ({
  type: types.SET_INGREDIENTS,
  ingredients
});

export const initIngredients = () => (dispatch) => {
  axios
    .get('https://burger-store.firebaseio.com/ingredients.json')
    .then((response) => {
      // console.log('[Init]', response);
      dispatch(setIngredients(response.data));
    })
    .catch((error) => {
      // console.log(error);
      dispatch(fetchIngredientsFailed());
    });
};
