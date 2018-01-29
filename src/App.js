import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify Mainstream!</h1>
        </header>
		<p className="AppIntro">
		Planning music for a party is difficult! We want to develop an easy way for someone to analyze their friends Spotify preferences to create a well-received and non-offensive playlist for a party.
        </p>
      </div>
    );
  }
}

export default App;
