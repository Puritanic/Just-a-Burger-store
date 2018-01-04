import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AsyncComponent from './hoc/asyncComponent/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { authCheckState } from './store/actions/auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';

// Lazy loading routes
const asyncCheckout = AsyncComponent(() =>
  import('./containers/Checkout/Checkout'));
const asyncOrders = AsyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = AsyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoSignup();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
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
