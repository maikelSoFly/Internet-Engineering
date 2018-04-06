const mongoose = require('mongoose'),
    Task = require('../models/task'),
    User = require('../models/user')


exports.getAllTasks = (req, res, next) => {
    const user = req.user

    User.findOne({ _id: user._id })
        .populate('tasks')
        .select('tasks')
        .exec()
        .then(result => {
            console.log(result)
            const response = {
                count: result.tasks.length,
                tasks: result.tasks.map(task => {
                    return {
                        _id: task._id,
                        title: task.title,
                        description: task.description,
                        workTime: task.workTime,
                        deadline: task.deadline,
                        tier: task.tier,
                        timestamp: task.timestamp,
                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/tasks/' + task._id,
                        }
                    }
                }),
            }
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.addTask = (req, res, next) => {
    const user = req.user
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        workTime: req.body.workTime,
    })

    task.save()
        .then(task => {
            User.findOneAndUpdate({ _id: user._id }, { $push: { tasks: task._id } })
                .exec()
                .then(result => {
                    console.log(result)
                    res.status(200).json({
                        message: 'USER_UPDATED',
                        addedTask: {
                            _id: task._id,
                            title: task.title,
                            description: task.description,
                            workTime: task.workTime,
                            deadline: task.deadline,
                            tier: task.tier,
                            timestamp: task.timestamp,
                            request: {
                                type: 'GET',
                                url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                    '/tasks/' + task._id
                            }
                        },

                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/user/tasks'
                        }
                    })
                })
                .catch(error => {
                    console.log(result)
                    res.status(500).json({
                        error: error
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.getTaskByID = (req, res, next) => {
    const id = req.params.taskID

    Task.findById(id)
        .select('_id title description workTime deadline tier timestamp')
        .exec()
        .then(task => {
            console.log(task)
            if (task) {
                res.status(200).json({
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    workTime: task.workTime,
                    deadline: task.deadline,
                    tier: task.tier,
                    timestamp: task.timestamp,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_TASKS',
                        url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                            '/tasks'
                    },
                })
            } else {
                res.status(404).json({
                    message: 'NO_VALID_ENTRY_FOUND'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}


exports.updateTaskByID = (req, res, next) => {
    const id = req.params.taskID
    const updateOperations = {}
    for (const op of req.body) {
        updateOperations[op.propName] = op.value
    }
    Task.update({ _id: id }, {
        $set: updateOperations
    })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'TASK_UPDATED',
                request: {
                    type: 'GET',
                    url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                        '/tasks/' + id
                }
            })
        })
        .catch(error => {
            console.log(result)
            res.status(500).json({
                error: error
            })
        })
}


exports.removeTaskByID = (req, res, next) => {
    const id = req.params.taskID
    Task.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'TASK_DELETED',
                request: {
                    type: 'POST',
                    url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                        '/tasks',
                    body: {
                        title: 'String',
                        description: 'String',
                        workTime: 'Number',
                    }
                }
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
}