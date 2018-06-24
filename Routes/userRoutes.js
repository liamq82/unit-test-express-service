var express = require('express')

var routes = function (User) {
    var userRouter = express.Router()
    userRouter.route('/')
        .post(function (req, res) {
            var user = new User(req.body)
            user.save(function (err) {
                if (err) {
                    res.status(500)
                    res.send(err)
                }
                else
                    res.json(user)
            })
        })

    return userRouter
}

module.exports = routes