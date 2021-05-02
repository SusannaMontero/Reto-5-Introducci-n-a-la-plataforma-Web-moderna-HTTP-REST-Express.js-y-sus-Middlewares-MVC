
const express = require('express');
let app = express();

app.use('*', function(req, res, next){
  if (req.method.toLowerCase() !== "get") {
    res.locals.status = "405";
    next(new Error("405 Method Not Allowed"));
  }
  next();
});

app.use(express.static('public'));

app.get('*', function(req, res, next){
  res.locals.status = "404";
  next(new Error("404 Not Found"));
});

app.use(function(err, req, res, next){
  res.status(res.locals.status);
  res.send(err.toString());
});

app.listen(8080);

