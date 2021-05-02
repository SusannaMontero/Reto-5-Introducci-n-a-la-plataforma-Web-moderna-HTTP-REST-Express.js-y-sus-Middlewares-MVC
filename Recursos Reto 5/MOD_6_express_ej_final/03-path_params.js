
const express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send(`My first server app`);
});

app.get('/bloqueo', (req, res) => {
  console.log(`\n -> bloqueo`);
});

app.get('/send/params*', (req, res) => {
  res.send(`Params: ${req.method}, ${req.path}`);
});

app.use('*', (req, res) => {
  res.send(`Any other path`);
});

app.listen(8080);
console.log(`server started: 8080`)

