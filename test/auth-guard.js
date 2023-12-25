const authMiddleware = require('../middleware/auth-guard');
const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
describe("Authentication Middleware", function() {

    it("it should throw an error if no authorization header is present", function() {

        const req = {
            get: function(headerName) {
                return null;
            }      
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Unauthorized');
    });

 it("it should return user id after decoding the token", function() {

        const req = {
            get: function(headerName) {
                return "Bearer djdjirir";
            }      
        }
        
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({
            userId: '12'
        });
        authMiddleware(req, {}, ()=>{});
        expect(req).to.have.property("userId");
        jwt.verify.restore();
    });
})
