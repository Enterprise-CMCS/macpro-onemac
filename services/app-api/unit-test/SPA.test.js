const expect = require('chai').expect;
const SPA = require('../changeRequest/SPA');


describe('SPA test ', () => {
    it('calls getCMSEmail', () => {
        const data = {transmittalNumber: "YY-21-1234-5678"}
        const email = SPA.getCMSEmail(data);
        expect(email).to.have.property('callCount', 1);
    });
});