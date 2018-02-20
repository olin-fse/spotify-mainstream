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

router.post('/get-playlist', (req, res) => {

  // TODO --> Make the API for wait for each one to run before returning

  req.body.users.forEach(user => {
    let tracksPerUser = 3;
    
    getTopTracks(user.favoriteArtist, user.token)
      .then((response) => response.json())
      .then((responseJson) => {
        
        let tracks = [];
  
        for (let i = 0; i < tracksPerUser; i++) {
          const { name, id } = responseJson.tracks[i];
          tracks.push({ name, id });
        }
  
        res.json(tracks);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  
});

module.exports = router;