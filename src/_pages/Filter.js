import React, { Component } from 'react';

import { Alert, EarthQuakeDetails, InputGroup } from '../_components/index';
import { EarthQuakeService } from '../_services/index';

export class Filter extends Component {
  constructor() {
    super();

    const date = new Date();

    this.state = {
      earthQuakeList: null,
      startTime: `${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1)).slice(-2) }-${ ('0' + (date.getDate() - 1)).slice(-2) }`,
      endTime: `${ date.getFullYear() }-${ ('0' + (date.getMonth() + 1)).slice(-2) }-${ ('0' + date.getDate()).slice(-2) }`,
      minMagnitude: 3.0,
      limit: 10
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.updateEarthQuakeList();
  }

  onChange(event) {
    switch(event.target.id) {
      case 'minMagnitude':
        this.setState({ minMagnitude: event.target.value }, () => this.updateEarthQuakeList());
        break;
      case 'startTime':
        this.setState({ startTime: event.target.value }, () => this.updateEarthQuakeList());
        break;
      case 'endTime':
        this.setState({ endTime: event.target.value }, () => this.updateEarthQuakeList());
        break;
      case 'limit':
        this.setState({ limit: event.target.value }, () => this.updateEarthQuakeList());
        break;
      default:
        break;
    }
  }

  updateEarthQuakeList() {
    const { startTime, endTime, minMagnitude, limit } = this.state;
    EarthQuakeService.getEarthQuakes({startTime, endTime, minMagnitude, limit})
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

    const inputGroups = [{
        id: 'minMagnitude',
        name: `Magnitude ${ parseFloat(this.state.minMagnitude).toFixed(1) }`,
        type: 'range',
        value: this.state.minMagnitude.toString(),
        min: '0.1',
        max: '10.0',
        step: '0.1',
        onChange: this.onChange
      }, {
        id: 'startTime',
        name: 'Start Date',
        type: 'date',
        value: this.state.startTime,
        onChange: this.onChange
      }, {
        id: 'endTime',
        name: 'End Date',
        type: 'date',
        value: this.state.endTime,
        onChange: this.onChange
      }, {
        id: 'limit',
        name: 'Limit',
        type: 'number',
        value: this.state.limit.toString(),
        onChange: this.onChange
      }
    ].map(props => <InputGroup key={ props.id } { ...props } />);

    return(
      <div>
        <form className="form-inline my-3">
          { inputGroups }
        </form>
        { earthQuakeList.length > 0 ? earthQuakeList : <Alert type="warning" message="No results with the current filters..." /> }
      </div>
    )
  };
}

export default Filter;
