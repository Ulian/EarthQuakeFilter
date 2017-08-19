import React, { Component } from 'react';

import PropTypes from 'prop-types';

class InputGroup extends Component {
  render() {
    const { id, type, value, name, onChange } = this.props;
    let optionalProps = {}

    if(this.props.hasOwnProperty('min') && this.props.hasOwnProperty('max') && this.props.hasOwnProperty('step')) {
      const { min, max, step } = this.props;
      optionalProps = {
        min,
        max,
        step
      }
    }
    return(
      <div className="input-group col">
        <span className="input-group-addon">{ name }</span>
        <input id={ id } type={ type } className="form-control" defaultValue={ value } onChange={ onChange } { ...optionalProps } />
      </div>
    )
  }
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
