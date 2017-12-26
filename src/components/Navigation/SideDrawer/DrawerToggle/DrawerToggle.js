/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = props => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
    onKeydown={props.clicked}
  >
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
