import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Wrapper';

const withErrorHandler = (WrappedComponent, axios) =>
  class extends Component {
    state = {
      err: null
    };

    componentWillMount = () => {
      this.reqIntercept = axios.interceptors.request.use((req) => {
        this.setState((state, props) => ({ err: null }));
        // in request interceptor we have to return request in order for request to continue
        return req;
      });
      this.resIntercept = axios.interceptors.response.use(
        res => res,
        (err) => {
          this.setState((state, props) => ({ err }));
        }
      );
    };

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqIntercept);
      axios.interceptors.response.eject(this.resIntercept);
    };

    errConfirmedHandler = () => {
      this.setState((state, props) => ({ err: null }));
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.err} modalClosed={this.errConfirmedHandler}>
            {this.state.err && this.state.err.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };

export default withErrorHandler;
