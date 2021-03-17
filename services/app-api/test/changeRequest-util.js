import {expect} from 'chai';
import getChangeRequestFunctions, {
    getCMSDateFormat,
    getLinksHtml,
    hasValidStateCode
} from "../changeRequest/changeRequest-util";


describe('when using changeRequest-util', () => {

    describe("and calling getChangeRequestFunctions", function () {
        it('should not be null', (done) => {
            const testData = ['spa', 'sparai', 'waiver', 'waiverrai', 'waiverextension'];
            testData.forEach(data => expect(getChangeRequestFunctions(data)).to.not.be.null);
            done();
        });
    });

    describe("and calling getLinksHtml", function () {
        it('should not be null', (done) => {
            const testData = {title: "", url: "", filename: ""};
            const linksHtml = getLinksHtml(testData);
            expect(linksHtml).to.not.be.null;
            done();
        });
    });

    describe("and calling getCMSDateFormat", function () {
        it('should not be null', (done) => {
           const testData = {
                timestamp: Date.now(),
           };
            expect(getCMSDateFormat(testData.timestamp)).to.not.be.null;
            done();
        });
    });

    describe("and calling hasValidStateCode", function () {
        it('should be true', (done) => {
            expect(hasValidStateCode("VA")).to.be.true;
            done();
        });
    })

});