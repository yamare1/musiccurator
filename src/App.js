import React from 'react';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'

import NavBar from './components/layouts/navbar';
import Index from './components/layouts/Index';
import Lyrics from './components/tracks/Lyrics';

import {Provider} from './context';

function App() {
  return (
    <Provider>
     <Router> 
       <React.Fragment>
         <NavBar/>
         <div className='container'>
           <Switch>
            <Route exact path="/"  component={Index} />
            <Route exact path="/lyrics/track/:id"  component={Lyrics} />
           </Switch>
          </div> 
        </React.Fragment>  
      </Router>
      </Provider> 
  );
}

export default App;
