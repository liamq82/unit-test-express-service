var should = require('chai').should(),
    sinon = require('sinon');

describe('Auth Controller Tests:', function () {
    describe('Authenticate User', function () {
        var validToken = 'abc123def456'
        var invalidToken = 'odoeiuyd34566'
        var userId = '123xyz'
        var User
        var jwt
        var authController
        var mockRequestWithNoHeader
        var mockRequestWithInvalidToken
        var requestWithValidToken
        var next

        beforeEach(function () {
            User = {}
            mockRequestWithNoHeader = {
                header: function () {
                    return undefined
                }
            }
            requestWithValidToken = {
                header: function (token) {
                    return validToken
                }
            }
            mockRequestWithInvalidToken = {
                header: function (token) {
                    return invalidToken
                }
            }
            jwt = {
                decode: function (token, secret) {
                    if (token === undefined || token === invalidToken) {
                        throw 'error'
                    } else if (token === validToken) {
                        return { sub: userId }
                    }
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            next = sinon.spy()
            authController = require('../controller/authController')(User, jwt)
        })

        it('should set response status to 401 and send error message if no token in header', function () {
            authController.authenticateUser(mockRequestWithNoHeader, res, next)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Auth token invalid.' }).should.be.true
        })

        it('should set response status to 401 and send error message if token is invalid', function () {
            authController.authenticateUser(mockRequestWithInvalidToken, res, next)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Auth token invalid.' }).should.be.true
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