let loginRouter = require('express').Router();
let fetch = require('node-fetch');
let request = require('request');
const Spotify = require('spotify-web-api-node');
const querystring = require('querystring');
const keys = require('../config/api_keys.secret.json');

// configure the express server
const CLIENT_ID = process.env.client_id || keys.client_id
const CLIENT_SECRET = process.env.client_secret || keys.client_secret;
const REDIRECT_URI = process.env.redirect_uri || 'http://localhost:5000/callback';
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scopes = ['user-read-private', 'user-read-email'];

// configure spotify
const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

// // LOGIN ROUTES
// /**
//  * The /login endpoint
//  * Redirect the client to the spotify authorize url, but first set that user's
//  * state in the cookie.
//  */
// loginRouter.post('/', (_, res) => {  
//   console.log("LOGIN ROUTE");
//   const state = generateRandomString(16);
//   res.cookie(STATE_KEY, state);
//   res.json({redirectUrl: spotifyApi.createAuthorizeURL(scopes, state)});
// });

// /**
//  * The /callback endpoint - hit after the user logs in to spotifyApi
//  * Verify that the state we put in the cookie matches the state in the query
//  * parameter. Then, if all is good, redirect the user to the user page. If all
//  * is not good, redirect the user to an error page
//  */
// loginRouter.get('/callback', (req, res) => {
//   console.log('CALLBACK ROUTE');
//   const { code, state } = req.params;
//   const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
//   // first do state validation
//   if (state === null || state !== storedState) {
//     res.redirect('/#/error/state mismatch');
//   // if the state is valid, get the authorization code and pass it on to the client
//   } else {
//     res.clearCookie(STATE_KEY);
//     // Retrieve an access token and a refresh token
//     spotifyApi.authorizationCodeGrant(code).then(data => {
//       const { expires_in, access_token, refresh_token } = data.body;

//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(access_token);
//       spotifyApi.setRefreshToken(refresh_token);

//       // use the access token to access the Spotify Web API
//       spotifyApi.getMe().then(({ body }) => {
//         console.log(body);
//       });

//       // we can also pass the token to the browser to make requests from there
//       // res.redirect(`/#/user/${access_token}/${refresh_token}`);
//     }).catch(err => {
//       // res.redirect('/#/error/invalid token');
//     });
//   }
// });

var stateKey = 'spotify_auth_state';
loginRouter.get('/login', function(req, res) {

    console.log("LOGIN ROUTE");
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-read-playback-state';
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
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
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
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            console.log(body);
          });
  
          // we can also pass the token to the browser to make requests from there
          // TODO --> set tokens into database/state
          res.redirect('http://localhost:3000');
          // res.redirect('http://localhost:3000/#' +
          //   querystring.stringify({
          //     access_token: access_token,
          //     refresh_token: refresh_token
            // }));
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
    var refresh_token = req.query.refresh_token;
    var authOptions = {
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
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });
  

module.exports = loginRouter;