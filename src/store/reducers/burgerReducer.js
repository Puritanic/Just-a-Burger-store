import * as types from '../types';

const initialState = {
  ingredients: null,
  totalPrice: 3.3,
  loading: false,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      // Immutability flow
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // React 16 computed property
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case types.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // React 16 computed property
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};
