const fs = require('fs');
const path = require('path');

// Define the directory of the build output
const buildDir = path.join(__dirname, 'build', 'static', 'js');

// Function to remove the version from files
const removeVersionFromFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);

      // Check if the file is a JavaScript file
      if (file.endsWith('.js')) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return;
          }

          // Replace the version pattern only if it matches the Bn.VERSION line
          const regex = /(Bn\.VERSION=")([4-9]\.\d{2}\.\d{2})(")/;
          const result = data.replace(regex, 'Bn.VERSION=""');

          if (data !== result) {
            console.log(`Updated content of ${file}:`);
          } else {
            console.log(`No version found in ${file}`);
          }
          
          // Write the modified content back to the file
          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              console.log(`Version removed from ${file}`);
            }
          });
        });
      }
    });
  });
};

removeVersionFromFiles(buildDir);



