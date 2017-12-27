import React, { Component } from 'react';
import axios from '../../axios-orders';
import Aux from '../../hoc/Wrapper';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  purchaseHandler = (params) => {
    this.setState((state, props) => ({ purchasing: true }));
  };

  purchaseCancelHandler = () => {
    this.setState((state, props) => ({ purchasing: false }));
  };

  purchaseContinueHandler = () => {
    this.setState((state, props) => ({ loading: true }));
    console.log('Bon apetite');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Edward Turner',
        address: { street: '999 Retlor Street', zipcode: 'BZ123665' },
        contactNumber: '(782) 310-5864'
      },
      deliveryMethod: 'PlusPlus'
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.setState((state, props) => ({
          loading: false,
          purchasing: false
        }));
      })
      .catch((err) => {
        this.setState((state, props) => ({
          loading: false,
          purchasing: false
        }));
        console.log(err);
      });
  };

  updatePuchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((previous, current) => previous + current, 0);
    this.setState((state, props) => ({ purchasable: sum > 0 }));
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
    this.updatePuchaseState(updatedIngredients);
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
    this.updatePuchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.state.totalPrice}
      />
    );
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    // eslint-disable-next-line guard-for-in
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    console.log(disabledInfo);
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabledInfo={disabledInfo}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
