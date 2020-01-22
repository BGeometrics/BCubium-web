// Display detail page for tor.

var title = 'cubeBitcoin';
var torEnable = "./scripts/tor_enable.sh";
var torDisable = "./scripts/tor_disable.sh";
var torStatus = "./scripts/tor_status.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities');

exports.tor_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(torEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, tor_message: `${stdout}`});
    }); 
};

exports.tor_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(torDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, tor_message: `${stdout}`});
    }); 
};

exports.tor_status = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(torStatus, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, tor_message: `${stdout}`});
    });     
};
