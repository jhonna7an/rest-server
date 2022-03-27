const { response } = require('express');

const userGet = (req, res) => {
    const params = req.query;
    const headers = req.headers;
    const cookies = req.cookies;
    res.json({
        message: 'Get',
        params,
        headers,
        cookies
    })
};

const userPost = (req, res) => {

    const {name, age} = req.body;
    res.json({
        message: 'Post',
        name,
        age
    });
}

const userPut = (req, res) => {

    const id = req.params.id;
    res.json({
        message: 'Put',
        id
    })
}

const userDelete = (req, res) => {
    res.json({
        message: 'Delete'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}