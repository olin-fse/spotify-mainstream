let router = require('express').Router();
let fetch = require('node-fetch');
// testing name object (will be pulling from database or state here)
const users = [
  {name: 'Katie Hite', username: 'kghite', selected: false, favoriteArtist: '3XHO7cRUPCLOr6jwp8vsx5', token: 'BQBptTVjbvkvSffLZpmuiuDHvKWNpS5_iKMn2HaSJIGicb4SAXztdii-KIFKF6E2rIN98hF9TGK0U8SPJpWHhgpEBakg4RuShjg5T7G7xij3JpwZR9mI-FqHuv-GdZ9h-UyBOAK6g4_xcGd4h1lAY5bBCfeCo2RF_KjPq61Nvy2L7gngUlExzcSB-bcMcyXjzw'},
  {name: 'Keenan Zucker', username: '1232057693', selected: false, favoriteArtist: '1WrqUPWlHN5FXCRcQgrkas', token: 'BQBptTVjbvkvSffLZpmuiuDHvKWNpS5_iKMn2HaSJIGicb4SAXztdii-KIFKF6E2rIN98hF9TGK0U8SPJpWHhgpEBakg4RuShjg5T7G7xij3JpwZR9mI-FqHuv-GdZ9h-UyBOAK6g4_xcGd4h1lAY5bBCfeCo2RF_KjPq61Nvy2L7gngUlExzcSB-bcMcyXjzw'}  
];

router.get('/healthz', (req, res) => {
  res.send(200);
});

router.post('/make-playlist', (req, res) => {
  getArtistsPromises(req.body.users)
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

  // TODO --> query the database, send back the results

  res.json(users);

})

// router.get()

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
  .catch((err) => {
    console.error(err);
    reject(err);
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

module.exports = router;