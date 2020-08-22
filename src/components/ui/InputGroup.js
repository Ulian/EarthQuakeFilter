import React from 'react';

import PropTypes from 'prop-types';

const InputGroup = ({ name, ...props }) => {
  return(
    <div className="input-group col">
      <span className="input-group-addon">{ name }</span>
      <input className="form-control" { ...props } />
    </div>
  )
}

InputGroup.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
}

export default InputGroup;
