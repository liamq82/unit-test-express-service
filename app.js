var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

var db = mongoose.connect('mongodb://localhost/offeringAPI')
var Offering = require('./models/offeringModel')

var app = express()

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var offeringRouter = express.Router();

offeringRouter.route('/Offerings')
    .post(function (req, res) {
        var offering = new Offering(req.body)
        offering.save()
        res.status(201).send(offering)
    })
    .get(function (req, res) {
        var query = {}
        if (req.query.cusipId) {
            query.cusipId = req.query.cusipId
        }
        Offering.find(query, function (err, offerings) {
            if (err)
                res.status(500).send(err)
            else
                res.json(offerings)
        })
    })

offeringRouter.route('/Offerings/:offeringId')
    .get(function (req, res) {
        Offering.findById(req.params.offeringId, function (err, offering) {
            if (err)
                res.status(500).send(err)
            else
                res.json(offering)
        })
    })

app.use('/api', offeringRouter)

app.get('/', (req, res) => res.send('hello world!'))

app.listen(port, () => console.log('listening on port ', port))