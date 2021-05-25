const fs = require('fs');

module.exports = async () => {

    fs.copyFile('../common/origconfig.js', 'src/utils/config.js', (err) => {
        if (err) throw err;
        console.log('Original Config File was copied to destination');
    });
   /* fs.unlink('src/utils/getUser.json', (err) => {
        if (err) throw err;
        console.log('Removed getUser.Json testing Mock File');
    });*/
    console.log("Jest -> Tear Down Complete")
}

