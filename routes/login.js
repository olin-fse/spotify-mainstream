let loginRouter = require('express').Router();
const fetch = require('node-fetch');
const request = require('request');
const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');

let CLIENT_ID, CLIENT_SECRET;

if (!process.env.client_id) {
  const keys = require('../config/api_keys.secret.json');
  CLIENT_ID = keys.client_id
  CLIENT_SECRET = keys.client_secret
} else {
  CLIENT_ID = process.env.client_id
  CLIENT_SECRET = process.env.client_secret
}

let db = require('../config/getDb');
const mysql = require('mysql');

const REDIRECT_URI = process.env.redirect_uri || 'http://localhost:5000/login/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scope = 'user-read-private user-read-email user-top-read';

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);
const stateKey = 'spotify_auth_state';

loginRouter.get('/', function(req, res) {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // requests authorization
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

  //requests refresh and access tokens after checking the state parameter

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
        // TODO --> Get Artist ID too
        request.get(options, function(error, response, body) {

          let display_name = body.display_name;
          let username = body.id;

          getFavArtist(access_token)
            .then((response) => response.json())
            .then((responseJson) => {
              let fav_artist_id = responseJson.items[0].id;
              let fav_artist_name = responseJson.items[0].name;
              
              // let user_insert = `INSERT INTO users (display_name, username, access_token, refresh_token, fav_artist_id, fav_artist_name) VALUES ("${display_name}", "${username}", "${access_token}", "${refresh_token}", "${fav_artist_id}", "${fav_artist_name}") ON DUPLICATE KEY UPDATE display_name = "${display_name}", access_token = "${access_token}", refresh_token = "${refresh_token}", fav_artist_id = "${fav_artist_id}", fav_artist_name = "${fav_artist_name}"`;

              let user_insert = `INSERT INTO users (display_name, username, access_token, refresh_token, fav_artist_id, fav_artist_name) VALUES (?, ?, ?, ?, ?, ?)  ON DUPLICATE KEY UPDATE display_name = ?, access_token = ?, refresh_token = ?, fav_artist_id = ?, fav_artist_name = ?`;

              let query = db.get().query(user_insert, [display_name, username, access_token, refresh_token, fav_artist_id, fav_artist_name, display_name, access_token, refresh_token, fav_artist_id, fav_artist_name], function (error, results, fields) {
                if (error) throw error;
                // Success!
              });

            })
            .catch((err) => {
              console.error(err);
            });
        });

        // we can also pass the token to the browser to make requests from there
        // TODO --> take URL params out
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

getFavArtist = (token) => {
  let url = 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1';
  let options = {
    method: 'GET',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

  return fetch(url, options);
}
  

module.exports = loginRouter;