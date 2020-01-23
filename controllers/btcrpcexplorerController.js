// Display detail page for btcrpcexplorer

var title = 'cubeBitcoin';
var btcrpcexplorerStart = "./scripts/btcrpcexplorer_start.sh";
var btcrpcexplorerStop = "./scripts/btcrpcexplorer_stop.sh";
var btcrpcexplorerEnable = "./scripts/btcrpcexplorer_enable.sh";
var btcrpcexplorerDisable = "./scripts/btcrpcexplorer_disable.sh";
var btcrpcexplorerStatus = "./scripts/btcrpcexplorer_status.sh";
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`});
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`});
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`});
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`});
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
        var stat = ret.substring(0,2);
        console.log(ret);
	res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: ret, sta: stat});
    });     
};
