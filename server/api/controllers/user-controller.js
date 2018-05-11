const mongoose = require('mongoose'),
    Task = require('../models/task'),
    Group = require('../models/group'),
    User = require('../models/user')


exports.user = (req, res, next) => {
    User.findOne({ _id: req.user._id })
        .populate('tasks')
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
}


exports.getUserTasks = (req, res, next) => {
    const user = req.user
    res.status(200).json({
        tasks: user.tasks,
    })
}


