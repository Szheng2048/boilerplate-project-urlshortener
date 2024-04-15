require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const urls = []

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

app.post("/api/shorturl/:url?",(req,res)=>{
  const validEmail = true
  const {original_url,short_url} = req.body
	const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  if(!req.params.url){
    validEmail = !!urlPattern.test(original_url)
    if(!validEmail){
      res.json({error:"invalid url"})
    } else {
      urls.push({original_url,short_url})
      res.json({original_url,short_url})
    }
  } else {
    const filteredArr = urls.filter(url=> url.short_url === req.params.url)
    const originalUrl = filteredArr.original_url
    res.redirect(originalUrl)
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
