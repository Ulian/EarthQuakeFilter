import React from 'react';
import { PropTypes } from 'prop-types';

import EarthQuakeDetails from "./EarthQuakeDetails";
import Alert from "./Alert";

const EarthQuakeList = ({ data }) => {
  const list = data.map((element) => {
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
    />;
  });

  return(
    <React.Fragment>
      { data.length ? list : <Alert type="info">Loading...</Alert> }
    </React.Fragment>
  )
}

EarthQuakeList.propTypes = {
  data: PropTypes.array.isRequired
}

export default EarthQuakeList;
