import React from 'react';
import Aux from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
      {props.ingredients[igKey]}
    </li>
  ));
  console.log(props);
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: ${props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType="Danger">
        Nope
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        Go!
      </Button>
    </Aux>
  );
};

export default OrderSummary;
