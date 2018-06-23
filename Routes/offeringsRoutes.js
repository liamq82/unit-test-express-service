var express = require('express')

var routes = function (Offering) {
    var offeringRouter = express.Router();
    var offeringController = require('../controller/offeringController')(Offering)

    offeringRouter.route('/')
        .post(offeringController.post)
        .get(offeringController.get)

    offeringRouter.use('/:offeringId', offeringController.getByIdMiddleware)

    offeringRouter.route('/:offeringId')
        .get(offeringController.getById)
        .put(offeringController.put)
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