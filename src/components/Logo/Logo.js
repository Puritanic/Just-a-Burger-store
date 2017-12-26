import React from 'react';
import logo from '../../assets/127 burger-logo.png';
import classes from './Logo.css';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={logo} alt="Store logo" />
  </div>
);

export default Logo;
