// Display detail page for firewall.

var title = 'cubeBitcoin';
var firewallEnable = "./scripts/firewall_enable.sh";  
var firewallDisable = "./scripts/firewall_disable.sh"; 
var firewallStatus = "./scripts/firewall_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 


exports.firewall_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(firewallEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, firewall_message: `${stdout}`});
    }); 
};

exports.firewall_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(firewallDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, firewall_message: `${stdout}`});
    }); 
};

exports.firewall_status = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(firewallStatus, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        var ret = `stdout: ${stdout}`;
        var stat = ret.substring(0,2);
        console.log(ret);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, firewall_message: ret, stat: stat});
    });     
};
