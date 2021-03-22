const fs = require('fs');
const path = require('path');
const commands = {

    onDashBoard: function (loginBtn = this.elements.loginBtn) {
        this.api.click(loginBtn).waitForElementPresent('body');
        this.api.pause(3000);
    },


    login: function (testData) {
        this.onDashBoard();
        this.api.setValue(this.elements.userField, testData.username).pause(100);
        this.api.setValue(this.elements.passField, testData.password).pause(100);
        this.api.click(this.elements.tandc).pause(100);
        this.api.click(this.elements.submitBtn).waitForElementNotPresent(this.elements.submitBtn);

    },

    devLogin: function (testData) {
        this.onDashBoard(this.elements.devLoginButton);
        this.api.setValue(this.elements.devUserField, testData.username).pause(100);
        this.api.setValue(this.elements.devPassField, testData.password).pause(100);
        this.api.click(this.elements.devSubmitBtn).waitForElementNotPresent(this.elements.devSubmitBtn);
    },

    logout: function () {
        this.api.click(this.elements.myAccountLink).pause(100);
        this.api.click(this.elements.logout);
    },
}

module.exports = {
    elements: {
        alert_banner: "[id*=alert_]",
        alert_text: "p[class=ds-c-alert__text]",
        dashboardLink: '[id=dashboardLink]',
        devLoginButton : '[id=devloginBtn]',
        devPassField : '[id=password]',
        devSubmitBtn : 'input[type=submit]',
        devUserField : '[id=email]',
        userField : '[id=okta-signin-username]',
        loginBtn: 'div.nav-right > button',
        loginTitle : 'div[id=title_bar]',
        myAccountLink : '[id=myAccountLink]',
        manageAccountLink: "[id=manageAccountLink]",
        logout : '[id=logoutLink]',
    },

    commands : [commands],

    props : {
        pauseAction: 1000,
        getRandomNumber(inclusive, exclusive) {
            let range = { min: Math.ceil(inclusive), max: Math.floor(exclusive) };
            let randomNum = Math.floor(Math.random() * (range.max - range.min) + range.min).toString();
            let size = range.max.toString().length;
            while (randomNum.length < size - 1) {
                randomNum = "0".concat(randomNum);
            }
            console.log(randomNum);
            return randomNum;
        },
    }
};
