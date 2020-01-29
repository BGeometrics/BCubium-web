// Display detail page for rtl.

var title = 'cubeBitcoin';
var rtlStart = "./scripts/rtl_start.sh";  
var rtlStop = "./scripts/rtl_stop.sh"; 
var rtlEnable = "./scripts/rtl_enable.sh";  
var rtlDisable = "./scripts/rtl_disable.sh"; 
var rtlStatus = "./scripts/rtl_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 

exports.rtl_start = function(req, res) {
    const { exec } = require("child_process");

    exec(rtlStart, (error, stdout, stderr) => {
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
		rtl_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
    });
};

exports.rtl_stop = function(req, res) {
    const { exec } = require("child_process");

    exec(rtlStop, (error, stdout, stderr) => {
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
		rtl_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
    });
};

exports.rtl_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(rtlEnable, (error, stdout, stderr) => {
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
		rtl_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
    }); 
};

exports.rtl_disable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(rtlDisable, (error, stdout, stderr) => {
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
		rtl_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
    }); 
};

exports.rtl_status = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
    const { exec } = require("child_process");

    exec(rtlStatus, (error, stdout, stderr) => {
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
		rtl_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
    });     
};
