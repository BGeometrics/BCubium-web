// Display detail page for btcrpcexplorer

var title = 'cubeBitcoin';
var btcrpcexplorerStart = "./scripts/btcrpcexplorer_start.sh";
var btcrpcexplorerStop = "./scripts/btcrpcexplorer_stop.sh";
var btcrpcexplorerEnable = "./scripts/btcrpcexplorer_enable.sh";
var btcrpcexplorerDisable = "./scripts/btcrpcexplorer_disable.sh";
var btcrpcexplorerStatus = "./scripts/btcrpcexplorer_status.sh";
var btcrpcexplorer_restart = "./scripts/btcrpcexplorer_restart.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities');


exports.btcrpcexplorer_start = function(req, res) {
    const { exec } = require("child_process");

    exec(btcrpcexplorerStart, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
   });
};

exports.btcrpcexplorer_stop = function(req, res) {
    const { exec } = require("child_process");

    exec(btcrpcexplorerStop, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
   });
};

exports.btcrpcexplorer_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(btcrpcexplorerEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.btcrpcexplorer_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();
    const { exec } = require("child_process");

    exec(btcrpcexplorerDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.btcrpcexplorer_status = function(req, res) {
    
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();
    const { exec } = require("child_process");

    exec(btcrpcexplorerStatus, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        var ret = `${stdout}`;
        console.log(ret);
	res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.btcrpcexplorer_home = function(req, res) {
    console.log('exports.btcrpcexplorer_home');
    var auth = 'Basic ' + Buffer.from(utilities.get_user() + ':' + utilities.get_password()).toString('base64');
    ip_internal = utilities.get_ip_internal();
    console.log('Authorization: ' + auth);
    res.header('Authorization', auth);
    res.redirect('http://' + ip_internal + ':3002/');
};

exports.btcrpcexplorer_restart = function(req, res) {
    console.log("Execute: " + btcrpcexplorer_restart);
    const { execSync } = require("child_process");
    var ret = execSync(btcrpcexplorer_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
                btcrpcexplorer_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};
