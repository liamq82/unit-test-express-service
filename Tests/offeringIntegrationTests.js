var should = require('should'),
    // expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering'),
    agent = request.agent(app)

describe('Offering CRUD Tests:', function () {
    var token

    beforeEach(function (done) {
        var newUser = {
            'email': 'liam@gmail.com',
            'password': '12345'
        }

        agent.post('/auth/register')
            .send(newUser)
            .expect(200)
            .end(function (err, results) {
                token = results.body.token
                done()
            })
    })
    it('should allow an offering to be posted and return and _id', function (done) {
        var offeringPost = {
            "cusipId": "123987",
            "description": "new offering"
        }

        agent.post('/api/Offerings')
            .set({ 'token': token })
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