const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// TODO --> put database connection here


// TODO --> put the routes into the ./routes folder/files
// TODO --> also, write tests for all of these!
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/login-user', (req, res) => {
  res.send({})
})

app.listen(port, () => console.log(`Listening on port ${port}`));