const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

let app = express();
const port = process.env.PORT || 5000;

// // Connect to database and example query to confirm
// TODO -> Don't need to be secret
var DB_CONFIG = require('./config/database_config.secret.json');
connection = mysql.createConnection({
	host: process.env.TEST_DB_HOST || DB_CONFIG.host,
	port: process.env.TEST_DB_PORT || DB_CONFIG.port,
	user: process.env.TEST_DB_USERNAME || DB_CONFIG.login,
	password: process.env.TEST_DB_PASSWORD || DB_CONFIG.pass,
	database: process.env.TEST_DB_NAME || DB_CONFIG.database
});

connection.connect(function(err) { 
	if (err) { 
		console.error('Error connecting to mysql: ' + err.stack);
		return;
	}
	console.log('Connected to database');
});

var sql_command = "show tables";
connection.query(sql_command, function (err, res) {
	if (err) {
		console.error('Error getting database tables: ' + err.stack);
	}
	console.log("Found database tables: " + JSON.stringify(res));
});


// TODO: Discuss if each component is handling its own queries
module.exports = connection;

// The internal routes will be prepended with /api/v1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const router = require('./routes/index.js');
const loginRouter = require('./routes/login.js');
app.use('/api/v1/', router);
app.use('/login', loginRouter);

app.db = connection;

module.exports = app;