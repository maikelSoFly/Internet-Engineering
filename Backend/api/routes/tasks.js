const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Task = require('../models/task')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /tasks'
    })
})

router.post('/', (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        workTime: req.body.workTime,
    })

    task.save().then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
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
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

router.patch('/:taskID', (req, res, next) => {
    res.status(200).json({
        message: 'Updated task'
    })
})

router.delete('/:taskID', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted task'
    })
})

module.exports = router
