
module.exports = {
    url: 'https://d2dr7dgo9g0124.cloudfront.net',

    elements : {
        loginTitle : 'div[class=page-title-bar]',
        loginButton : 'button:nth-child(2)',
        userField : '#email',
        passField : '#password',
        submitBtn : 'button[type=submit]',
        logout : {
            selector: '(//button)[1]',
            locateStrategy: 'xpath'
        },
    },
}