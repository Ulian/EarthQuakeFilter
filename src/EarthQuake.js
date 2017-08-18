import React, { Component } from 'react'

class EarthQuake extends Component {
  render() {
    return(
      <div className="row">
        <div className="col">Magnitud: { this.props.mag }</div>
        <div className="col">{ this.props.place }</div>
        <div className="col"> { new Date(this.props.time).toLocaleDateString() }</div>
        <div className="col"><a href={ this.props.url }>Detalles</a></div>
        <div className="col">Latitud { this.props.latitude }</div>
        <div className="col">Longitud: { this.props.longitude }</div>
      </div>
    );
  }
}

export default EarthQuake;
