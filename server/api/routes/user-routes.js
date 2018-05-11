const app = require('express'),
    router = app.Router(),
    UserController = require('../controllers/user-controller'),
    permissionCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.get('/', authenticate(), UserController.user);


    router.get('/tasks', authenticate(), UserController.getUserTasks)


    return router
}