// Display detail page for openvpn.

var title = 'Bcube';
var openvpnStart = "./scripts/openvpn_start.sh";  
var openvpnStop = "./scripts/openvpn_stop.sh"; 
var openvpnEnable = "./scripts/openvpn_enable.sh";  
var openvpnDisable = "./scripts/openvpn_disable.sh"; 
var openvpnStatus = "./scripts/openvpn_status.sh"; 
var openvpn_restart = "./scripts/openvpn_restart.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var openvpn_external_ip = "./scripts/openvpn_external_ip.sh";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 

exports.openvpn_start = function(req, res) {
    const { exec } = require("child_process");

    exec(openvpnStart, (error, stdout, stderr) => {
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
		            openvpn_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });
};

exports.openvpn_stop = function(req, res) {
    const { exec } = require("child_process");

    exec(openvpnStop, (error, stdout, stderr) => {
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
		            openvpn_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });
};

exports.openvpn_enable = function(req, res) {
    const { exec } = require("child_process");

    exec(openvpnEnable, (error, stdout, stderr) => {
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
		            openvpn_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.openvpn_disable = function(req, res) {
    const { exec } = require("child_process");

    exec(openvpnDisable, (error, stdout, stderr) => {
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
		            openvpn_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.openvpn_status = function(req, res) {
    const { exec } = require("child_process");

    exec(openvpnStatus, (error, stdout, stderr) => {
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
		            openvpn_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.openvpn_home = function(req, res) {
   console.log("Port: " + req.body.port);
   var message = "";
   if (req.body.port != "") {
      var execute = openvpn_external_ip + " " + req.body.port;
      console.log("Execute: " + execute);

      const { execSync } = require("child_process");
      var ret = execSync(execute).toString();
      message = "Add port";
   }
	
   res.render('openvpn_home.pug', {ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		user: utilities.get_user(), password: utilities.get_password(), 
   		openvpn_message: message});
};

exports.openvpn_restart = function(req, res) {
    console.log("Execute: " +  openvpn_restart);
    const { execSync } = require("child_process");
    var ret = execSync(openvpn_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
                openvpn_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};
