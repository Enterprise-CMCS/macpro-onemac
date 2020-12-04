
module.exports = {
    url: `${process.env.APPLICATION_ENDPOINT}`,

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
