import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LocationSearch from './components/LocationSearch';
import HomePage from './components/HomePage'

function App() {






  return (
    <div className="App">
    <div className="heading">
    <Router>
      <div className="navBar">
      <ul className="NavLinksUl">
        <li className="navLinkLI"><Link className="navLink" to="/home">Home</Link></li>
        <li className="navLinkLI"><Link className="navLink" to="/venue">Venue</Link></li>
        <li className="navLinkLI"><Link className="navLink" to="/location">Location</Link></li>
      </ul>

      <Switch>

      <div  className="mainContainer">




        <Route path="/location">
          <LocationSearch/>
        </Route>

        <Route path="/home">
        <HomePage/>
        </Route>

        <Route>

        </Route>

      </div>
      </Switch>

      </div>
    </Router>
    </div>


      <div>

      </div>

    </div>
  );
}

export default App;
