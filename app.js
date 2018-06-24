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

app.use('/api/Offerings', offeringRouter)

// User registration
app.post('/api/register', function (req, res) {
    var user = new User(req.body)
    user.save(function (err) {
        if (err) {
            res.status(500)
            res.send(err)
        }
        else
            res.json(user)
    })
})

app.listen(port, () => console.log('listening on port ', port))