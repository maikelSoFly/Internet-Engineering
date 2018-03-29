const app = require('express')
const router = app.Router()
const mongoose = require('mongoose')
const jwt = require("jwt-simple");
const User = require('../models/user')
const cfg = require('../../config')


module.exports = (authenticate) => {

    router.post('/login', (req, res, next) => {
        if ((req.body.username || req.body.email) && req.body.password) {
            const password = req.body.password
            const login = req.body.username || req.body.email
            const query = req.body.username ? { username: login } : { email: login }
            User.findOne(query, (err, user) => {
                if (err || !user) {
                    res.status(401).json({ message: 'BAD_CREDENTIALS' })
                } else if (user.password !== password) {
                    res.status(401).json({ message: 'WRONG_PASSWORD' })
                } else {
                    const payload = {
                        _id: user._id
                    }
                    const token = jwt.encode(payload, cfg.jwtSecret)
                    res.json({ token: token })
                }
            })
        } else {
            res.status(500).json({ message: 'PAYLOAD_ERROR' })
        }
    })

    router.post('/register', (req, res, next) => {
        if (req.body.username && req.body.email && req.body.password) {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })

            user.save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: "USER_SAVED",
                        createdTask: {
                            _id: result._id,
                            username: result.username,
                            email: result.email,
                            password: result.password,
                            createdAt: result.createdAt,
                        },
                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/login'
                        }
                    })
                })
                .catch(err => {
                    console.log(error)
                    res.status(500).json({
                        error: error,
                    })
                })

        } else {
            res.status(500).json({ message: 'PAYLOAD_ERROR' })
        }
    })

    router.get("/user", authenticate(), function (req, res) {
        res.status(200).json(req.user)
    });

    return router
}