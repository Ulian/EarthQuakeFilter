import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NavigationBar extends Component {
  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/lastests" className="navbar-brand">EarthQuake</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/lastests" className="nav-link">Lastests</Link>
              </li>
              <li className="nav-item">
                <Link to="/filter" className="nav-link">Filter</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  };
}

export default NavigationBar;
