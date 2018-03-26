const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../models/task')

router.get('/', (req, res, next) => {
    Task.find()
        .select('_id title description workTime deadline tier timestamp')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        workTime: doc.workTime,
                        deadline: doc.deadline,
                        tier: doc.tier,
                        timestamp: doc.timestamp,
                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/tasks/' + doc._id,
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
})

router.post('/', (req, res, next) => {
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
})

router.get('/:taskID', (req, res, next) => {
    const id = req.params.taskID
    Task.findById(id)
        .select('_id title description workTime deadline tier timestamp')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({
                    _id: doc._id,
                    title: doc.title,
                    description: doc.description,
                    workTime: doc.workTime,
                    deadline: doc.deadline,
                    tier: doc.tier,
                    timestamp: doc.timestamp,
                    request: {
                        type: 'GET',
                        description: 'GET_ALL_TASKS',
                        url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                            '/tasks'
                    },
                })
            } else {
                res.status(404).json({
                    message: 'No valid entry found in the database'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        })
})

router.patch('/:taskID', (req, res, next) => {
    const id = req.params.taskID
    const updateOperations = {}
    for (const ops of req.body) {
        updateOperations[ops.propName] = ops.value
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
})

router.delete('/:taskID', (req, res, next) => {
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
})

module.exports = router
