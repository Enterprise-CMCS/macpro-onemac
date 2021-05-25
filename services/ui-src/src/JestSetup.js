const fs = require('fs');

module.exports = async () => {

    fs.copyFile('../common/mockconfig.js', 'src/utils/config.js', (err) => {
            if (err) throw err;
        console.log('Mock Config File was copied to destination');
    });
    fs.copyFile('../common/getUser.json', 'src/utils/getUser.json', (err) => {
        if (err) throw err;
        console.log('Copied Jest Mock getUser.json File was copied to destination');
    });
    console.log("Jest -> Setup Started")
}

