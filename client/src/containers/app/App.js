import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

import NewParty from 'containers/new-party/NewParty';
import Login from 'containers/login/Login';
// import Playlist from 'containers/playlist/Playlist';

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
        <Login />
        <NewParty />
        {/* <Playlist /> */}
      </div>
    );
  }
}

export default App;