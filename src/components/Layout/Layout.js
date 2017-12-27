import React from 'react';
import Aux from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };
  sideDrawerClose = () => {
    this.setState((state, props) => ({ showSideDrawer: false }));
  };

  sideDrawerToggle = () => {
    this.setState((state, props) => ({
      showSideDrawer: !state.showSideDrawer
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar toggleDrawer={this.sideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerClose}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
