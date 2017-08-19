import React, { Component } from 'react';

import EarthQuakeDetails from './EarthQuakeDetails';
import InputGroup from './InputGroup';
import Alert from './Alert.js';

import EarthQuakeService from './EarthQuakeService';

class App extends Component {
  constructor() {
    super();
    const date = new Date();

    this.state = {
      earthquakes: null,
      startTime: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate() - 1)).slice(-2)}`,
      endTime: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
      minMag: 3
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { startTime, endTime, minMag } = this.state;

    EarthQuakeService.getEarthQuakes(startTime, endTime, minMag)
      .then(response => this.setState({ earthquakes: response}));
  }

  onChange(event) {
    const { startTime, endTime, minMag } = this.state;

    switch(event.target.id) {
      case 'minMagnitude':
        this.setState({ minMag: event.target.value }, () => EarthQuakeService.getEarthQuakes(startTime, endTime, this.state.minMag).then(response => this.setState({ earthquakes: response })));
        break;
      case 'startTime':
        this.setState({ startTime: event.target.value}, () => EarthQuakeService.getEarthQuakes(this.state.startTime, endTime, minMag).then(response => this.setState({ earthquakes: response })));
        break;
      case 'endTime':
        this.setState({ endTime: event.target.value}, () => EarthQuakeService.getEarthQuakes(startTime, this.state.endTime, minMag).then(response => this.setState({ earthquakes: response })));
        break;
      default:
        break;
    }
  }

  render() {
    const earthquakes = (this.state.earthquakes) ? this.state.earthquakes.map((element) => {
      return <EarthQuakeDetails
                key={ element.properties.code }
                mag={ element.properties.mag }
                place={ element.properties.place }
                time={ element.properties.time }
                url={ element.properties.url }
                latitude={ element.geometry.coordinates[0] }
                longitude={ element.geometry.coordinates[1] }
              />
    }) : 'Loading...';

    const inputGroups = [{
        id: 'minMagnitude',
        name: `Magnitude ${parseFloat(this.state.minMag).toFixed(1)}`,
        type: 'range',
        value: this.state.minMag.toString(),
        min: '0.1',
        max: '10.0',
        step: '0.1',
        onChange: this.onChange
      }, {
        id: 'startTime',
        name: 'Fecha Inicio',
        type: 'date',
        value: this.state.startTime,
        onChange: this.onChange
      }, {
        id: 'endTime',
        name: 'Fecha Fin',
        type: 'date',
        value: this.state.endTime,
        onChange: this.onChange
      }
    ].map(props => <InputGroup key={ props.id } { ...props } />);

    return (
      <div className="container">
        <br/>
        <form className="form-row">
          { inputGroups }
        </form>
        <br/>

        { earthquakes.length > 0 ? earthquakes : <Alert type="warning" message="Sin datos con esos filtros." /> }
      </div>
    );
  }
}

export default App;
