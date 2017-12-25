/* eslint-disable react/no-array-index-key */
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
  // Fn programming monster
  let ingredientsArr = Object.keys(props.ingredients)
    .map(ingredientKey =>
      [...Array(props.ingredients[ingredientKey])].map((_, i) => (
        <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
      )))
    .reduce((previous, current) => previous.concat(current), []);

  if (ingredientsArr.length === 0) {
    ingredientsArr = <p>Add tasty stuff</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArr}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
