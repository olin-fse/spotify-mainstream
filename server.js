const express = require('express');
const mysql = require('mysql');
const router = require('./routes/index.js');
const bodyParser = require('body-parser');

let app = express();
const port = process.env.PORT || 5000;

// // Connect to database and example query to confirm
// var DB_CONFIG = require('./config/database_config.secret.json');
// connection = mysql.createConnection({
// 	host: DB_CONFIG.host,
// 	port: DB_CONFIG.port,
// 	user: DB_CONFIG.login,
// 	password: DB_CONFIG.pass,
// 	database: DB_CONFIG.database
// });

// connection.connect(function(err) { 
// 	if (err) { 
// 		console.error('Error connecting to mysql: ' + err.stack);
// 		return;
// 	}
// 	console.log('Connected to database');
// });

// var sql_command = "show tables";
// connection.query(sql_command, function (err, res) {
// 	if (err) {
// 		console.error('Error getting database tables: ' + err.stack);
// 	}
// 	console.log("Found database tables: " + JSON.stringify(res));
// });


// TODO: Discuss if each component is handling its own queries
// module.exports = connection;

// The internal routes will be prepended with /api/v1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use('/api/v1/', router);

app.listen(port, () => console.log(`Listening on port ${port}`));
