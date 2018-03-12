import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

import NewParty from 'containers/new-party/NewParty';
import Login from 'containers/login/Login';
import * as actions from './AppActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {

  setUserToken = (token) => {
    this.props.actions.setUserToken(token);
  }

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
        <Login setUserToken={this.setUserToken}/>
        <NewParty />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);