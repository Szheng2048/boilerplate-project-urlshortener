require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require("morgan");
const bodyParser = require('body-parser');
const app = express();
const urls = []

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger("dev"))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl/:url?",(req,res)=>{
  let validEmail = true
  let original
  let short
  if(req.body.original_url !== undefined){
    original = req.body.original_url
  }
  if(req.body.short_url !== undefined){
    short = req.body.short_url
  }
	const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  // const urlPattern = new RegExp('(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?');
  if(!req.params.url){
    validEmail = !!urlPattern.test(original)
    if(!validEmail){
      res.json({error:"invalid url"})
    } else {
      urls.push({original_url:original,short_url:short})
      res.json({original_url:original,short_url:short})
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
