const app = require('express')
const router = app.Router()
const authController = require('../controllers/authController')


module.exports = (authenticate) => {

    router.post('/login', authController.login)


    router.post('/register', authController.register)


    router.get("/user", authenticate(), authController.user);


    return router
}