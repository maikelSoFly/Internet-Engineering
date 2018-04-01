const mongoose = require('mongoose'),
    User = require('../models/user'),
    jwt = require("jwt-simple"),
    cfg = require('../../config'),
    bcrypt = require('bcrypt')


exports.login = (req, res, next) => {
    if ((req.body.username || req.body.email) && req.body.password) {
        const plainPassword = req.body.password
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
            bcrypt.compare(plainPassword, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: 'AUTH_FAILED' })
                }
                if (result) {
                    const payload = {
                        _id: user._id,
                        email: user.email
                    }
                    const token = jwt.encode(payload, cfg.jwtSecret)
                    res.json({
                        message: 'AUTH_SUCCESSFUL',
                        token: token
                    })
                } else {
                    res.status(401).json({ message: 'WRONG_PASSWORD' })
                }
            })
        })
    } else {
        res.status(500).json({ message: 'PAYLOAD_ERROR' })
    }
}


exports.signup = (req, res, next) => {
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
                permissions: req.body.permissions
            })

            user.save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: "USER_SAVED",
                        createdUser: {
                            _id: result._id,
                            username: result.username,
                            email: result.email,
                            permissions: result.permissions,
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
}


exports.getUser = (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .populate('tasks')
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
}


exports.getAllUsers = (req, res, next) => {
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
}


exports.removeUserByID = (req, res, next) => {
    const id = req.params.userID

    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'USER_DELETED',
                request: {
                    type: 'POST',
                    url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                        '/signup',
                    body: {
                        username: 'String',
                        email: 'String',
                        password: 'String',
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status.json({ error: err })
        })
}