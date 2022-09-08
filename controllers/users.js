const {response, request} = require('express')

const usersGet = (req = request, res = response) => {

    const {q, name='no name', apikey, page=3, limit} = req.query

    res.json({
        ok: true,
        msg: 'get API - controller',
        q,
        name,
        apikey,
        page,
        limit
    })
}

const userPut = (req, res = response) => {
    const {id} = req.params;
    
    res.json({
        ok: true,
        msg: 'put API Petition',
        id
    })
}

const userPost = (req, res = response) => { //Create a record
    const {name, age} = req.body
    
    res.json({
        ok: true,
        msg: 'post API Petition',
        name,
        age
    })
}

const userDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API Petition'
    })
}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API Petition'
    })
  }


module.exports = {
    usersGet, userPut, userPost, userDelete, userPatch 
}