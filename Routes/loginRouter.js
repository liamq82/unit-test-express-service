var express = require('express')

var routes = function (User, jwt, bcrypt) {
    var loginRouter = express.Router()

    var loginController = require('../controller/loginController')(User, jwt, bcrypt)

    loginRouter.route('/')
        .post(loginController.login)

    return loginRouter
}

module.exports = routes