module.exports = {
    url: 'https://d2dr7dgo9g0124.cloudfront.net',

    elements : {
        loginButton : {
            selector : '//button[text()="Development Login"]',
            locateStrategy : 'xpath'
        },
        userField : '#email',
        passField : '#password',
        submitBtn : 'button[type=submit]',
        logout : {
            selector: '(//button)[1]',
            locateStrategy: 'xpath'
        },
    }
}