let loginRouter = require('express').Router();
const fetch = require('node-fetch');
const request = require('request');
const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const keys = require('../config/api_keys.secret.json');

let db = require('../app');
const mysql = require('mysql');

// configure the express server
const CLIENT_ID = process.env.client_id || keys.client_id
const CLIENT_SECRET = process.env.client_secret || keys.client_secret;
const REDIRECT_URI = process.env.redirect_uri || 'http://localhost:5000/login/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scope = 'user-read-private user-read-email user-read-playback-state';

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
const stateKey = 'spotify_auth_state';

loginRouter.get('/', function(req, res) {

    console.log("LOGIN ROUTE");
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
      }));
  });
  
  loginRouter.get('/callback', function(req, res) {

    console.log("CALLBACK ROUTE");
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
  
          const access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          const topArtistOptions = {
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          }
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);

            let display_name = body.display_name;
            let username = body.id;
            let user_insert_2 = `INSERT INTO users (display_name, username, access_token, refresh_token) VALUES ("${display_name}", "${username}", "${access_token}", "${refresh_token}") ON DUPLICATE KEY UPDATE username = "${username}"`;
            // let user_insert = `INSERT INTO users (display_name, username, access_token, refresh_token) VALUES ("${display_name}", "${username}", "${access_token}", "${refresh_token}")`
            let query = db.query(user_insert_2, function (error, results, fields) {
              if (error) throw error;
              // Success!
            });
           // console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
            

            // request.get(topArtistOptions, function(err, res, body2) {
            //   console.log(body2);
            // });
          });
  
          // we can also pass the token to the browser to make requests from there
          // TODO --> set tokens into database/state
          // res.redirect('http://localhost:3000');
          res.redirect('http://localhost:3000/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
      });
    }
  });
  
  loginRouter.get('/refresh_token', function(req, res) {
  
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });
  

module.exports = loginRouter;