import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../styles/layout.css';
import '../styles/tracks.css';
import { Provider } from '../context';
import Navbar from './layout/Navbar';
import IndexPage from './layout/IndexPage';
import Lyrics from './tracks/Lyrics';

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;