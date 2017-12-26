import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';

const SideDrawer = (props) => {
  // ..
  console.log(props);
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default SideDrawer;
