var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
    email: String,
    password: String
})

userSchema.pre('save', function (next) {
    var user = this
    if (!user.isModified('password'))
        return next()

    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err)
            return next(err)
        else {
            user.password = hash
            next()
        }
    })
})

module.exports = mongoose.model('User', userSchema)