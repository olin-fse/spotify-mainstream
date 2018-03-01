// Login container and logic
import React, { Component } from 'react';

class Login extends Component {

	loginClick = () => {
		fetch('/login', {
      method: 'POST',
		})
    .then(res => res.json())
    .then(json=> {
      window.location = json.redirectUrl;
    })
    .catch(err => {
      console.error(err);
    })
	}

  render() {
    return (
      <div className="login">
        <h3>This is the login component</h3>
				<button onClick={this.loginClick}>Login</button>
				{/* <a href="/login">LOGIN </a> */}
      </div>
    );
  }
}

export default Login;
