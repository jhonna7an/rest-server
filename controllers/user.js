const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const userGet = async (req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {status: true};

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ])
    
    res.json({
        total,
        users
    });
};

const userPost = async(req, res = response) => {

    const {name, mail, password, role} = req.body;
    const user = new User({name, mail, password, role});

    // Encriptar la password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Persistencia
    await user.save();

    res.json({
        message: 'Post',
        user
    });
}

const userPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, mail, ...resto } = req.body;

    //TODO validar contra BD
    if (password) {
        // Encriptar la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userDb = await User.findByIdAndUpdate(id, resto);

    res.json({
        message: 'Put',
        userDb
    })
}

const userDelete = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});


    res.json({
        user
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}