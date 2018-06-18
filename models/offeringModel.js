var mongoose = require('mongoose'),
    Schema = mongoose.Schema

var offeringModel = new Schema({
    cusipId: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model('Offering', offeringModel)