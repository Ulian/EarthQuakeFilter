import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Alert extends Component {
  render() {
    return(
      <div className={ `alert alert-${this.props.type}  mt-3` } role="alert">{ this.props.message }</div>
    )
  }
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Alert;
