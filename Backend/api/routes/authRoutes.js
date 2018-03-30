const app = require('express'),
    router = app.Router(),
    AuthController = require('../controllers/authController')


module.exports = (authenticate) => {

    router.post('/login', AuthController.logIn)

    router.post('/signup', AuthController.signUp)

    router.get("/user", authenticate(), AuthController.user);

    router.get("/users", AuthController.getUsers);

    router.delete("/users/:userID", AuthController.removeUser);


    return router
}