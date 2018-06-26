var express = require('express')

var routes = function (User, jwt) {

    var userRouter = express.Router()

    var userRegistrationController = require('../controller/userRegistrationController')(User, jwt)

    userRouter.route('/')
        .post(userRegistrationController.registerNewUser)

    return userRouter
}

module.exports = routes