var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcrypt-nodejs')

var db

if (process.env.ENV === 'Test')
    db = mongoose.connect('mongodb://localhost/offeringAPI_test')
else
    db = mongoose.connect('mongodb://localhost/offeringAPI')

var Offering = require('./models/offeringModel')
var User = require('./models/user')

var app = express()

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

authRouter = require('./Routes/authRouter')(User, jwt)
offeringRouter = require('./Routes/offeringsRoutes')(Offering)
userRegistrationRouter = require('./Routes/userRegistrationRouter')(User, jwt)
loginRouter = require('./Routes/loginRouter')(User, jwt, bcrypt)

app.use('/api', authRouter)
app.use('/api/Offerings', offeringRouter)
app.use('/auth/register', userRegistrationRouter)
app.use('/auth/login', loginRouter)

app.listen(port, () => console.log('listening on port ', port))

module.exports = app