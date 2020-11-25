const chai = require('chai')
const assert = require('assert');

module.exports = {
    '@unitTest': true,
    before: function () {
        chai.config.includeStack = false;
        chai.config.showDiff = true;
        chai.config.truncateThreshold = 0;
        const regex = /^([a-zA-Z]{2}-)([0-9]{2}-)([0-9]{4})(-[0-9]{4})?$/
    },

    after: function () {

    },

    'Field Validation UnitTest Format' : function (done) {
        setTimeout(function() {
            done();
        }, 10);
    }
};