var offeringController = function (Offering) {
    var post = function (req, res) {
        var offering = new Offering(req.body)
        offering.save()
        res.status(201).send(offering)
    }

    var get = function (req, res) {
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
    }

    return {
        post,
        get
    }
}

module.exports = offeringController