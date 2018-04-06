const mongoose = require('mongoose'),
    User = require('../models/user'),
    Task = require('../models/task'),
    Group = require('../models/group')


exports.removeAllUsers = (req, res, next) => {
    User.remove({})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'ALL_USERS_DELETED_SUCCESSFULY'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.removeAllTasks = (req, res, next) => {
    Task.remove({})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'ALL_TASKS_DELETED_SUCCESSFULY'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

exports.removeAllGroups = (req, res, next) => {
    Group.remove({})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'ALL_GROUPS_DELETED_SUCCESSFULY'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

// TODO: Add link to user profile
exports.getAllTasks = (req, res, next) => {
    Task.find()
        .select('_id title')
        .exec()
        .then(tasks => {
            res.status(200).json({
                count: tasks.length,
                users: tasks.map(task => {
                    return {
                        _id: task._id,
                        username: task.title,
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.getAllGroups = (req, res, next) => {
    Group.find()
        .select('_id name')
        .exec()
        .then(groups => {
            res.status(200).json({
                count: groups.length,
                users: groups.map(group => {
                    return {
                        _id: group._id,
                        username: group.name,
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.getAllUsers = (req, res, next) => {
    User.find()
        .select('_id username email')
        .exec()
        .then(users => {
            res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return {
                        _id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}