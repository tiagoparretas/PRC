var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/filmes', function(req, res, next) {
  Filmes.getListaFilmes()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});

router.get('/:id', function(req, res, next) {
  Filmes.getFilme()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});


router.get('/atores', function(req, res, next) {
  Filmes.getListaAutores()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});


router.get('/:id', function(req, res, next) {
  Filmes.getAutor()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});

router.get('/personagens', function(req, res, next) {
  Filmes.getListaPersonagens()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});


router.get('/:id', function(req, res, next) {
  Filmes.getPersonagem()
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
  
});

module.exports = router;
