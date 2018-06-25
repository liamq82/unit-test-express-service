var should = require('chai').should(),
    sinon = require('sinon');

describe('Auth Controller Tests:', function () {
    describe('Authenticate User', function () {
        var userToken = 'abc123def456'
        var userId = '123xyz'
        var User
        var jwt
        var authController
        var mockRequestWithNoHeader
        var requestWithValidToken
        var next

        beforeEach(function () {
            User = {}
            authController = require('../controller/authController')(User, jwt)
            mockRequestWithNoHeader = {
                header: function () {
                    return undefined
                }
            }
            requestWithValidToken = {
                header: function (token) {
                    return userToken
                }
            }
            jwt = {
                decode: function (token, secret) {
                    return { sub: userId }
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            next = sinon.spy()
        })

        it('should send error message if no token in header', function () {
            authController.authenticateUser(mockRequestWithNoHeader, res, jwt)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Missing authorization token.' }).should.be.true
        })

        it('should add user id to request object if header token is valid', function () {
            authController.authenticateUser(requestWithValidToken, res, next)

            requestWithValidToken.userId.should.equal(userId)
            next.calledOnce.should.be.true
            res.status.notCalled.should.be.true
            res.send.notCalled.should.be.true
        })
    })
})