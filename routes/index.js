let router = require('express').Router();
let fetch = require('node-fetch');

// testing route
router.get('/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// helper function
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

getUserTracks = (user, resolve, reject) => {
  let tracksPerUser = 3;
  
  getTopTracks(user.favoriteArtist, user.token)
  .then((response) => response.json())
  .then((responseJson) => {
    
    let tracks = [];

    for (let i = 0; i < tracksPerUser; i++) {
      const { name, id } = responseJson.tracks[i];
      tracks.push({ name, id });
    }
    resolve(tracks);
  })
  .catch((error) => {
    console.error(error);
    reject(error);
  });
}

getArtistsPromises = (users) => {
  let promises = [];
  users.forEach(user => {
    promises.push(new Promise( (resolve, reject) => {
      getUserTracks(user, resolve, reject);
    }))
  });

  return Promise.all(promises);
}

router.post('/get-playlist', (req, res) => {
  // TODO --> Make the API for wait for each one to run before returning
  getArtistsPromises(req.body.users)
    .then(results => {
      let allTracks = results.reduce(
        function(a, b) {
          return a.concat(b);
        },[]);
      res.json(allTracks);
    });
});

module.exports = router;