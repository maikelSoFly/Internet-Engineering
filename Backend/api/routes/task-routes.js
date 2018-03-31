const app = require('express'),
    router = app.Router(),
    TaskController = require('../controllers/task-controller')


module.exports = (authenticate) => {

    router.get('/', TaskController.getAllTasks)

    router.post('/', TaskController.addTask)

    router.get('/:taskID', TaskController.getTaskByID)

    router.patch('/:taskID', TaskController.updateTaskByID)

    router.delete('/:taskID', TaskController.deleteTaskByID)


    return router
}
