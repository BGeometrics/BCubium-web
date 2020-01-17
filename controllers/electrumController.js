// Display detail page for electrum.

var title = 'My home node';
var electrumEnable = "./scripts/electrum_enable.sh"; 
var electrumDisable = "./scripts/electrum_disable.sh"; 
var electrumStatus = "./scripts/electrum_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const getIPs = require('./getIPs');


exports.electrum_enable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(electrumEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, electrum_message: `${stdout}`});
    }); 
};

exports.electrum_disable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(electrumDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, electrum_message: `${stdout}`});
    }); 
};

exports.electrum_status = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(electrumStatus, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, electrum_message: `${stdout}`});
    });     
};
