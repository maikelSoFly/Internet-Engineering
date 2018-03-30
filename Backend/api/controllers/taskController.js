const mongoose = require('mongoose'),
    Task = require('../models/task')

module.exports = {

    getAll: (req, res, next) => {
        Task.find()
            .select('_id title description workTime deadline tier timestamp')
            .exec()
            .then(tasks => {
                const response = {
                    count: tasks.length,
                    tasks: tasks.map(task => {
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
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: error
                })
            })
    },


    add: (req, res, next) => {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            workTime: req.body.workTime,
        })

        task.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: "TASK_SAVED",
                    createdTask: {
                        _id: result._id,
                        title: result.title,
                        description: result.description,
                        workTime: result.workTime,
                        deadline: result.deadline,
                        tier: result.tier,
                        timestamp: result.timestamp,
                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/tasks/' + result._id
                        }
                    },
                })
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    error: error,
                })
            })
    },


    getByID: (req, res, next) => {
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
    },


    update: (req, res, next) => {
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
    },


    delete: (req, res, next) => {
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
    },
}