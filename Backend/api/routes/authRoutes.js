const app = require('express'),
    router = app.Router(),
    authController = require('../controllers/authController')


module.exports = (authenticate) => {

    router.post('/login', authController.logIn)

    router.post('/signup', authController.signUp)

    router.get("/user", authenticate(), authController.user);


    return router
}