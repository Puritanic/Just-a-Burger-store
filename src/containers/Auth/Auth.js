import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.css';
import { auth } from '../../store/actions/auth';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elType: 'input',
        elConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elType: 'input',
        elConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  onLogin = (e) => {
    e.preventDefault();
    const email = this.state.controls.email.value;
    const pass = this.state.controls.password.value;
    const { isSignup } = this.state;
    this.props.authenticate(email, pass, isSignup);
  };

  onInputChange = (e, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: e.target.value,
        valid: this.validate(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState((state, props) => ({ controls: updatedControls }));
  };

  switchAuthModeHandler = () => {
    this.setState((state, props) => ({ isSignup: !state.isSignup }));
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(val) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(val) && isValid;
    }
    return isValid;
  };

  render() {
    const formElArr = [];
    for (const key in this.state.controls) {
      if ({}.hasOwnProperty.call(this.state.controls, key)) {
        formElArr.push({
          id: key,
          config: this.state.controls[key]
        });
      }
    }
    let form = formElArr.map(formEl => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Auth}>
        {this.props.error && this.props.error.message}
        <form onSubmit={e => this.onLogin(e)}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? 'Sign up' : 'Sign in'}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Success">
          {this.state.isSignup ? 'Already registered? Sign in' : 'Register'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  userId: state.auth.userId,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  authenticate: (email, pass, isSignup) => dispatch(auth(email, pass, isSignup))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
