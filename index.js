const { query, request, response } = require('express')
const { Route } = require('express')
const express = require('express')
const res = require('express/lib/response')
const server = express()

//query Params = ?name=Node JS
//Route Params = /curso/2

const cursos = ['JavaScript', 'Node JS', 'PHP', 'React']
server.use(express.json())

function checkCurso(require, response, next){
    if(!require.body.name){
        response.status(400).json({error: `Insira um nome!`})

    }
    return next()
}

function checkIndexCurso(require, response, next){
    const curso = cursos [require.params.index]
    if(!curso){
        return response.status(400).json({error: `curso não existe`})
    }
    return next()
}

server.get('/cursos',(require, response)=>{
    return response.json(cursos)
})

server.get('/cursos/:index', checkIndexCurso, (require, response)=>{
    const {index} = require.params
    return response.json(cursos[index])
})

server.post('/cursos', checkCurso, (require, response)=>{
    const {name} = require.body
    cursos.push(name)
    return response.json(cursos)
})

server.put('/cursos/:index',  (require, response)=>{
const {index} = require.params
const {name} = require.body
cursos[index] = name
return response.json(cursos)

})

server.delete('/cursos/:index', checkIndexCurso, (require, response)=>{
    const {index} = require.params
    cursos.splice(index, 1)
    return response.json({message: 'curso deletado com sucesso'})
  
})

server.listen(5000)