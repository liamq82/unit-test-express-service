var loginController = function (User, jwt) {

    var post = function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                res.status(500)
                res.send(err)
            } else if (!user) {
                res.status(401)
                res.send({ message: 'invalid email or password' })
            } else if (user.password !== req.body.password) {
                res.send({ message: 'invalid email or password' })
            } else {
                var payload = {}
                var token = jwt.encode(payload, '123')
                res.status(200)
                res.send({ token: token })
            }
        })
    }

    return {
        post: post
    }
}

module.exports = loginController