var express = require('express');
var router = express.Router();
var axios = require('axios');

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/tiago/ontologies/2020/1/arquivo#>
  `;

var repo = 'http://localhost:7200/repositories/PRC?query='

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `
  select ?s ?tit (count(?p) as ?count) where {
      ?s rdf:type :Obra .
      ?s :titulo ?tit .
      ?s :partitura ?p . 
  } group by ?s ?tit
  `;
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(repositorio + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(obra => {
        return {
          id: obra.s.value.split('#')[1], 
          tit: obra.tit.value, 
          count: obra.count.value} })
      res.render('index', { obras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});


router.get('/:id', function(req, res, next) {
  var id = req.params.id
  var partituras = `
  select ?s ?voz ?clave ?path where { 
    ?s rdf:type :Partitura.
    :${id} :partitura ?s .
    ?s :path ?path .
    ?s :voz ?voz .    
    ?s :clave ?clave .
}`;
  
  var encoded = encodeURIComponent(prefixes + partituras)
  axios.get(repositorio + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(partitura => {
        return {
          id: partitura.s.value.split('#')[1], 
          voz: partitura.voz.value, 
          clave: partitura.clave.value, 
          path: partitura.path.value} 
      })
      res.render('partitura', { partituras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});

module.exports = router;
