var should = require('chai').should(),
    sinon = require('sinon');

describe('Login Controller:', function () {

    describe('Login', function () {

        var mockModelThatThrowsDatabaseError
        var mockModelThatReturnsUser
        var jwt
        var bcrypt
        var mockBcryptThatReturnsInvalidPassword
        var req
        var res

        beforeEach(function () {
            mockModelThatThrowsDatabaseError = {
                findOne(query, cb) {
                    cb('error')
                }
            }
            mockModelThatReturnsUser = {
                findOne(query, cb) {
                    cb(undefined, { password: 'abc123defxys' })
                }
            }
            jwt = {}
            mockBcryptThatReturnsInvalidPassword = {
                compare: function (invalidPassword, passwordToCompareTo, cb) {
                    cb(undefined, false)
                }
            }
            bcrypt = {}
            req = {
                body: {
                    email: 'john@gmail.com'
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

        })

        it('should handle database errors', function () {
            var loginController = require('../controller/loginController')(mockModelThatThrowsDatabaseError, jwt, bcrypt)
            loginController.login(req, res)

            res.status.calledWith(500).should.be.true
            res.send.calledWith('error').should.be.true

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
        })

        it('should handle invalid passwords', function () {
            var loginController = require('../controller/loginController')(mockModelThatReturnsUser, jwt, mockBcryptThatReturnsInvalidPassword)
            loginController.login(req, res)

            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'invalid email or password' })

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
        })
    })
})
