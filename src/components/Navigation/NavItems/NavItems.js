import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const NavItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/" active>
      Burger Builder
    </NavItem>
    <NavItem link="/" active={false}>
      Checkout
    </NavItem>
  </ul>
);

export default NavItems;
