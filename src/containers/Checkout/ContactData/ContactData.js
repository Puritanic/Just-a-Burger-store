import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { initPurchase } from '../../../store/actions/orderActions';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
/* eslint-disable  */
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Street Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elType: 'input',
        elConfig: {
          type: 'text',
          placeholder: 'Contact Number'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elType: 'select',
        elConfig: {
          options: [
            {
              value: 'pro',
              displayValue: 'Pro'
            },
            {
              value: 'economic',
              displayValue: 'Economic'
            }
          ]
        },
        value: 'pro',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElId in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElId)) {
        formData[formElId] = this.state.orderForm[formElId].value;
      }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.initPurchase(order, this.props.token);
  };

  validate = (val, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = val.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = val.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = val.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  onInputChange = (e, inputId) => {
    e.preventDefault();
    const orderForm = { ...this.state.orderForm };
    const formEl = { ...orderForm[inputId] };
    formEl.value = e.target.value;
    formEl.valid = this.validate(formEl.value, formEl.validation);
    formEl.touched = true;
    orderForm[inputId] = formEl;

    let formIsValid = true;
    for (let inputId in orderForm) {
      if (orderForm.hasOwnProperty(inputId)) {
        formIsValid = orderForm[inputId].valid && formIsValid;
      }
    }
    this.setState((state, props) => {
      return { orderForm, formIsValid };
    });
  };

  render() {
    const formElArr = [];
    for (let key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElArr.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
    }
    let form = (
      <form>
        {formElArr.map(formEl => (
          <Input
            key={formEl.id}
            elType={formEl.config.elType}
            elConfig={formEl.config.elConfig}
            value={formEl.config.value}
            changed={event => this.onInputChange(event, formEl.id)}
            invalid={!formEl.config.valid}
            touched={formEl.config.touched}
            validate={!!formEl.config.validation}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initPurchase: (order, token) => dispatch(initPurchase(order, token))
});

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
