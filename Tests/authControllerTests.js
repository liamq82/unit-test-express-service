var should = require('chai').should(),
    sinon = require('sinon');

describe('Auth Controller Tests:', function () {
    describe('Authenticate User', function () {
        var User
        var validToken = 'abc123def456'
        var invalidToken = 'odoeiuyd34566'
        var userId = '123xyz'
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
            authController.validateUserPassword(mockRequestWithNoHeader, res, next)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Auth token invalid.' }).should.be.true
        })

        it('should set response status to 401 and send error message if token is invalid', function () {
            authController.validateUserPassword(mockRequestWithInvalidToken, res, next)

            res.status.calledOnce.should.be.true
            res.send.calledOnce.should.be.true
            res.status.calledWith(401).should.be.true
            res.send.calledWith({ message: 'Unauthorized. Auth token invalid.' }).should.be.true
        })

        it('should add user id to request object if header token is valid', function () {
            authController.validateUserPassword(requestWithValidToken, res, next)

            requestWithValidToken.userId.should.equal(userId)
            next.calledOnce.should.be.true
            res.status.notCalled.should.be.true
            res.send.notCalled.should.be.true
        })
    })

    describe('Authenticate user in database', function () {

        var User
        var mockUser
        var userId
        var jwt = {}
        var authController
        var req
        var res
        var next

        beforeEach(function () {
            userId = '1232nth4nd4123ds54nth'
            mockUser = {}
            req = {
                userId: userId
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            next = sinon.spy()
            User = {
                findById: function (userId, cb) {
                    cb(undefined, mockUser)
                }
            }
            authController = require('../controller/authController')(User, jwt)
        })

        it('should search for a user in the database', function () {
            User.findById = sinon.spy()
            authController.validateUserInDatabase(req, res, next)

            User.findById.calledOnce.should.be.true
        })

        it('should search for user by user id', function () {
            User.findById = sinon.spy()

            authController.validateUserInDatabase(req, res, next)

            sinon.assert.calledWith(User.findById, userId)
        })

        it('should call next if a user is found in the database', function () {
            authController.validateUserInDatabase(req, res, next)

            next.calledOnce.should.be.true
        })

        it('should not call next if a database error occurs', function () {
            User.findById = function (userId, cb) {
                cb('error', undefined)
            }
            authController.validateUserInDatabase(req, res, next)

            next.calledOnce.should.be.false
        })

        it('should set error code 500 if database error occurs', function () {
            User.findById = function (userId, cb) {
                cb('error', undefined)
            }
            authController.validateUserInDatabase(req, res, next)

            res.status.calledWith(500).should.be.true
        })

        it('should send error message if database error occurs', function () {
            User.findById = function (userId, cb) {
                cb('error', undefined)
            }
            authController.validateUserInDatabase(req, res, next)

            res.send.calledWith('error').should.be.true
        })

        it('should not call next if no user is found in the database', function () {
            User.findById = function (userId, cb) {
                cb(undefined, null)
            }
            authController.validateUserInDatabase(req, res, next)

            sinon.assert.notCalled(next)
        })
    })
})