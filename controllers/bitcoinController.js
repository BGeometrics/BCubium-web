// Display detail page for Bitcoin.

var title = 'Bitcoin Cube';
var bitcoinEnable = "./scripts/bitcoin_enable.sh";  
var bitcoinDisable = "./scripts/bitcoin_disable.sh"; 
var bitcoinStatus = "./scripts/bitcoin_status.sh"; 
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities');

exports.bitcoin_home = function(req, res) {
   console.log('home');
   ip_internal = utilities.get_ip_internal();
   ip_external = utilities.get_ip_external();    

   console.log('system_status: ' + utilities.get_system_status());
   console.log('system_info: ' + utilities.get_system_info());

   res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, 
                system_status: utilities.get_system_status(), user: utilities.get_user(), password: utilities.get_password(), 
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
		router_connection: utilities.router_connection()});
};

exports.bitcoin_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(bitcoinEnable, (error, stdout, stderr) => {
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
		bitcoin_message: `${stdout}`, system_status: utilities.get_system_status(),
		user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
		router_connection: utilities.router_connection()});
    }); 
};

exports.bitcoin_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(bitcoinDisable, (error, stdout, stderr) => {
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
		bitcoin_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
		router_connection: utilities.router_connection()});
    }); 
};

exports.bitcoin_status = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(bitcoinStatus, (error, stdout, stderr) => {
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
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		bitcoin_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
		router_connection: utilities.router_connection()});
    });     
};

