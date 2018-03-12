const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const getDb = require('./config/getDb').makeConnection();

let app = express();
const port = process.env.PORT || 5000;

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

module.exports = app;