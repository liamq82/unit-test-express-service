var offeringController = function (Offering) {
    var post = function (req, res) {
        var offering = new Offering(req.body)
        offering.save()
        res.status(201).send(offering)
    }

    return { post }
}

module.exports = offeringController