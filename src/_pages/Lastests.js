import React, { Component } from 'react';

import { EarthQuakeList } from '../_components/index';
import { EarthQuakeService } from '../_services/index';

export class Lastests extends Component {
  constructor() {
    super();

    this.state = {
      earthQuakeList: [],
      limit: 10
    }
  }

  componentWillMount() {
    const { limit } = this.state;
    EarthQuakeService.getEarthQuakes({ limit })
      .then(response => this.setState({ earthQuakeList: response }));
  }

  render() {
    return(
      <div>
        <h1 className="mt-4 mb-3">Last { this.state.limit } earth quakes.</h1>
        <EarthQuakeList data={ this.state.earthQuakeList } />
      </div>
    )
  };
}

export default Lastests;
