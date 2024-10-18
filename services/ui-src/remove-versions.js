const fs = require('fs');
const path = require('path');

// Define the directory of the build output
const buildDir = path.join(__dirname, 'build', 'static', 'js');

// Define the regular expression to match the version pattern
// Specifically targeting the line with Bn.VERSION
const regex = /(Bn\.VERSION = ")(4\.(1[7-9]|[2-9][0-9])\.\d{2}|5\.\d{2}\.\d{2}|[6-9]\.\d{2}\.\d{2})(")/g;

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

          // Replace the version pattern only after Bn.VERSION = "
          const result = data.replace(regex, '$1"$4'); // Keep the surrounding parts and replace the version

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

