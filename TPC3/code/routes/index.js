var express = require('express');
var router = express.Router();

var axios = require('axios')

var link = 'http://localhost:7200/repositories' 

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

router.get('/', function(req, res, next){
  axios.get(link)
    .then(function(dados){
      response = []
      dados.data.results.bindings.forEach(element => { 
        response.push(element.id.value)
      });
      res.render('index', {repositorios : response})
    })
    .catch(erro => res.render('error', {error : erro}))
})


router.get('/repositories/:rep', function(req, res){
  var query = req.query.query
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(link + '/' + req.params.rep +'?query=' + encoded)
      .then(dados => {
        res.jsonp(dados.data.results.bindings)
      })
      .catch(erro => {
        res.jsonp(erro)
      })
  
})


module.exports = router;