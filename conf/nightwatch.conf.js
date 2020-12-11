// Autogenerated by Nightwatch
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const fs = require('fs');
const path = require('path');
const Services ={}; loadServices();


module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ["./tests/"],

    // See https://nightwatchjs.org/guide/working-with-page-objects/
    page_objects_path: './tests/page_objects',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands
    //custom_commands_path: '',

    // See https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions
    //custom_assertions_path: '',

    // See https://nightwatchjs.org/guide/#external-globals
    globals_path: "./nightwatch_globals.js",

    disable_error_log: false,

    test_settings: {
        default: {
            exclude: ["./tests/page_objects", "./tests/examples"],
            globals: {
                userName: `${process.env.TEST_USERS}`,
                passWord: `${process.env.TEST_USER_PASSWORD}`,
            },
            launch_url: `${process.env.APPLICATION_ENDPOINT}`,
            webdriver: {
                start_process: true,
                log_path: false,
            },

            screenshots : {
                enabled : false,
                on_failure: false,
                on_error : true,
                path : "./tests/reports/screenshots"
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
                            '-headless',
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
                        '--headless'
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

        selenium: {
            selenium: {
                start_process: true,
                server_path: Services.seleniumServer.path,
                port: 4444,
                default_path_prefix: '/wd/hub',
                cli_args: []
            }
        },

        "selenium.chrome": {
            extends: 'selenium',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions : {
                    args: []
                },
                cli_args : ["--verbose"]
            }
        },

        "selenium.firefox": {
            extends: 'selenium',
            desiredCapabilities: {
                browserName: 'firefox',
                firefoxOptions: {
                    args: []
                },
                cli_args: ["--verbose"]
            }
        },

        "unit-test" : {
            unit_tests_mode : true,
            filter: "./tests/unit"
        }
    }
};

function loadServices() {
    // Catches any general WebDriver Service Errors and writes to logFile
    const logPath = path.join(process.cwd(), "log", "webdriverService.log");
    const timeStamp = new Date().toString()
    const serviceLog = fs.existsSync(logPath) ? logPath : fs.writeFileSync(logPath, timeStamp);

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
