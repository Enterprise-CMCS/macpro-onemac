const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const rootDir = path.join(process.cwd(), 'nightwatch');

const getReportName = (results, options, summary) => {
    const {modules} = results;
    const [title,] = Object.entries(modules).pop(), [dir, file] = title.split("\\");
    const fileName = (summary)
        ? `${options.filename_prefix}${file.concat('.html')}`
        : `${options.filename_prefix}${file.concat('_summary.html')}`

    return path.join(dir, fileName);
}

const scrubReportData = function (regex, results, replaceVal= " ") {
    const re = new RegExp(regex);
    const str = JSON.stringify(results).replace(re, replaceVal);
    return JSON.parse(str);
}

const scrubbedResults = function (results, options, regex, summary = false) {
    return {
        file: path.join(options.output_folder, getReportName(results, options, summary)),
        data: scrubReportData(regex, results)
    };
}

module.exports = {
    write : function(results, options, done) {
        const hbs = path.join(rootDir, 'html-reporter.hbs'); // Filepath to template
        const regexNoANSI = /\\u001b\[\d+[0-9|;]*m/g, regexNoTags = /<[\D]+|[\d]*>/g; // Removes all ANSI encoding and tags

        const reports = [scrubbedResults(results, options, regexNoANSI)];
        reports.push(scrubbedResults(reports[0].data, options, regexNoTags, true));

        // read the html template
        fs.readFile(hbs, function(err, data) {
            if (err) throw err;
            const template = data.toString();

            // merge the template with the test results data
            reports.forEach(report => {
                let html = handlebars.compile(template)({
                    results   : report.data,
                    options   : options,
                    timestamp : new Date().toString(),
                    browser   : options.filename_prefix.split('_').join(' ')
                });
                // write the html to a file

                fs.writeFile(report.file, html, function(err) {
                    if (err) throw err;
                    console.log('Report generated: ' + report.file);
                });
            })
        })
        done();
    }
};