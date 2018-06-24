var express = require('express')

var routes = function (User) {
    var loginRouter = express.Router()

    var loginController = require('../controller/loginController')(User)

    loginRouter.route('/')
        .post(loginController.post)

    return loginRouter
}

module.exports = routes