import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { purchaseLoad } from '../../store/actions/orderActions';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  componentDidMount = () => {};

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapDispatchToProps = () => dispatch => ({
  purchaseLoad: () => dispatch(purchaseLoad())
});

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
