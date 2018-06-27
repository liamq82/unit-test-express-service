var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    agent = request.agent(app)

describe('User login tests:', function () {
    var user = {
        'email': 'fake.email@gmail.com',
        'password': '12345'
    }

    beforeEach(function (done) {
        agent.post('/auth/register')
            .send(user)
            .end(function (err, results) {
                done()
            })
    })

    it('should allow a user to log in using email address and password', function (done) {
        agent.post('/auth/login')
            .send(user)
            .expect(200)
            .end(function (err, results) {
                expect(results.status).to.equal(200)
                expect(results.body).to.have.all.keys('token')
                done()
            })
    })

    afterEach(function (done) {
        User.remove().exec()
        done()
    })

})