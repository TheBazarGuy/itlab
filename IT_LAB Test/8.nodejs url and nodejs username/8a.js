var express=require('express')
var app=express()

var logger = function (req, res, next) {
  console.log("Time :"+new Date(Date.now()))
 // req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log("URL :"+ req.protocol+"://"+req.get('host')+req.originalUrl)
  next()
}


app.use(logger)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/url1', function (req, res) {
  res.send('Hello World url1!')
})

app.get('/url2', function (req, res) {
  res.send('Hello World url2!')
})


var server = app.listen(5000)