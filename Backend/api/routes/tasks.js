const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../models/task')

router.get('/', (req, res, next) => {
    Task.find()
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
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
                message: "Task successfully sent to the database",
                createdTask: result,
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error,
            })
        })

    res.status(201).json({
        message: 'Handling POST requests to /tasks',
        createdTask: task,
    })
})

router.get('/:taskID', (req, res, next) => {
    const id = req.params.taskID
    Task.findById(id)
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({ message: 'No valid entry found in the database' })
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
            res.result(200).json(result)
        })
        .catch(error => {
            console.log(result)
            res.result(500).json({
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
            res.status(200).json(result)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})

module.exports = router
