var express = require('express')

var routes = function (User, jwt) {
    var authRouter = express.Router()

    var authController = require('../controller/authController')(User, jwt)

    authRouter.use('/', authController.validateUserPassword)

    authRouter.use('/', authController.validateUserInDatabase)

    return authRouter
}

module.exports = routes