
const express = require('express');
let app = express();

app.use(function(req, res, next){
  app.locals.visits = (++app.locals.visits || 1);
  next();
});

app.use(express.static('public'));

app.get('/visits/show', function (req, res){
  res.send(`Visit number: ${app.locals.visits}`);
});

app.get('/visits/reset', function (req, res){
  app.locals.visits = 0;
  res.send('Visits count reset');
});

app.get('*', function (req, res){
  res.send('Not supported');
});

app.listen(8080);

