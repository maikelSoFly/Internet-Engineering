const app = require('express'),
    router = app.Router(),
    AuthController = require('../controllers/auth-controller')


module.exports = (authenticate) => {

    router.post('/login', AuthController.login)

    router.post('/signup', AuthController.signup)

    router.get("/user", authenticate(), AuthController.user);

    router.get("/users", AuthController.getAllUsers);

    router.delete("/users/:userID", AuthController.removeUserByID);


    return router
}