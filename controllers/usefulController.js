
var backup = "./scripts/backup.sh"; 
var port_redirect = "./scripts/port_redirect_add.sh"; 

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

exports.port_home = function(req, res) {
   console.log("port home");
   res.render('port_home.pug');
};

exports.port_redirect = function(req, res) {
    console.log("port redirect");
    var execute = port_redirect + " " + req.body.port_source + " " + req.body.port_target;
    console.log(execute);

    const { exec } = require("child_process");

    exec(execute, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log('Redirect done');
        res.render('port_home.pug', { usefull_message: 'Port redirect done'});
    }); 
};
