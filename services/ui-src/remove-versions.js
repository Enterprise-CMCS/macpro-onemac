const fs = require('fs');
const path = require('path');

// Define the directory of the build output
const buildDir = path.join(__dirname, 'build', 'static', 'js');

// Define the regular expression to match the version pattern
const regex = /^4\.\d{1,2}\.\d{1,2}$/;

// Function to remove the version from files
const removeVersionFromFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      const filePath = path.join(dir, file);

      // Check if the file is a JavaScript file
      if (file.endsWith('.js')) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) throw err;

          // Replace the version pattern
          const result = data.replace(regex, '');

          // Write the modified content back to the file
          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) throw err;
            console.log(`Removed version from ${file}`);
          });
        });
      }
    });
  });
};

removeVersionFromFiles(buildDir);
