const mongoose = require('mongoose'),
    Group = require('../models/group'),
    Task = require('../models/task')

module.exports = {

    getAll: (req, res, next) => {
        Group.find()
            .select('_id name')
            .populate('tasks', '_id title')
            .exec()
            .then(groups => {
                res.status(200).json({
                    count: groups.length,
                    groups: groups.map(group => {
                        return {
                            _id: group._id,
                            name: group.name,
                            tasks: group.tasks,
                            request: {
                                type: 'GET',
                                url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                    '/groups/' + group._id
                            }
                        }
                    }),
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: err })
            })
    },


    getByID: (req, res, next) => {
        const id = req.params.groupID
        Group.findById(id)
            .select('_id name')
            .populate('tasks', '_id title description workTime deadline timestamp')
            .exec()
            .then(group => {
                console.log(group)
                if (group) {
                    res.status(200).json({
                        _id: group._id,
                        name: group.name,
                        tasks: group.tasks.map(task => {
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
                                        '/tasks/' + task._id
                                },
                            }
                        }),
                        request: {
                            type: 'GET',
                            description: 'GET_ALL_GROUPS',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/groups'
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


    add: (req, res, next) => {
        const tasksIDs = req.body.tasksIDs
        const findTaskJobs = []

        for (const taskID of tasksIDs) {
            findTaskJobs[findTaskJobs.length] = Task.findById(taskID)
        }

        Promise.all(findTaskJobs)
            .then(tasks => {
                if (!tasks.includes(null)) {
                    const group = new Group({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        tasks: tasksIDs,
                    })

                    return group.save()
                } else {
                    const error = new Error()
                    error.message = 'TASK_NOT_FOUND'
                    error.status = 404
                    throw error
                }
            }).then(result => {
                console.log(result)
                res.status(201).json({
                    message: "GROUP_SAVED",
                    createdGroup: {
                        _id: result._id,
                        name: result.name,
                        tasks: result.tasks,
                        request: {
                            type: 'GET',
                            url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                                '/groups/' + result._id
                        }
                    },
                })
            }).catch(err => {
                console.log(err)
                res.status(404).json({
                    message: 'INVALID_TASK_ID',
                    error: err
                })
            })
    },


    delete: (req, res, next) => {
        const id = req.params.groupID
        Group.remove({ _id: id })
            .exec()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: 'GROUP_DELETED',
                    request: {
                        type: 'POST',
                        url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                            '/groups',
                        body: {
                            name: 'String',
                            tasksIDs: '[String]',
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


    update: (req, res, next) => {
        const id = req.params.groupID
        const updateOperations = {}
        for (const op of req.body) {
            updateOperations[op.propName] = op.value
        }
        Group.update({ _id: id }, {
            $set: updateOperations
        })
            .exec()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    message: 'GROUP_UPDATED',
                    request: {
                        type: 'GET',
                        url: process.env.SERVER_ADDRESS + ':' + process.env.PORT +
                            '/groups/' + id
                    }
                })
            })
            .catch(err => {
                console.log(result)
                res.status(500).json({
                    error: error
                })
            })
    },
}