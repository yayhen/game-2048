import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Game } from './pages/game';
import { Start } from './pages/start';

function App() {
  return (
    <Router>
      <div className="App">

      </div>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/start">
          <Start />
        </Route>
        <Route path="/">
          <Start />
        </Route>
        </Switch>
    </Router>
    
  );
}

export default App;
