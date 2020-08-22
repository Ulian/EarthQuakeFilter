import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavigationBar } from './components/index';
import { Latest } from './pages/index';
import Filter from "./pages/Filter";

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <Switch>
            <Route path="/filter" component={ Filter } />
            <Route component={ Latest } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
