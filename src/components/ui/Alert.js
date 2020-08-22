import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, children }) => {
  return (
      <div className={ `alert alert-${ type }  mt-3` } role="alert">
        { children }
      </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired
};

export default Alert;
