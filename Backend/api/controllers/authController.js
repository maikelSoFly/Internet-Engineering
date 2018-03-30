const mongoose = require('mongoose'),
    User = require('../models/user'),
    jwt = require("jwt-simple"),
    cfg = require('../../config'),
    bcrypt = require('bcrypt')


module.exports = {

    logIn: (req, res, next) => {
        if ((req.body.username || req.body.email) && req.body.password) {
            const ptPassword = req.body.password
            const login = req.body.username || req.body.email
            const query = req.body.username ? { username: login } : { email: login }
            User.findOne(query, (err, user) => {
                if (err) {
                    console.log(error)
                    return res.status(500).json({ error: error })
                }
                if (!user) {
                    return res.status(401).json({ message: 'AUTH_FAILED' })
                }
                bcrypt.compare(ptPassword, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'AUTH_FAILED' })
                    }
                    if (result) {
                        const payload = {
                            _id: user._id
                        }
                        const token = jwt.encode(payload, cfg.jwtSecret)
                        res.json({ token: token })
                    } else {
                        res.status(401).json({ message: 'WRONG_PASSWORD' })
                    }
                })
            })
        } else {
            res.status(500).json({ message: 'PAYLOAD_ERROR' })
        }
    },


    signUp: (req, res, next) => {
        // User.findOne({ email: req.body.email })
        //     .exec()
        //     .then(user => {
        //         if (user) {
        //             return res.status(409).json({
        //                 message: 'EMAIL_ALREADY_EXIST'
        //             })
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //         res.status(500).json({ error: err })
        //     })

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err })
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
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
                        console.log(err)
                        res.status(500).json({
                            error: err,
                        })
                    })
            }
        })
    },


    user: (req, res, next) => {
        res.status(200).json(req.user)
    },


    users: (req, res, next) => {
        User.find()
            .select('_id username')
            .exec()
            .then(users => {
                res.status(200).json({
                    count: users.length,
                    users: users.map(user => {
                        return {
                            _id: user._id,
                            username: user.username,
                        }
                    })
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: err })
            })
    },


    removeUser: (req, res, next) => {
        const id = req.params.userID
        User.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'USER_DELETED'
                })
            })
            .catch(err => {
                console.log(err)
                res.status.json({ error: err })
            })
    }
}