const app = require('express'),
    router = app.Router(),
    GroupController = require('../controllers/group-controller'),
    permCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.get('/', authenticate(), GroupController.getAllGroups)

    router.post('/', authenticate(), GroupController.addGroup)

    router.get('/:groupID', authenticate(), permCheck.group(), GroupController.getGroupByID)

    router.delete('/:groupID', authenticate(), permCheck.group(), GroupController.deleteGroupByID)

    router.patch(':groupID', authenticate(), permCheck.group(), GroupController.updateGroupByID)


    return router
}
