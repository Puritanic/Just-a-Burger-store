import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Logout extends Component {
  componentWillMount = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    return <Spinner />;
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(withRouter(Logout));
