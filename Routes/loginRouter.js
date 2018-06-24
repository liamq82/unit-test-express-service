var express = require('express')

var routes = function (User, jwt) {
    var loginRouter = express.Router()

    var loginController = require('../controller/loginController')(User, jwt)

    loginRouter.route('/')
        .post(loginController.post)

    return loginRouter
}

module.exports = routes