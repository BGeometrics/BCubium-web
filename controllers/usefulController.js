
var backup = "./scripts/backup.sh"; 

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
        console.log('Backup done');
        res.render('index_home.pug', { usefull_message: 'Backup done'});
    }); 
};
