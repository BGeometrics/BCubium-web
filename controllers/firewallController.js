
var title = 'cubeBitcoin';
var firewallEnable = "./scripts/firewall_enable.sh";  
var firewallDisable = "./scripts/firewall_disable.sh"; 
var firewallStatus = "./scripts/firewall_status.sh"; 
var firewall_restart = "./scripts/firewall_restart.sh";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 


exports.firewall_enable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
 		            firewall_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.firewall_disable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            firewall_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.firewall_status = function(req, res) {
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
        var ret = `${stdout}`;
        console.log(ret);
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            firewall_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.firewall_restart = function(req, res) {
    console.log("Execute: " +  firewall_restart);
    const { execSync } = require("child_process");
    var ret = execSync(firewall_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
                firewall_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};
