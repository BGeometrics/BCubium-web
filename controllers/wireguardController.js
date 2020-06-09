
var title = 'Bcube';
var wireguardStart = "./scripts/wireguard_start.sh";  
var wireguardStop = "./scripts/wireguard_stop.sh"; 
var wireguardEnable = "./scripts/wireguard_enable.sh";  
var wireguardDisable = "./scripts/wireguard_disable.sh"; 
var wireguardStatus = "./scripts/wireguard_status.sh"; 
var wireguard_restart = "./scripts/wireguard_restart.sh";
var wireguard_set_port = "./scripts/wireguard_external_ip_port.sh";
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });
};

exports.wireguard_enable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.wireguard_disable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.wireguard_status = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            wireguard_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.wireguard_home = function(req, res) {
    var execute = wireguard_set_port + " " + utilities.get_ip_external();
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();

    res.render('wireguard_home.pug', {ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
        user: utilities.get_user(), password: utilities.get_password()});
}

exports.wireguard_set_publicIP_port = function(req, res) {
   var ip = utilities.get_ip_external();

   if (req.body.ip != null &&  req.body.ip != "") {
      ip = req.body.ip;
   }

   console.log("Port: " + req.body.port);
   console.log("Public IP: " + ip);

   var execute = wireguard_set_port + " " + ip + " " + req.body.port;
   console.log("Execute: " + execute);

   const { execSync } = require("child_process");
   var ret = execSync(execute).toString();

   res.render('wireguard_home.pug', {ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
	       user: utilities.get_user(), password: utilities.get_password()});
};

exports.wireguard_restart = function(req, res) {
    console.log("Execute: " +  wireguard_restart);
    const { execSync } = require("child_process");
    var ret = execSync(wireguard_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
                wireguard_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};

exports.wireguard_update_publicIP = function(req, res) {
    var execute = wireguard_set_port + " " + utilities.get_ip_external();
    console.log("Execute: " + execute);

    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();

    res.render('wireguard_home.pug', {ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
           user: utilities.get_user(), password: utilities.get_password(), wireguard_message: 'Scan the QR again or load the WireGuard client file'});
};
