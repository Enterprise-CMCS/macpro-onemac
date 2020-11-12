// Autogenerated by Nightwatch
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const browser = 'chrome'
const Services ={}; loadServices();

module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ["tests/cases/spa"],

    // See https://nightwatchjs.org/guide/working-with-page-objects/
    page_objects_path: 'tests/page_objects/spa',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
    custom_commands_path: '',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions
    custom_assertions_path: '',

    // See https://nightwatchjs.org/guide/#external-globals
    globals_path: '',

    webdriver: {
        start_process: true,
        server_path: browser === 'chrome' ? Services.chromedriver.path : Services.geckodriver.path,
        port: 9515,
        log_path: false,
        cli_args: []
    },

    test_settings: {
        default: {
            desiredCapabilities: {
                browserName: browser
            }
        },

    }
};
function loadServices() {
    /*try {
        Services.seleniumServer = require('selenium-server');
    } catch (err) {}*/

    try {
        Services.chromedriver = require('chromedriver');
    } catch (err) {}

    try {
        Services.geckodriver = require('geckodriver');
    } catch (err) {}

}
