const { response } = require('express');

const userGet = (req, res = response) => {
    const query = req.query;
    res.json({
        message: 'get routes - controller',
        query
    })
}
const userPost = (req, res = response) => {
    const body = req.body;

    res.json({
        message: 'post routes - controller',
        body
    })
}
const userPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        message: 'put routes - controller',
        id
    })
}
const userDelete = (req, res = response) => {
    res.json({
        message: 'delete routes-controller',
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}