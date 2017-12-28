import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = props => (
  // eslint-disable-next-line
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
    onKeyDown={props.clicked}
  >
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
