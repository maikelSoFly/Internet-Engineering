const app = require('express'),
    router = app.Router(),
    TaskController = require('../controllers/taskController')


module.exports = () => {

    router.get('/', TaskController.getAll)

    router.post('/', TaskController.add)

    router.get('/:taskID', TaskController.getByID)

    router.patch('/:taskID', TaskController.update)

    router.delete('/:taskID', TaskController.delete)


    return router
}
