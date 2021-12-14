const fs = require("fs");

const utilities = require("../support/utilities/utilities");

const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on, config) => {
  on("file:preprocessor", cucumber());

  on("task", {
    generateWaiverNumber(filename) {
      const fullName = "fixtures/" + filename + ".txt";
      if (!fs.existsSync(fullName)) {
        fs.writeFileSync(
          fullName,
          new utilities().generateWaiverNumberWith5Characters("MD")
        );
      }
      return null;
    },
  });

  return config;
};
