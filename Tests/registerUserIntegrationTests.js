var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering'),
    agent = request.agent(app)

describe('User registration tests:', function () {

    it('should allow a new user to register using email and password', function (done) {
        var newUser = {
            'email': 'fake.email@gmail.com',
            'password': '12345'
        }

        agent.post('/auth/register')
            .send(newUser)
            .expect(200)
            .end(function (err, results) {
                expect(results.status).to.equal(200)
                expect(results.body).to.have.all.keys('token')
                done()
            })
    })

})