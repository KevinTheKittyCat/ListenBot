const fetch = require('node-fetch');
const express = require('express');
// const bodyParser = require('body-parser')
// var cors = require('cors')

const { clientID, clientSecret, port, frontpageURL } = require('./config.json');
const app = express();

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));