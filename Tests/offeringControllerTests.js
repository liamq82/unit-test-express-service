var should = require('should'),
    sinon = require('sinon');

describe('Offering Controller Tests:', function () {
    describe('Post', function () {
        it('should not allow an empty cusip ID on POST', function () {
            var Offering = function (offering) {
                this.save = function () {

                }
            }

            var req = {
                body: {
                    description: 'My offering for testing.'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var offeringController = require('../controller/offeringController')(Offering)

            offeringController.post(req, res)

            res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args[0][0])
            res.send.calledWith('Cusip ID is required').should.equal(true)
        })

        it('should save valid offerings', function () {
            var Offering = function (offering) {
                this.save = function () { }
            }
            var req = {
                body: {
                    cusipId: '12345'
                }
            }
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var offeringController = require('../controller/offeringController')(Offering)
            offeringController.post(req, res)
            res.status.calledWith(201).should.equal(true, 'Valid offering not saved successfully')
            res.send.calledOnce.should.equal(true, 'Send was not called for valid offering')
        })
    })
})