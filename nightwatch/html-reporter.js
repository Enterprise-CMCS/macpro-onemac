const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const rootDir = path.join(process.cwd(), 'nightwatch');

const scrubReport = (results) => {
    const regex1 = /\\u001b\[\d+[0-9|;]*m/g;
    const str = JSON.stringify(results).replace(regex1, " ");
    return JSON.parse(str);
}
module.exports = {
    write : function(results, options, done) {
        results = scrubReport(results);
        const reportFilename = options.filename_prefix + (Math.floor(Date.now() / 1000)) + '.html';
        const reportFilePath = path.join(options.output_folder, reportFilename);
        const hbs = path.join(rootDir, 'html-reporter.hbs'); // Filepath to template

        // read the html template
        fs.readFile(hbs, function(err, data) {
            if (err) throw err;

            const template = data.toString();

            // merge the template with the test results data
            const html = handlebars.compile(template)({
                results   : results,
                options   : options,
                timestamp : new Date().toString(),
                browser   : options.filename_prefix.split('_').join(' ')
            });

            // write the html to a file
            fs.writeFile(reportFilePath, html, function(err) {
                if (err) throw err;
                console.log('Report generated: ' + reportFilePath);
                done();
            });
        });
    }
};