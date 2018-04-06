const app = require('express'),
    router = app.Router(),
    TaskController = require('../controllers/task-controller'),
    permCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.get('/', authenticate(), TaskController.getAllTasks)

    router.post('/', authenticate(), TaskController.addTask)

    router.get('/:taskID', authenticate(), permCheck.task(), TaskController.getTaskByID)

    router.patch('/:taskID', authenticate(), permCheck.task(), TaskController.updateTaskByID)

    router.delete('/:taskID', authenticate(), permCheck.task(), TaskController.removeTaskByID)


    return router
}
