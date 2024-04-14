require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const webObject = { original_url : 'https://freeCodeCamp.org', short_url : 1}

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl",(req,res)=>{
  const {original_url,short_url} = webObject
  res.json(original_url,short_url)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
