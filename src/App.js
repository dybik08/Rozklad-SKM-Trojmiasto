import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Departures from './components/departures';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Departures/>
      </div>



    );
  }
}

export default App;
