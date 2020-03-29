var Filmes = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.semanticweb.org/tiago/ontologies/2020/1/cinema2020#>
  `;


var getLink = "http://localhost:7200/repositories/cinema2020" + "?query="


Filmes.getListaFilmes = function(req){
    var query = `select ?id ?nome ?duracao ?data ?pais ?realizador where {
        ?id rdf:type cinema:Filme .
        ?id cinema:nome ?nome .
        ?id cinema:duração ?duracao .
        ?id cinema:dataLançamento ?data .
        optional {
            ?id cinema:temPaísOrigem ?p .
            bind(replace(strafter(str(?p), "cinema#"), "_", " ") as ?pais) .
        }
    }`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}


Filmes.getFilme = async(id) => {
    var query = `select ?nome ?duracao ?data ?pais ?realizador where {
        cinema:${id} rdf:type cinema:Filme .
        cinema:${id} cinema:nome ?nome .
        cinema:${id} cinema:duração ?duracao .
        cinema:${id} cinema:dataLançamento ?data .
        optional {
            cinema:${id} cinema:temPaísOrigem ?p .
            bind(replace(strafter(str(?p), "cinema#"), "_", " ") as ?pais) .
        }
        optional {
            cinema:${id} cinema:temRealizador ?r .
            ?r cinema:nome ?realizador .
        }
    }`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}

Filmes.getListaAutores = function(req){
    var query = `select distinct ?id ?nome where {
        ?id rdf:type cinema:Ator .
        ?id cinema:nome ?nome . 
    }`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}

Filmes.getAutor = async(id) => {
    var query = `select ?nome where {
        cinema:${id} rdf:type cinema:Ator .
        cinema:${id} cinema:nome ?nome . 
    }`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}


Filmes.getListaPersonagens = function(req){
    const query = `select distinct ?p ?personagem where {
        ?p rdf:type cinema:Personagem .
        ?p cinema:nome ?personagem . 
    }`
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}


Filmes.getPersonagem = async(id) => {
    var query = `select ?nome where {
        cinema:${id} rdf:type cinema:Personagem .
        cinema:${id} cinema:nome ?nome . 
    }`;
    var encoded = encodeURIComponent(prefixes + query)
    axios.get(getLink + encoded)
        .then(dados => {return dados.data})
        .catch(erro => {return erro})
    
}