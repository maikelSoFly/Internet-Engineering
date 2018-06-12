const app = require('express'),
    router = app.Router(),
    GroupController = require('../controllers/group-controller'),
    permCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.get('/', authenticate(), GroupController.getAllGroups)

    router.post('/', authenticate(), GroupController.addGroup)

    router.get('/:groupID', authenticate(), permCheck.group(), GroupController.getGroupByID)

    router.delete('/:groupID', authenticate(), permCheck.group(), GroupController.removeGroupByID)

    router.patch(':groupID', authenticate(), permCheck.group(), GroupController.updateGroupByID)

    router.patch('/add-tasks/:groupID', authenticate(), permCheck.group(), GroupController.addTasksToGroup)

    router.patch('/remove-tasks/:groupID', authenticate(), permCheck.group(), GroupController.removeTasksFromGroup)
    //TODO: possibly better aproach with request params 

    return router
}
