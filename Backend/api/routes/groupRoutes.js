const app = require('express')
const router = app.Router()
const groupController = require('../controllers/groupController')


module.exports = () => {

    router.get('/', groupController.getAll)


    router.get('/:groupID', groupController.getByID)


    router.post('/', groupController.add)


    router.delete('/:groupID', groupController.delete)


    router.patch(':groupID', groupController.update)


    return router
}
