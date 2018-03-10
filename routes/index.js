let router = require('express').Router();
let fetch = require('node-fetch');

let db = require('../app');
const mysql = require('mysql');

router.get('/healthz', (req, res) => {
  res.send(200);
});

router.post('/make-playlist', (req, res) => {
  let token = req.body.userToken;
  getArtistsPromises(req.body.users, token)
    .then(results => {
      let allTracks = results.reduce(
        function(a, b) {
          return a.concat(b);
        },[]);
      res.json(allTracks);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/get-users', (req, res) => {
  console.log('fetching users');
  // TODO --> query the database, send back the results
  const user_query = "SELECT * FROM users";
  let query = db.query(user_query, function (error, results, fields) {
    if (error) console.error(error);
    else {
      res.json(results);
    }
  })
})


// ______________________________________________________________
// helper functions
getTopTracks = (artistId, token) => {
  let url = 'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US';
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

getUserTracks = (user, token, resolve, reject) => {
  let tracksPerUser = 3;
  let artist = user.fav_artist_name;
  getTopTracks(user.fav_artist_id, token)
    .then((response) => response.json())
    .then((responseJson) => {
      let tracks = [];
      for (let i = 0; i < tracksPerUser; i++) {
        const { name, id } = responseJson.tracks[i];
        tracks.push({ name, id, artist});
      }
      resolve(tracks);
    })
    .catch((err) => {
      console.error(err);
      reject(err);
    });
}

getArtistsPromises = (users, token) => {
  let promises = [];
  users.forEach(user => {
    promises.push(new Promise( (resolve, reject) => {
      getUserTracks(user, token, resolve, reject);
    }))
  });

  return Promise.all(promises);
}

module.exports = router;