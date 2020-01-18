
var title = 'cubeBitcoin';
var backup = "dir"; // "./backup.sh"

exports.backup = function(req, res) {
    const { exec } = require("child_process");

    exec(backup, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, backup_message: `${stdout}`});
    }); 
};
