var Generos = module.exports
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



Generos.getLista = async function(){
    var query = `select distinct ?id ?genero where{
        ?g a c:Género .
        ?g c:nome ?genero .
        bind(strafter(str(?g), 'cinema#') as ?id) .
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

async function getAtomica(id){
    var query = `select ?nome where{
        c:${id} a c:Género .
        c:${id} c:nome ?nome .
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

Generos.getFilmes = async function(id){
    var query = `select distinct ?id ?nome where{
        c:${id} a c:Género .
        ?f a c:Filme .
        ?f c:temGénero c:${id} .
        ?f c:título ?nome .
        bind(strafter(str(?f), 'cinema#') as ?id) .
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

Generos.getGenero = async function(id){
    try{
        var atomica = await getAtomica(id)
        var filmes = await Generos.getFilmes(id)
        
        var genero = {
            id: id,
            info : atomica[0],
            filmes: filmes
        }
        return genero
    }
    catch(e){
        throw(e)
    }
}