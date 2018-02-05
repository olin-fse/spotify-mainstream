const express = require('express');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

// Connect to database and log tables to confirm
var DB_CONFIG = require('./config/database_config.secret.json');
connection = mysql.createConnection({
	host: DB_CONFIG.host,
	port: DB_CONFIG.port,
	user: DB_CONFIG.login,
	password: DB_CONFIG.pass,
	database: DB_CONFIG.database
});

connection.connect(function(err) { 
	if (err) { 
		console.error('Error connecting to mysql: ' + err.stack);
		return;
	}
	console.log('Connected to database as ' + connection.threadID);
});

var sql_command = "show tables";
connection.query(sql_command, function (err, res) {
	if (err) {
		console.error('Error getting database tables: ' + err.stack);
	}
	console.log("Found database tables: " + JSON.stringify(res));
});

// TODO --> put the routes into the ./routes folder/files
// TODO --> also, write tests for all of these!
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/login-user', (req, res) => {
  res.send({})
})

app.listen(port, () => console.log(`Listening on port ${port}`));
