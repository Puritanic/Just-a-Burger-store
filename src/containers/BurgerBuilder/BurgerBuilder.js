import React, { Component } from 'react';
import Aux from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4
  };

  addIngredient = (type) => {
    // What the old ingredient count is
    const oldCount = this.state.ingredients[type];
    // Add new ingredient
    const updatedCount = oldCount + 1;
    // Prepare to update state in immutable way
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // Set the ingredient value/count to updated count
    updatedIngredients[type] = updatedCount;
    // Update total price
    const priceAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAdd;

    this.setState((state, props) => ({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    }));
  };

  removeIngredient = (type) => {
    // What the old ingredient count is
    const oldCount = this.state.ingredients[type];
    // Check if there is ingredient in burger
    if (oldCount <= 0) {
      return;
    }
    // Add new ingredient
    const updatedCount = oldCount - 1;
    // Prepare to update state in immutable way
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // Set the ingredient value/count to updated count
    updatedIngredients[type] = updatedCount;
    // Update total price
    const priceDeduct = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduct;

    this.setState((state, props) => ({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    }));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // eslint-disable-next-line guard-for-in
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    console.log(disabledInfo);
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}
