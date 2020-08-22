import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { EarthQuakeDetails, Alert } from './/index';

export class EarthQuakeList extends Component {
  render() {
    const list = (this.props.data.length > 0) ? this.props.data.map((element) => {
      const { code, mag, place, time, url } = element.properties;
      const { coordinates } = element.geometry;

      return <EarthQuakeDetails
                key={ code }
                mag={ mag }
                place={ place }
                time={ time }
                url={ url }
                latitude={ coordinates[0] }
                longitude={ coordinates[1] }
              />
    }) : <Alert type="info" message="Loading..." />;

    return(
      <div>
        { list }
      </div>
    )
  };
}

EarthQuakeList.propTypes = {
  data: PropTypes.array.isRequired
}

export default EarthQuakeList;
