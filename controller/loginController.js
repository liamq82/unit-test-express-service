var loginController = function (User, jwt, bcrypt) {

    var post = function (req, res) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, valid) {
                    if (!valid) {
                        res.status(401)
                        res.send({ message: 'invalid email or password' })
                    } else {
                        var payload = {}
                        var token = jwt.encode(payload, '123')
                        res.status(200)
                        res.send({ token: token })
                    }
                })
            }
        })
    }

    return {
        post: post
    }
}

module.exports = loginController