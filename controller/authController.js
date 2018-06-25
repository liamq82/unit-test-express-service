var authController = function (User, jwt) {

    var authenticateUser = function (req, res, next) {
        if (!req.header('token')) {
            res.status(401)
            res.send({ message: 'Unauthorized. Missing authorization token.' })
        } else {
            var token = req.header('token')
            var payload = jwt.decode(token, '123')
            if (!payload) {
                res.status(401)
                res.send({ message: 'Unauthorized. Auth token invalid.' })
            } else {
                req.userId = payload.sub
                next()
            }
        }
    }

    return {
        authenticateUser: authenticateUser
    }
}

module.exports = authController