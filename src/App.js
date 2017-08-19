import React, { Component } from 'react';

import EarthQuakeDetails from './EarthQuakeDetails';
import InputGroup from './InputGroup';

import EarthQuakeService from './EarthQuakeService';

class App extends Component {
  constructor() {
    super();
    this.date = new Date();

    this.state = {
      earthquakes: null,
      startTime: `${this.date.getFullYear()}-${('0' + (this.date.getMonth() + 1)).slice(-2)}-${('0' + (this.date.getDate() - 1)).slice(-2)}`,
      endTime: `${this.date.getFullYear()}-${('0' + (this.date.getMonth() + 1)).slice(-2)}-${('0' + this.date.getDate()).slice(-2)}`,
      minMag: 3
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EarthQuakeService.getEarthQuakes(this.state.startTime, this.state.endTime, this.state.minMag);
  }

  onChange(event) {
    switch(event.target.id) {
      case 'minMagnitude':
        this.setState({ minMag: event.target.value }, () => EarthQuakeService.getEarthQuakes(this.state.startTime, this.state.endTime, this.state.minMag));
        break;
      case 'startTime':
        this.setState({ startTime: event.target.value}, () => EarthQuakeService.getEarthQuakes(this.state.startTime, this.state.endTime, this.state.minMag));
        break;
      case 'endTime':
        this.setState({ endTime: event.target.value}, () => EarthQuakeService.getEarthQuakes(this.state.startTime, this.state.endTime, this.state.minMag));
        break;
      default:
        break;
    }
    console.log(event.target.value)
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

    return (
      <div className="container">
        <br/>
        <form className="form-row">
          <InputGroup
            id="minMagnitude"
            name={ 'Magnitude ' + parseFloat(this.state.minMag).toFixed(1) }
            type="range"
            value={ this.state.minMag.toString() }
            min="0.1"
            max="10.0"
            step="0.1"
            onChange={ this.onChange }
          />

          <InputGroup
            id="startTime"
            name="Fecha Inicio" type="date"
            value={ this.state.startTime }
            onChange={ this.onChange }
          />

          <InputGroup
            id="endTime"
            name="Fecha Fin" type="date"
            value={ this.state.endTime }
            onChange={ this.onChange }
          />
        </form>
        <br/>

        { earthquakes.length > 0 ? earthquakes : <div className="alert alert-warning" role="alert">Sin datos con esos filtros.</div> }
      </div>
    );
  }
}

export default App;
