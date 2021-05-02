
const express = require('express');
const methodOverride = require('method-override');
const app = express();

app.use(express.urlencoded({extended: true}));  // parse POST params in BODY
app.use(methodOverride('_method', {methods: ["POST", "GET"]})); 

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
        .map((e,i)=>`<li>${e} <a href="/movies/${i}/edit">edit</a>
                              <a href="/movies/${i}?_method=DELETE">delete</a></li>`)
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

function editView (i) {
  // .... introducir código

  let view = `<form method="POST" action="/movies/${i}?_method=PUT">
    <label for="title">Editar película</label>
    <input type="text" name="title" value="${movies[i]}">
    <input type="submit" value="update">
  </form>
  <a href="/movies">back</a>`;
  return addLayout(view);
}



// CONTROLLERS

// GET /, GET /movies
const indexController = async (req, res, next) => {
  let s = req.query.search;
  let p = (s) ? movies.filter((e)=>e.includes(s)) : movies;
  res.send(indexView(p))
};

// GET /movies/new
const newController = async (req, res, next) => {
  res.send(newView());
 };

// POST /movies
const createController = async (req, res, next) => {
  let title = req.body.title;
  movies.push(title);
  res.redirect('/movies');
};

// DELETE /movies/:id
const destroyController = async (req, res, next) => {
  let id = req.param.id;
  movies.splice(id, 1);
  res.redirect('/movies');
};

//  GET /movies/:id/edit
const editController = async (req, res, next) => {
    // .... introducir código

    let id = req.params.id;
    res.send(editView(id));
  };

//  PUT /movies/:id
const updateController = async (req, res, next) => {
    // .... introducir código

    let title = req.body.title;
    let id = req.params.id;
    movies[id]= title;
    res.redirect('/movies');      
};

// ROUTER 
app.get(['/', '/movies'],  indexController);
app.get(['/movies/new'],   newController);
app.post('/movies',        createController);
app.delete('/movies/:id',  destroyController);

// ..... crear rutas e instalar los MWs para:
//   GET  /movies/:id/edit
//   PUT  /movies/:id

app.get('/movies/:id/edit',  editController);
app.put('/movies/:id',       updateController);


app.all('*', (req, res) =>
    res.status(404).send("Error: not found or supported.")
);


// Middleware to manage errors:
app.use((error, req, res, next) => {
    console.log("Error:", error.message || error);
    res.redirect("/");
});

app.listen(8080);


