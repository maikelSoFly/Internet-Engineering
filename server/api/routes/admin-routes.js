const app = require('express'),
    router = app.Router(),
    AdminController = require('../controllers/admin-controller'),
    permCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.get('/tasks', authenticate(), permCheck.role(['ADMIN']), AdminController.getAllTasks)

    router.get('/groups', authenticate(), permCheck.role(['ADMIN']), AdminController.getAllGroups)

    router.get("/users", authenticate(), permCheck.role(['ADMIN']), AdminController.getAllUsers)

    router.delete('/removeAllUsers', authenticate(), permCheck.role(['ADMIN']), AdminController.removeAllUsers)

    router.delete('/removeAllTasks', authenticate(), permCheck.role(['ADMIN']), AdminController.removeAllTasks)

    router.delete('/removeAllGroups', authenticate(), permCheck.role(['ADMIN']), AdminController.removeAllGroups)

    return router
}