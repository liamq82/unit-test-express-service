var offeringController = function (Offering) {
    var post = function (req, res) {
        var offering = new Offering(req.body)

        if (!req.body.cusipId) {
            res.status(400)
            res.send('Cusip ID is required')
        } else {
            offering.save()
            res.status(201)
            res.send(offering)
        }

    }

    var get = function (req, res) {
        var query = {}
        if (req.query.cusipId) {
            query.cusipId = req.query.cusipId
        }
        Offering.find(query, function (err, offerings) {
            if (err) {
                res.status(500)
                res.send(err)
            }
            else
                res.json(offerings)
        })
    }

    var getByIdMiddleware = function (req, res, next) {
        Offering.findById(req.params.offeringId, function (err, offering) {
            if (err)
                res.status(500).send(err)
            else if (offering) {
                req.offering = offering
                next()
            } else
                res.status(404).send('no offering found')
        })

    }

    var getById = function (req, res) {
        res.json(req.offering)
    }

    var put = function (req, res) {
        req.offering.cusipId = req.body.cusipId
        req.offering.description = req.body.description
        req.offering.save(function (err) {
            if (err)
                res.status(500).send(err)
            else
                res.json(req.offering)
        })
    }

    return {
        post: post,
        get: get,
        getByIdMiddleware: getByIdMiddleware,
        getById: getById,
        put: put
    }
}

module.exports = offeringController