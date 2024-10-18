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

          console.log(`Original content of ${file}:`);
          console.log(data); // Log original content

          // Replace the exact version string
          const oldVersion = 'Bn.VERSION = "4.17.21"';
          const newVersion = 'Bn.VERSION = "NEW_VERSION"'; // Change this to your desired new version

          const result = data.replace(oldVersion, newVersion);

          if (data !== result) {
            console.log(`Updated content of ${file}:`);
            console.log(result); // Log updated content
          } else {
            console.log(`No matching version found in ${file}`);
          }

          // Write the modified content back to the file
          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) {
              console.error("Error writing file:", err);
            } else {
              console.log(`Version updated in ${file}`);
            }
          });
        });
      }
    });
  });
};

removeVersionFromFiles(buildDir);



