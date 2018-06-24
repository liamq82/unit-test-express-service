var loginController = function (User) {

    var post = function (req, res) {
        var user = User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                res.status(500)
                res.send(err)
            } else
                res.json(user)
        })
    }

    return {
        post: post
    }
}

module.exports = loginController