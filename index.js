require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


let arr = []
app.post('/api/shorturl', (req, res) => {
  fetch(req.body.url)
    .then(response => {
      if (response.ok) {
        arr.push(req.body.url)
        res.json({
          original_url: req.body.url,
          short_url: arr.length
        })
      } else {
      }
    })
    .catch(error => {
      res.json({ error: "Invalid URL" });

    });
})

app.get('/api/shorturl/:url', (req, res) => {
  res.redirect(arr[req.params.url - 1])
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
