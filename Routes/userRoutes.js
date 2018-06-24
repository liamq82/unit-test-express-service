var express = require('express')

var routes = function (User) {

    var userRouter = express.Router()

    var userController = require('../controller/userController')(User)

    userRouter.route('/')
        .post(userController.post)

    return userRouter
}

module.exports = routes