const app = require('express'),
    router = app.Router(),
    GroupController = require('../controllers/groupController')


module.exports = () => {

    router.get('/', GroupController.getAll)

    router.get('/:groupID', GroupController.getByID)

    router.post('/', GroupController.add)

    router.delete('/:groupID', GroupController.delete)

    router.patch(':groupID', GroupController.update)


    return router
}
