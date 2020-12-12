const HtmlReporter = require('nightwatch-html-reporter');
const reporter = new HtmlReporter({
	openBrowser: true,
	reportsDirectory: __dirname + '/reports'
});
module.exports = {
	reporter: reporter.fn
};