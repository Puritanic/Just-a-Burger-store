import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Wrapper';

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  console.log(props);
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
