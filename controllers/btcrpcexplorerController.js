// Display detail page for btcrpcexplorer

var title = 'cubeBitcoin';
var btcrpcexplorerEnable = "./scripts/btcrpcexplorer_enable.sh";
var btcrpcexplorerDisable = "./scripts/btcrpcexplorer_disable.sh";
var btcrpcexplorerStatus = "./scripts/btcrpcexplorer_status.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const getIPs = require('./getIPs');


exports.btcrpcexplorer_enable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
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
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();
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
    
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();
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
        console.log(`stdout: ${stdout}`);
	res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, btcrpcexplorer_message: `${stdout}`});
    });     
};
