
module.exports = {
    '@tags': ['integration'],
    "@unitTest" : true,


    before : function(done) {
        console.log('Setting up...');
        done();
    },

    after : function(done) {
        console.log('Closing down...');
        done();
    },

    "Integration Test": function (done) {

        done();
    }
};