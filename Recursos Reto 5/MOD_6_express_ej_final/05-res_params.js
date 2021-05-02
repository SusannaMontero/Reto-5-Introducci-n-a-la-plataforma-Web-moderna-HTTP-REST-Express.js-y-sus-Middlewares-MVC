
const express = require('express');
let app = express();

app.get('/mime/preconfigured', function (req, res){
  res.send('<html><body>\n<h1>Mi Ruta</h1>\n</body></html>\n');
});

app.get('/mime/text/plain', function (req, res){
  res.type('text/plain');
  res.status(200);
  res.send('<html><body>\n<h1>Mi Ruta</h1>\n</body></html>\n');
});

app.get('/mime/text/html', function (req, res){
  res.type('text/html');
  res.status(200);
  res.send('<html><body>\n<h1>Mi Ruta</h1>\n</body></html>\n');
});

app.listen(8080);

