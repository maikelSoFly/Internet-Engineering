const app = require('express'),
    router = app.Router(),
    AuthController = require('../controllers/auth-controller'),
    permCheck = require('../middleware/permission-check')


module.exports = authenticate => {

    router.post('/login', AuthController.login)

    router.post('/signup', AuthController.signup)

    router.get("/user", authenticate(), AuthController.getUser)

    router.get("/users", authenticate(), permCheck.role(['ADMIN']), AuthController.getAllUsers)

    router.delete("/users/:userID", authenticate(), permCheck.user(), AuthController.removeUserByID);


    return router
}