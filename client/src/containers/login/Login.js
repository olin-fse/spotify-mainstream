// Login container and logic
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './LoginActions';
// import * as appActions from 'containers/app/AppActions';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Login extends Component {

  constructor(props) {
    super(props);
    const params = this.getHashParams();
    // console.log(params);
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      this.props.setUserToken(token);
      this.getUserInfo();
    }
    
    // TODO --> make this redux
    this.state = {
      loggedIn: token ? true : false,
    }
  }

  getHashParams() {
    // get the URL params
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getUserInfo = () => {
    spotifyApi.getMe()
      .then((response) => {
      // TODO --> Make this Redux
      this.setState({
        username: response.display_name,
      })
    })
  }

  render() {
    return (
      <div className="login">
        { //Check if message failed
          (this.state.loggedIn)
            ? <div className="welcome-message"> Hello, {this.state.username}!</div> 
            : <a className="login-user" href="/login">LOGIN </a>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    login: state.login,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);