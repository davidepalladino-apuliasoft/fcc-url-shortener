require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');

const urls = {}
let counter = 0;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/', bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', function(req, res) {
  const url = new String(req.body.url);
 
  if (url.match('^http[s]?:\/\/[a-z0-9.\-=?\/]+')) {
    urls[counter] = url;

    res.json({ 
      original_url: req.body.url,
      short_url: counter
    });
  } else {
    console.log('error')
  }
});

app.get('/api/shorturl/:short_url', function(req, res) {
  const shortUrl = req.params.short_url
  res.redirect(urls[shortUrl])
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
