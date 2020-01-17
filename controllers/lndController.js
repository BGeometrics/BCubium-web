// Display detail page for lnd.

var title = 'My home node';
var lndEnable = "./scripts/lnd_enable.sh";  
var lndDisable = "./scripts/lnd_disable.sh"; 
var lndStatus = "./scripts/lnd_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const getIPs = require('./getIPs'); 


exports.lnd_enable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(lndEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, lnd_message: `${stdout}`});
    }); 
};

exports.lnd_disable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(lndDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, lnd_message: `${stdout}`});
    }); 
};

exports.lnd_status = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
    const { exec } = require("child_process");

    exec(lndStatus, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, lnd_message: `${stdout}`});
    });     
};
