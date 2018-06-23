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
        .patch(offeringController.patch)
        .delete(offeringController.delete)

    return offeringRouter
}

module.exports = routes