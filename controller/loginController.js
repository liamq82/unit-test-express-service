var loginController = function (User, jwt, bcrypt) {

    var login = function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(401)
            res.send({ message: 'invalid email or password' })
            return
        }
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
                        var payload = { sub: user._id }
                        var token = jwt.encode(payload, '123')
                        res.status(200)
                        res.send({ token: token })
                    }
                })
            }
        })
    }

    return {
        login: login
    }
}

module.exports = loginController