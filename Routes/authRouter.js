var express = require('express')

var routes = function (jwt) {
    var authRouter = express.Router()

    var authController = require('../controller/authController')(jwt)

    authRouter.use('/', authController.authenticateUser)

    return authRouter
}

module.exports = routes