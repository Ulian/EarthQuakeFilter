import React from 'react'

import PropTypes from 'prop-types';

const EarthQuakeDetails = ({ mag, place, time, url, latitude, longitude }) => {
    return(
      <div className="row">
        <div className="col">Magnitud: { mag }</div>
        <div className="col">{ place }</div>
        <div className="col"> { new Date(time).toUTCString() }</div>
        <div className="col"><a href={ url }>Detalles</a></div>
        <div className="col">Latitud { latitude }</div>
        <div className="col">Longitud: { longitude }</div>
      </div>
    );
}

EarthQuakeDetails.propTypes = {
  mag: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default EarthQuakeDetails;
