import React from 'react';
import Aux from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Checkout?</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">
          Nope
        </Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">
          Go!
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
