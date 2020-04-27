var Personagens = module.exports
const axios = require('axios')

function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
}

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 



Personagens.getLista = async function(){
    var query = `select distinct ?id ?nome where{
        ?a a c:Personagem .
        ?a c:nome ?nome .
        bind(strafter(str(?a), 'cinema#') as ?id) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

async function getAtomica(id){
    var query = `select ?nome where{
        c:${id} a c:Personagem .
        c:${id} c:nome ?nome .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Personagens.getAtores = async function(id){
    var query = `select ?id ?nome where{
        ?a a c:Ator .
        ?a c:representa c:${id} .
        ?a c:nome ?nome .
        bind(strafter(str(?a), 'cinema#') as ?id) .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Personagens.getFilmes = async function(id){
    var query = `select distinct ?id ?filme where{
        c:${id} a c:Personagem .
        ?f c:temPersonagem c:${id} .
        ?f c:título ?filme .
        bind(strafter(str(?f), 'cinema#') as ?id) .
    }  ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    }
}

Personagens.getPersonagem = async function(id){
    try{
        var atomica = await getAtomica(id)
        var filmes = await Personagens.getFilmes(id)
        var atores = await Personagens.getAtores(id)

        var personagem = {
            id: id,
            info : atomica[0],
            filmes: filmes,
            atores : atores
        }
        return personagem
    }
    catch(e){
        throw(e)
    }
}
