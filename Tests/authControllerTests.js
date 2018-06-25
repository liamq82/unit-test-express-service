var should = require('chai').should(),
    sinon = require('sinon');

describe('Auth Controller Tests:', function () {
    describe('Authenticate User', function () {
        var User
        var jwt
        var authController
        var mockRequestWithNoHeader

        beforeEach(function () {
            User = {}
            jwt = {}
            authController = require('../controller/authController')(User, jwt)
            mockRequestWithNoHeader = {
                header: function () {
                    return undefined
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

        })

        it('should send error message if no token in header', function () {
            authController.authenticateUser(mockRequestWithNoHeader, res, jwt)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Missing authorization token.' }).should.be.true
        })

        it('should add user id to request object if header token is valid', function () {
            var userToken = 'abc123def456'
            var userId = '123xyz'
            var req = {
                header: function (token) {
                    return userToken
                }
            }
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            var jwt = {
                decode: function (token, secret) {
                    return { sub: userId }
                }
            }
            var next = sinon.spy()
            var authController = require('../controller/authController')(User, jwt)
            authController.authenticateUser(req, res, next)

            req.userId.should.equal(userId)
            next.calledOnce.should.be.true
            res.status.notCalled.should.be.true
            res.send.notCalled.should.be.true
        })
    })
})