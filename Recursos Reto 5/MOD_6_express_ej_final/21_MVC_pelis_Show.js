
const express = require('express');
const app = express();

// MODEL
var peliculas = [
    {titulo: "Superlópez",   director: "Javier Ruiz Caldera", estreno: "2018"},
    {titulo: "E.T.",         director: "Steven Spielberg",    estreno: "1982"},
    {titulo: "Interstellar", director: "Christopher Nolan",   estreno: "2014"}
];

// VIEWS
let layout = (view) => `<!doctype html><html>
                          <head><meta charset="utf-8"></head>
                          <body><h1> Mis películas </h1>${view}</body></html>`;

let indexView = (p) => 
  `<ul>${p
         .map((e,i) => `<a href="/peliculas/${i}"><li> ${e.titulo}</li></a>`)
         .join('')
        }
    </ul>`;
    
let showView = (p) => `<b>${p.titulo}</b>: película estrenada en el año <b> 
                       ${p.estreno}</b> y dirigida por <b>${p.director}</b>. 
                       <p> <a href="/peliculas"><button> Volver </button></a> </p>`;

// CONTROLLERS
let indexContr = (req, res) => res.send (layout (indexView (peliculas)));
let showContr  = (req, res) => res.send (layout (showView  (peliculas[req.params.id])));
        
// ROUTER
app.get('/peliculas',     indexContr);
app.get('/peliculas/:id', showContr);

app.use('*', (req, res) => req.status(405).send("Not Supported."));

app.listen(8080);

