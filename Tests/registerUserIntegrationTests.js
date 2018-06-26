var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app'),
    mongoose = require('mongoose'),
    Offering = mongoose.model('Offering'),
    agent = request.agent(app)

describe('Register User Tests:', function () {
    it.only('should allow a new user to register', function (done) {
        var newUser = {
            'email': 'gar@gmail.com',
            'password': '12345'
        }

        agent.post('/auth/register')
            .send(newUser)
            .expect(200)
            .end(function (err, results) {
                expect(results.body.email).to.equal('gar@gmail.com')
                done()
            })
    })
})