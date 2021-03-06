const expect = require('chai').expect;
const util = require('../changeRequest/changeRequest-util');


describe('ChangeRequest Utilities test ', () => {
    it('calls getCMSDateFormat', () => {
        const date = util.getCMSDateFormat(Date.now());
        expect(date).to.not.be.null;
    });
});