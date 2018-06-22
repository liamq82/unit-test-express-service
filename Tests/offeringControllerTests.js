var should = require('should'),
    sinon = require('sinon');

describe('Offering Controller Tests:', function () {
    describe('Post', function () {

        var Offering = function (offering) {
            this.save = function () {
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

            res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0])
            res.send.calledWith('Cusip ID is required').should.equal(true)
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

        beforeEach(function () {
            res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }
            req = {
                query: {}
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
    })
})