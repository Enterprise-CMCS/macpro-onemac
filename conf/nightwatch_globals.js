module.exports = {
    globals: {
        userName: `${process.env.TEST_USERS}`,
        passWord: `${process.env.TEST_USER_PASSWORD}`
    },

    reporter: function(results, done) {
        console.log(results);
        done()
    }

}