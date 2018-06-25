var authController = function (jwt) {

    var authenticateUser = function (req, res, next) {
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

    return {
        authenticateUser: authenticateUser
    }
}

module.exports = authController