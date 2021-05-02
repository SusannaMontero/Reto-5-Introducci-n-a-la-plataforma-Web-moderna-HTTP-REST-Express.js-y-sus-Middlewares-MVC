
const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({extended: true}));  // parse POST params in BODY
app.use(methodOverride('_method', {methods: ["POST", "GET"]})); 
app.use(express.static('public'));

// MODEL
let movies = ["Superlópez", "E.T.", "Interstellar"];

// VIEWs
const style = `<style>.search{float:right;} a{padding:0 3px 0 3px }</style>`

function addLayout (view) {
  return `<!doctype html><html><head><meta charset="utf-8">${style}</head>
    <body>
      <form method="GET" action="/movies" class="search">
        <input type="text" name="search" size="5">
        <input type="submit" class="button" value="Search">
      </form>
      <h1>Películas</h1>
      ${view}
    </body></html>`
};

function indexView (movies) {
  let view = `<ul>
      ${movies
        .map((e,i)=>`<li>${e}<a href="/movies/${i}?_method=DELETE">delete</a></li>`)
        .join("\n")}
    </ul>
    <a href="/movies/new">new</a> <a href="/movies">back</a>`;
  return addLayout(view);
}

function newView () {
  let view = `<form method="POST" action="/movies">
    <label for="title">Nueva película</label>
    <input type="text" name="title">
    <input type="submit" class="button" value="create">
  </form>
  <a href="/movies">back</a>`;
  return addLayout(view);
}

// CONTROLLERS
const indexContr = async (req, res, next) => {
  let s = req.query.search;
  let p = (s) ? movies.filter((e)=>e.includes(s)) : movies;
  res.send(indexView(p))
};

const newContr = async (req, res, next) => {
  res.send(newView());
 };

const createContr = async (req, res, next) => {
  let title = req.body.title;
  movies.push(title);
  res.redirect('/movies');
};

const destroyContr = async (req, res, next) => {
  let id = req.param.id;
  movies.splice(id, 1);
  res.redirect('/movies');
};

// ROUTER 
app.get(['/', '/movies'],  indexContr);
app.get(['/movies/new'],   newContr);
app.post('/movies',        createContr);
app.delete('/movies/:id',  destroyContr);

app.all('*', (req, res) =>
    res.status(404).send("Error: not found or supported.")
);

app.use((error, req, res, next) => {
    console.log("Error:", error.message || error);
    res.redirect("/");
});

app.listen(8080);


