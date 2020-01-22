
var backup = "./scripts/backup.sh"; 
var port_redirect_add = "./scripts/port_redirect_add.sh"; 
var port_redirect_list = "./scripts/port_redirect_list.sh"; 
var port_redirect_delete = "./scripts/port_redirect_delete.sh"; 
const url = require('url');
const utilities = require('./utilities');

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
    res.render('port_home.pug', { port_redirect_list: utilities.get_ports_redirect(req, res)});
};

exports.port_redirect_add = function(req, res) {
    var execute = port_redirect_add + " " + req.body.port_source + " " + req.body.port_target;
    console.log("Execute: execute");

    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    res.render('port_home.pug', { usefull_message: 'Port redirect done', 
		 port_redirect_list: utilities.get_ports_redirect(req, res)}
    );
};

exports.port_redirect_delete = function(req, res) {
    console.log(req.query.port_source);
    var execute = port_redirect_delete + " " + req.query.port_source + " " + req.query.port_target;

    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    console.log('Delete redirect port done. ' +  + req.query.port_source + ' ' + req.query.port_target);
    res.render('port_home.pug', { usefull_message: 'Delete redirect port done ',
		 port_redirect_list: utilities.get_ports_redirect(req, res)});
};

