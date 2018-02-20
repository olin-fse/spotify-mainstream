// Login container and logic
import React, { Component } from 'react';
import './Login.sass';

// var db_connection = require('./../../../server');

class Login extends Component {

  newUser = () => {
		// console.log("Creating new user profile ...");
		// // TODO --> Get actual form data, this is a database example
		// var sql_command = "INSERT INTO users (username) VALUES ('Person')";
		// connection.query(sql_command, function (err, res) {
		// 	if (err) {
		// 	console.error('Error writing new user to database: ' + err.stack);
		// 	}   
		// 	console.log("Created new user: " + result.insertID);
		// });
  }

  render() {
    return (
      <div className="login">
          This is the login component
		  <button onClick={this.newUser}>New Profile</button>
      </div>
    );
  }
}

export default Login;
