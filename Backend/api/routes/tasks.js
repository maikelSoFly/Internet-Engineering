const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /tasks'
    })
})

router.post('/', (req, res, next) => {
    const task = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        workTime: req.body.workTime,
    }
    res.status(201).json({
        message: 'Handling POST requests to /tasks',
        createdTask: task,
    })
})

router.get('/:taskID', (req, res, next) => {
    const id = req.params.taskID
    if(id === 'special') {
        res.status(200).json({
            message: 'You discovered special task',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
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
