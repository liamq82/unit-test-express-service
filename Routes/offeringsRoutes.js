var express = require('express')

var routes = function (Offering) {
    var offeringRouter = express.Router();
    var offeringController = require('../controller/offeringController')(Offering)
    offeringRouter.route('/')
        .post(offeringController.post)
        .get(offeringController.get)

    offeringRouter.use('/:offeringId', function (req, res, next) {
        Offering.findById(req.params.offeringId, function (err, offering) {
            if (err)
                res.status(500).send(err)
            else if (offering) {
                req.offering = offering
                next()
            } else
                res.status(404).send('no offering found')
        })

    })
    offeringRouter.route('/:offeringId')
        .get(function (req, res) {
            res.json(req.offering)
        })
        .put(function (req, res) {
            req.offering.cusipId = req.body.cusipId
            req.offering.description = req.body.description
            req.offering.save(function (err) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json(req.offering)
            })
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id

            for (var key in req.body) {
                req.offering[key] = req.body[key]
            }

            req.offering.save(function (err) {
                if (err)
                    res.status(500).send(err)
                else
                    res.json(req.offering)
            })
        })
        .delete(function (req, res) {
            req.offering.remove(function (err) {
                if (err)
                    res.status(500).send(err)
                else
                    res.status(204).send('Removed')
            })
        })

    return offeringRouter
}

module.exports = routes