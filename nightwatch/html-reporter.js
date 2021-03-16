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

const scrubbedResults = function (results, options, regex, templateFile, summary = false) {
    return {
        file: path.join(process.cwd(), options.output_folder, getReportName(results, options, summary)),
        data: scrubReportData(regex, results),
        templateFile: templateFile,
    };
}

module.exports = {

    write : function(results, options, done) {
        const opts = {encoding: "utf8"};

        // Filepath to templates
        const templateFiles = fs.readdirSync(path.join(rootDir), opts).filter(path => path.match("^.*\.hbs$"));

        // Removes all ANSI encoding
        const regexNoANSI = /\\u001b\[\d+[0-9|;]*m/g, regexNoTags = /<[\D]+|[\d]*>/g; //removes tags

        const [summary, full] = templateFiles;
        const reports = [];

        reports.push(scrubbedResults(results, options, regexNoANSI, full));
        reports.push(scrubbedResults(reports[0].data, options, regexNoTags, summary, true));

        // merge the template with the test results data
        reports.forEach(report => {
            let html = handlebars.compile(report.templateFile)({
                results: report.data,
                options: options,
                timestamp: new Date().toString(),
                browser: options.filename_prefix.split('_').join(' ')
            });
            // write the html to a file
            try {
                opts.flag = "w+";
                fs.writeFileSync(report.file, html, opts);
                console.log('Report generated: ' + report.file);
            }catch (err) {
                throw err;
            }
        });
        done();
    }
};