
const express = require('express');
const app = express();

// MODEL
var peliculas = ["Superlópez", "E.T.", "Interstellar"];

// VIEWS
let indexView = (pelis) => `
<!doctype html><html>
  <head><meta charset="utf-8"></head>
  <body>
    <h1> Mis películas </h1>
    <ul> 
      ${pelis
        .map((elem) => `<li> ${elem} </li>`)
        .join('')
      }
    </ul>
  </body>
</html>`;

// CONTROLLERS
let indexContr = (req, res) => res.send( indexView(peliculas) );

// ROUTER
app.get('/peliculas',     indexContr);

app.use('*', (req, res) => req.status(405).send("Not Supported."));

app.listen(8080);

