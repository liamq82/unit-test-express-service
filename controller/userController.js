var userController = function (User) {

    var post = function (req, res) {
        var user = new User(req.body)
        user.save(function (err) {
            if (err) {
                res.status(500)
                res.send(err)
            }
            else
                res.json(user)
        })
    }

    return {
        post: post
    }
}

module.exports = userController