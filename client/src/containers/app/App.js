import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/v1/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify Mainstream!</h1>
        </header>
        <p className="AppIntro">{this.state.response}</p>
        <p className="AppIntro">
          Planning music for a party is difficult! We want to develop an easy way for someone to analyze their friends Spotify preferences to create a well-received and non-offensive playlist for a party.
        </p>
      </div>
    );
  }
}

export default App;