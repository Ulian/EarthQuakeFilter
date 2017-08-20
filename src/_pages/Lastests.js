import React, { Component } from 'react';

import { Alert, EarthQuakeDetails } from '../_components/index';
import { EarthQuakeService } from '../_services/index';

export class Lastests extends Component {
  constructor() {
    super();

    this.state = {
      earthQuakeList: null,
      limit: 10
    }
  }

  componentWillMount() {
    const { limit } = this.state;
    EarthQuakeService.getEarthQuakes({ limit })
      .then(response => this.setState({ earthQuakeList: response }));
  }

  render() {
    const earthQuakeList = (this.state.earthQuakeList) ? this.state.earthQuakeList.map((element) => {
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
        <h1 className="mt-4 mb-3">Last { this.state.limit } earth quakes.</h1>
        { earthQuakeList }
      </div>
    )
  };
}

export default Lastests;
