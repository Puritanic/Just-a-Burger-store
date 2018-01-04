import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { authCheckState } from './store/actions/auth';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoSignup();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuth: !!state.auth.token
});

const mapDispatchToProps = dispatch => ({
  tryAutoSignup: () => dispatch(authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
