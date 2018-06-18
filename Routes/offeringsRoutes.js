var express = require('express')

var routes = function (Offering) {
    var offeringRouter = express.Router();

    offeringRouter.route('/')
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

    offeringRouter.route('/:offeringId')
        .get(function (req, res) {
            Offering.findById(req.params.offeringId, function (err, offering) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json(offering)
            })
        })
        .put(function (req, res) {
            Offering.findById(req.params.offeringId, function (err, offering) {
                if (err)
                    res.status(500).send(err)
                else {
                    offering.cusipId = req.body.cusipId
                    offering.description = req.body.description
                    offering.save()
                    res.json(offering)
                }
            })
        })

    return offeringRouter
}

module.exports = routes