import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavigationBar } from './_components/index';
import { Lastests, Filter } from './_pages/index';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container">
          <Switch>
            <Route path="/filter" component={ Filter } />
            <Route component={ Lastests } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
