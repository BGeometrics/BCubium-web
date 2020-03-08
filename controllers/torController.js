// Display detail page for tor.

var title = 'cubeBitcoin';
var torEnable = "./scripts/tor_enable.sh";
var torDisable = "./scripts/tor_disable.sh";
var torStatus = "./scripts/tor_status.sh";
var tor_restart = "./scripts/tor_restart.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities');

exports.tor_enable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            tor_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.tor_disable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            tor_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.tor_status = function(req, res) {
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
        var ret = `${stdout}`;
        console.log(ret);
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            tor_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.tor_restart = function(req, res) {
    console.log("Execute: " +  tor_restart);
    const { execSync } = require("child_process");
    var ret = execSync(tor_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
                tor_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};
