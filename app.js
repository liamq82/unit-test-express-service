var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

var db = mongoose.connect('mongodb://localhost/offeringAPI')
var Offering = require('./models/offeringModel')
var User = require('./models/user')

var app = express()

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

offeringRouter = require('./Routes/offeringsRoutes')(Offering)
userRegistrationRouter = require('./Routes/userRoutes')(User)

app.use('/api/Offerings', offeringRouter)
app.use('/api/register', userRegistrationRouter)

app.listen(port, () => console.log('listening on port ', port))