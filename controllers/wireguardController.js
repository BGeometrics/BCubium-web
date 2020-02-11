// Display detail page for wireguard.

var title = 'Bcube';
var wireguardStart = "./scripts/wireguard_start.sh";  
var wireguardStop = "./scripts/wireguard_stop.sh"; 
var wireguardEnable = "./scripts/wireguard_enable.sh";  
var wireguardDisable = "./scripts/wireguard_disable.sh"; 
var wireguardStatus = "./scripts/wireguard_status.sh"; 
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 

exports.wireguard_start = function(req, res) {
    const { exec } = require("child_process");

    exec(wireguardStart, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, 
		wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection()});
    });
};

exports.wireguard_stop = function(req, res) {
    const { exec } = require("child_process");

    exec(wireguardStop, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection()});
    });
};

exports.wireguard_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(wireguardEnable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection()});
    }); 
};

exports.wireguard_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(wireguardDisable, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, 
		wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection()});
    }); 
};

exports.wireguard_status = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(wireguardStatus, (error, stdout, stderr) => {
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection()});
    });     
};

exports.wireguard_home = function(req, res) {
   ip_internal = utilities.get_ip_internal();
   ip_external = utilities.get_ip_external();    
   var message = "";
	
   res.render('wireguard_home.pug', {ip_internal: ip_internal, ip_external: ip_external,
		user: utilities.get_user(), password: utilities.get_password(), 
   		wireguard_message: message});
};

