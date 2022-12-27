import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'

const app = express()

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
    .then(_ => {
      arr.push(req.body.url)
      res.json({
        original_url: req.body.url,
        short_url: arr.length
      })
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
