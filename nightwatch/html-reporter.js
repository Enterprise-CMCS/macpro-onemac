const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const rootDir = path.join(process.cwd(), 'nightwatch');
const templates = [
    "html-reporter.hbs",
    "html-reporter-summary.hbs"
];

const ReportUtils = {
    scrubReport: function (results) {
        const regex = /\\u001b\[\d+[0-9|;]*m/g;
        const str = JSON.stringify(results).replace(regex, " ");
        return JSON.parse(str);
    },

    getOutputFileName: function (results, options) {
        const {modules} = results;
        const [dir, file] = Object.keys(modules).pop().split("\\");
        const fileName = String(options.filename_prefix).concat(file);
        return path.join(options.output_folder, dir, fileName);
    },

    getTemplate: function (results, options, template) {
        return handlebars.compile(template)({
            results: this.scrubReport(results),
            options: options,
            timestamp: new Date().toString(),
            browser: options.filename_prefix.split('_').join(' ')
        });
    },
};

module.exports = {
    write : function(results, options, done) {

        // Read in the templateFiles
        templates.forEach(file => {
            try {
                const reportFilename = ReportUtils.getOutputFileName(results, options);
                const templatePath = path.join(rootDir, file), template = fs.readFileSync(templatePath, "utf8");

                // merge the template with the test results data
                const html = ReportUtils.getTemplate(results, options, template);

                const outputFile = file.match(/^.*(summary).*$/g)
                    ? reportFilename.concat("-summary.html") : reportFilename.concat(".html");
                fs.writeFileSync(outputFile, html, 'utf8');
                console.log('Report generated: ' + outputFile);

            }catch (e) {
                console.error(`File ${file} not found! \n Error: ${e}`);
            }
        });
        done();
    }
};