import React from 'react';
import logo from '../../assets/127 burger-logo.png';
import classes from './Logo.css';

const Logo = props => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img src={logo} alt="Store logo" />
  </div>
);

export default Logo;
