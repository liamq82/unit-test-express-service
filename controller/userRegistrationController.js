var userController = function (User, jwt) {

    var registerNewUser = function (req, res) {
        var user = new User(req.body)
        user.save(function (err, newUser) {
            if (err) {
                res.status(500)
                res.send(err)
            }
            else {
                var payload = { sub: newUser._id }
                var token = jwt.encode(payload, '123')
                res.status(200)
                res.send({ token: token })
            }
        })
    }

    return {
        registerNewUser: registerNewUser
    }
}

module.exports = userController