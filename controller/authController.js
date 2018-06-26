var authController = function (User, jwt) {

    var validateUserPassword = function (req, res, next) {
        var token = req.header('token')
        var payload
        try {
            payload = jwt.decode(token, '123')
        }
        catch (err) {
            res.status(401)
            res.send({ message: 'Unauthorized. Auth token invalid.' })
        }
        if (payload) {
            req.userId = payload.sub
            next()
        }
    }

    var validateUserInDatabase = function (req, res, next) {
        User.findById(req.userId, function (err, user) {
            if (err) {
                res.status(500)
                res.send(err)
            }
            if (user)
                next()
        })
    }

    return {
        validateUserPassword: validateUserPassword,
        validateUserInDatabase: validateUserInDatabase
    }
}

module.exports = authController