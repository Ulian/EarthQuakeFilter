import React, { Component } from 'react';

import { EarthQuakeList } from '../components/index';
import { EarthQuakeService } from '../services/index';

const Latest = () => {
  const [ earthQuakeList, setEarthQuakeList ] = React.useState([]);
  const limit = 10;

  React.useEffect(() => {
    EarthQuakeService.getEarthQuakes({ limit })
        .then(response => setEarthQuakeList(response));
  }, []);

  return(
    <div>
      <h1 className="mt-4 mb-3">Last { limit } earth quakes.</h1>
      <EarthQuakeList data={ earthQuakeList } />
    </div>
  )
}

export default Latest;
