import React, { Component } from 'react';
import axios from 'axios';
import EarthQuake from './EarthQuake'

class App extends Component {

  constructor() {
    super();
    this.state = {
      earthquakes: null,
      startTime: "2017-08-16",
      endTime: "2017-08-17",
      minMag: 3
    };

    this.onChange = this.onChange.bind(this);
  }

  getEarthQuakes() {
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.state.startTime}&endtime=${this.state.endTime}&minmagnitude=${this.state.minMag}`)
      .then(response => {
        this.setState({earthquakes: response.data.features});
      });
  }

  componentWillMount() {
    this.getEarthQuakes()
  }

  onChange(event, id) {
    switch(event.target.id) {
      case 'minMagnitude':
        this.setState({ minMag: event.target.value }, () => this.getEarthQuakes());
        break;
      case 'startTime':
        this.setState({ startTime: event.target.value}, () => this.getEarthQuakes());
        break;
      case 'endTime':
        this.setState({ endTime: event.target.value}, () => this.getEarthQuakes());
        break;
      default:
        break;
    }
  }

  render() {

    const earthquakes = (this.state.earthquakes) ? this.state.earthquakes.map((element) => {
      return <EarthQuake
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
          <div className="input-group col">
            <span className="input-group-addon">Magnitude { parseFloat(this.state.minMag).toFixed(1) }</span>
            <input type="range" className="form-control" id="minMagnitude" defaultValue={ this.state.minMag } min="0.1" max="10.0" step="0.1" onChange={ this.onChange }/>
          </div>

          <div className="input-group col">
            <span className="input-group-addon">Fecha Inicio</span>
            <input type="date" className="form-control" id="startTime" defaultValue={ this.state.startTime } onChange={ this.onChange }/>
          </div>

          <div className="input-group col">
            <span className="input-group-addon">Fecha Inicio</span>
            <input type="date" className="form-control" id="endTime" defaultValue={ this.state.endTime } onChange={ this.onChange }/>
          </div>
        </form>
        <br/>

        { earthquakes.length > 0 ? earthquakes : <div className="alert alert-warning" role="alert">Sin datos con esos filtros.</div> }
      </div>
    );
  }
}

export default App;
