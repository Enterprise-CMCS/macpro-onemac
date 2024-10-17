const fs = require('fs');
const path = require('path');

// Define the directory of the build output
const buildDir = path.join(__dirname, 'build', 'static', 'js');

// Define the regular expression to match the version pattern 4.xx.yy
// where xx is 17 or above and yy is any two-digit number
const regex = /4\.(1[7-9]|[2-9][0-9])\.\d{2}/g; // Matches versions like 4.17.01, 4.25.99

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
          const result = data.replace(regex, ''); // Remove matched versions

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
