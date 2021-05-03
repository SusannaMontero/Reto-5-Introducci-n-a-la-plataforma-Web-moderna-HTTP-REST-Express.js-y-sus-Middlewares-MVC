var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// Añadido
// Definición de rutas de /quizes
router.get('/quizes/:quizID(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizID(\\d+)', quizController.update);


module.exports = router;