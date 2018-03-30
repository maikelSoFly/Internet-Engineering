const app = require('express'),
    router = app.Router(),
    taskController = require('../controllers/taskController')


module.exports = () => {

    router.get('/', taskController.getAll)

    router.post('/', taskController.add)

    router.get('/:taskID', taskController.getByID)

    router.patch('/:taskID', taskController.update)

    router.delete('/:taskID', taskController.delete)


    return router
}
