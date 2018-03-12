const mysql = require('mysql');

let db;

function makeConnection() {
  let config;

  switch (process.env.NODE_ENV) {
    case 'TEST':
      config = {
        port: '3306',
        host: 'localhost',
        database: 'spotifymainstream_test',
        user: 'test',
        password: 'password' 
      }
      break;

    case 'PROD':
      config = {
        port: '3306',
        host: '35.224.179.120',
        database: 'spotifymainstream',
        user: 'admin',
        password: 'fse_2018' 
      }
      break;
    
    default:
      config = {
        port: '3306',
        host: 'localhost',
        database: 'spotifymainstream',
        user: 'spotify',
        password: 'fse_2018' 
      }
  }

  db = mysql.createConnection(config);
  
  db.connect(function(err) {
    if (err) return console.error(err);
    console.log('Connected to database');
  });
}

function get() {
  return db;
}

module.exports = {
  makeConnection: makeConnection,
  get: get
};
