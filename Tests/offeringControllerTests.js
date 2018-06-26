var should = require('chai').should(),
    sinon = require('sinon');

describe('Offering Controller Tests:', function () {
    describe('Post', function () {

        var Offering = function (offering) {
            this.save = function (cb) {
                cb(undefined)
            }
        }
        var offeringController = require('../controller/offeringController')(Offering)
        var res;

        beforeEach(function () {
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
        })

        it('should not allow an empty cusip ID on POST', function () {
            var req = {
                body: {
                    description: 'My offering for testing.'
                }
            }
            offeringController.post(req, res)

            res.status.calledWith(400).should.be.true
            res.send.calledWith('Cusip ID is required').should.be.true
        })

        it('should save valid offerings', function () {
            var req = {
                body: {
                    cusipId: '12345'
                }
            }

            offeringController.post(req, res)
            res.status.calledWith(201).should.equal(true, 'Valid offering not saved successfully')
            res.send.calledOnce.should.equal(true, 'Send was not called for valid offering')
            res.send.calledWith(req)
        })
    })

    describe('GET', function () {

        var res;
        var req;
        var OfferingThatReturnsError = {
            find: function (query, cb) {
                cb('error')
            }
        }
        var OfferingThatReturnsData = {
            find: function (query, cb) {
                cb(null, ['offering 1', 'offering 2', 'offering 3'])
            }
        }
        var OfferingWithSpyOnFindFunction;
        var queryWithNoCusipId = {}

        beforeEach(function () {
            res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }
            req = {
                query: {}
            }
            OfferingWithSpyOnFindFunction = {
                find: sinon.spy()
            }
        })

        it('should return error 500 if database error thrown', function () {
            var offeringController = require('../controller/offeringController')(OfferingThatReturnsError)
            offeringController.get(req, res)

            res.status.calledWith(500).should.equal(true, 'Error code 500 not set in status')
            res.send.calledWith('error').should.equal(true, 'send called with incorrect error message')
        })

        it('should return list of offerings found in database', function (done) {
            var offeringController = require('../controller/offeringController')(OfferingThatReturnsData)
            offeringController.get(req, res)

            res.json.calledOnce.should.equal(true, 'send not called for successful GET')
            res.json.calledWith(['offering 1', 'offering 2', 'offering 3']).should.equal(true, 'offerings returned from database not sent in response')
            done()
        })

        it('should get offering by cusip ID', function () {
            req.query.cusipId = '12345'
            var offeringController = require('../controller/offeringController')(OfferingWithSpyOnFindFunction)
            offeringController.get(req, res)

            OfferingWithSpyOnFindFunction.find.calledWith({ cusipId: '12345' }).should.equal(true, 'Cusip ID not used to get Offering')
        })

        it('should get all offerings if no cusip ID available', function () {
            var offeringController = require('../controller/offeringController')(OfferingWithSpyOnFindFunction)
            offeringController.get(req, res)
            OfferingWithSpyOnFindFunction.find.calledWith(queryWithNoCusipId).should.equal(true, 'Cusip ID should not have been passed as query parameter')
        })
    })

    describe('Get by ID middleware', function () {

        var OfferingThatReturnsError = {
            findById: function (id, cb) {
                cb('error')
            }
        }
        var offeringControllerThatReturnsError = require('../controller/offeringController')(OfferingThatReturnsError)

        var offeringRetrievedFromDatabase = { cusipId: '12345', description: 'My offering' }
        var OfferingThatSuccessfullyGetsData = {
            findById: function (id, cb) {
                cb(null, offeringRetrievedFromDatabase)
            }
        }
        var offeringControllerSuccess = require('../controller/offeringController')(OfferingThatSuccessfullyGetsData)


        var OfferingThatReturnsNoData = {
            findById: function (id, cb) {
                cb(null, null)
            }
        }
        var offeringControllerNoOfferingFound = require('../controller/offeringController')(OfferingThatReturnsNoData)

        var req
        var res
        var next

        beforeEach(function () {
            req = {
                params: {
                    offeringId: '12345'
                }
            }
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
            next = sinon.spy()
        })

        it('should handle server errors', function () {
            offeringControllerThatReturnsError.getByIdMiddleware(req, res, next)

            res.status.calledWith(500).should.equal(true, 'Server error did not set status as 500')
            res.send.calledWith('error').should.equal(true, 'Server error did not return errom message')
        })

        it('should successfully retrive offerings', function () {
            offeringControllerSuccess.getByIdMiddleware(req, res, next)

            next.calledOnce.should.equal(true, 'Next should be called if an offering is retrieved from database')
            req.offering.should.equal(offeringRetrievedFromDatabase, 'Offering was not added to request')
        })

        it('should handle no offering found', function () {
            offeringControllerNoOfferingFound.getByIdMiddleware(req, res, next)

            res.status.calledWith(404).should.equal(true, 'status not set to 404 when no offering found')
            res.send.calledWith('no offering found').should.equal(true, 'should call send with "no offering found"')
        })
    })

    describe('GET by ID', function () {
        var Offering = {}
        var retrievedOffering = {
            cusipId: '12345',
            description: 'Offering retrieved from database'
        }
        var offeringController = require('../controller/offeringController')(Offering)
        var req = {
            offering: retrievedOffering
        }
        var res = {
            json: sinon.spy()
        }
        it('should return an offering', function () {
            offeringController.getById(req, res)
            res.json.calledWith(retrievedOffering).should.equal(true, 'GET by ID did not return offering')
        })
    })

    describe('PUT', function () {

        var offeringController = require('../controller/offeringController')()
        var reqWithSaveError = {
            body: {
                cusipId: '12345',
                description: 'offering to put'
            },
            offering: {
                save: function (cb) {
                    cb('error')
                }
            }
        }

        var offeringToSave = {
            cusipId: '12345',
            description: 'succesfully saved offering'
        }
        var reqWithSuccessfulSave = {
            body: offeringToSave,
            offering: {
                save: function (cb) {
                    cb(null)
                }
            }
        }
        var res;

        beforeEach(function () {
            res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }

        })

        it('should handle errors when saving to database', function () {
            offeringController.put(reqWithSaveError, res)
            res.status.calledWith(500).should.be.true
            res.send.calledWith('error').should.be.true
        })

        it('should return saved offering on successful save', function () {
            offeringController.put(reqWithSuccessfulSave, res)

            res.json.calledWith(reqWithSuccessfulSave.offering).should.be.true
        })
    })
})