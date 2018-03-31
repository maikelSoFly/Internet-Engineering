const app = require('express'),
    router = app.Router(),
    GroupController = require('../controllers/group-controller')


module.exports = (authenticate) => {

    router.get('/', GroupController.getAllGroups)

    router.get('/:groupID', GroupController.getGroupByID)

    router.post('/', GroupController.addGroup)

    router.delete('/:groupID', GroupController.deleteGroupByID)

    router.patch(':groupID', GroupController.updateGroupByID)


    return router
}
