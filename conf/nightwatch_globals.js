
module.exports = {

    reporter: function(results, done) {
        require('html-reporter').reporter(results);
        done();
    }
}

