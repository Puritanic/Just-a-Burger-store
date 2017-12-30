import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
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
    formIsValid: false,
    loading: false
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
      price: this.props.price,
      orderData: formData
    };
    this.setState({ loading: true });
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
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
    if (this.state.loading) {
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

export default ContactData;
