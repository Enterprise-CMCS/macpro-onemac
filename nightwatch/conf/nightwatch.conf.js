// Autogenerated by Nightwatch
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const fs = require('fs');
const path = require('path');
const Services ={}; loadServices();

module.exports = {
    // An array of folders (excluding subfolders) where your nightwatch are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ["./nightwatch/tests"],

    // See https://nightwatchjs.org/guide/working-with-page-objects/
    page_objects_path: './nightwatch/page_objects',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
    //custom_commands_path: '',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions
    //custom_assertions_path: '',

    // See https://nightwatchjs.org/guide/#external-globals
    globals_path: "./nightwatch_globals.js",

    disable_error_log: false,

    test_settings: {
        default: {
            launch_url: `${process.env.APPLICATION_ENDPOINT}`,

            globals: {
                user: `${process.env.TEST_USERS}`,
                pass: `${process.env.TEST_USER_PASSWORD}`,
            },

            exclude: ["./nightwatch/page_objects", "./nightwatch/examples"],
            webdriver: {
                start_process: true,
                log_path: false,
            },

            screenshots : {
                enabled : true,
                on_failure: true,
                on_error : true,
                path : "./nightwatch/screenshots"
            },
        },

        firefox: {
            desiredCapabilities : {
                browserName : 'firefox',
                alwaysMatch: {
                    // Enable this if you encounter unexpected SSL certificate errors in Firefox
                    // acceptInsecureCerts: true,
                    'moz:firefoxOptions': {
                        args: [
                            '--window-size=1024,768',
                            '-verbose',
                            //'-headless',
                            // '-verbose'
                        ],
                    }
                }
            },
            webdriver: {
                port: 9516,
                server_path: Services.geckodriver.path,
                cli_args: [
                    // very verbose geckodriver logs
                    // '-vv'
                ]
            }
        },

        chrome: {
            desiredCapabilities : {
                browserName : 'chrome',
                'goog:chromeOptions': {
                    // This tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
                    // w3c: false,
                    // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
                    args: [
                        "--log-level=3",
                        "--window-size=1024,768",
                        //'--no-suites',
                        //'--ignore-certificate-errors',
                        //'--allow-insecure-localhost',
                        //'--headless'
                    ]
                }
            },

            webdriver: {
                port: 9515,
                server_path: Services.chromedriver.path,
                cli_args: [
                    // --verbose
                ]
            }
        },


        "unit-test" : {
            unit_tests_mode : true,
            filter: "./nightwatch/unit"
        }
    }
};

function loadServices() {
    // Catches any general WebDriver Service Errors and writes to logFile
    const logPath = path.join(process.cwd(), "nightwatch", "log");
    const timeStamp = new Date().toString()
    const serviceLog = path.join(logPath, "webDriver.log.txt");
    fs.writeFileSync(serviceLog, timeStamp, 'utf8');

    try {
        Services.seleniumServer = require('selenium-server');
    } catch (err) {
        fs.appendFileSync(serviceLog, err);
    }

    try {
        Services.chromedriver = require('chromedriver');
    } catch (err) {
        fs.appendFileSync(serviceLog, err);
    }

    try {
        Services.geckodriver = require('geckodriver');
    } catch (err) {
        fs.appendFileSync(serviceLog, err);
    }

}
