var should = require('should'),
    // expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering'),
    agent = request.agent(app)

describe('Offering CRUD Tests:', function () {
    beforeEach(function (done) {
        var offering = new Offering({ cusipId: '12345', description: 'test cusip' })
        offering.save(function (err, res) {
            if (err)
                console.log(err)
            else {
                console.log('offering saved')
            }
            done()
        })
    })
    xit('should allow an offering to be posted and return and _id', function (done) {
        var offeringPost = {
            "cusipId": "123987",
            "description": "new offering"
        }

        agent.post('/api/Offerings')
            .send(offeringPost)
            .expect(200)
            .end(function (err, results) {
                results.body.cusipId.should.equal('123987')
                results.status.should.equal(201)
                done()
            })
    })

    afterEach(function (done) {
        Offering.remove().exec()
        done()
    })
})