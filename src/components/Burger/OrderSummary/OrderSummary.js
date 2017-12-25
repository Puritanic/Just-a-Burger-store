import React from 'react';
import Aux from '../../../hoc/Wrapper';

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
      <p>Checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
