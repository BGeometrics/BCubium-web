// Display detail page for lnd.

var title = 'cubeBitcoin';
var lndStart = "./scripts/lnd_start.sh";  
var lndStop = "./scripts/lnd_stop.sh"; 
var lndEnable = "./scripts/lnd_enable.sh";  
var lndDisable = "./scripts/lnd_disable.sh"; 
var lndStatus = "./scripts/lnd_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 

exports.lnd_start = function(req, res) {
    const { exec } = require("child_process");

    exec(lndStart, (error, stdout, stderr) => {
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

exports.lnd_stop = function(req, res) {
    const { exec } = require("child_process");

    exec(lndStop, (error, stdout, stderr) => {
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

exports.lnd_enable = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
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
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
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
    ip_internal = utilities.get_ip_internal();
    ip_external = utilities.get_ip_external();    
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
        var ret = `${stdout}`;
        var stat = ret.substring(0,2);
        console.log(ret);
        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, lnd_message: ret, stat: stat});
    });     
};
