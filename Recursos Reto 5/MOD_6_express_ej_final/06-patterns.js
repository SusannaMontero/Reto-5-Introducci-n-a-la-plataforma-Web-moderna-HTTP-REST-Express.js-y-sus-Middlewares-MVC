
const express = require('express');
let app = express();

app.get('/cars/:model', function (req, res){
  let model = req.params.model;
  res.send(`Car model: ${model}`);
});
            // RegExp '[0-9]+' is equivalent to '\d'
app.get('/users/:id([0-9]+)', function (req, res){
  let id = req.params.id;
  res.send(`User number: ${id}`);
});

app.get('/file/:name.:ext', function (req, res){
  let {name, ext} = req.params;
  res.send(`Route params: name(${name}), ext(${ext})`);
});

app.get('/file', function (req, res){
  let {name, ext} = req.query;
  res.send(`Query params: name(${name}), ext(${ext})`);
});

app.get('*', function (req, res){
  res.send('Unknown request');
});

app.listen(8080);

