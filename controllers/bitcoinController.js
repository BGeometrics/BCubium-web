// Display detail page for Bitcoin.

var title = 'cubeBitcoin';
var bitcoinEnable = "./scripts/bitcoin_enable.sh";  
var bitcoinDisable = "./scripts/bitcoin_disable.sh"; 
var bitcoinStatus = "./scripts/bitcoin_status.sh"; 
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const getIPs = require('./getIPs');

exports.bitcoin_home = function(req, res) {
   ip_internal = getIPs.get_ip_internal();
   ip_external = getIPs.get_ip_external();    
   var fs_int = require("fs");
   fs_int.readFile(ip_intenal_file, "utf-8", (err, ip_internal_data) => {
       ip_internal = ip_internal_data;
       console.log(ip_internal);
   });

   var fs_ext = require("fs");
   fs_ext.readFile(ip_external_file, "utf-8", (err, ip_external_data) => {
       ip_external = ip_external_data;
       console.log(ip_external);
   });

   rpcuser = getIPs.get_rpcuser();
   rpcpassword = getIPs.get_rpcpassword();

   res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, rpcuser: rpcuser, rpcpassword: rpcpassword });
};

exports.bitcoin_enable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
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

        rpcuser = getIPs.get_rpcuser();
        rpcpassword = getIPs.get_rpcpassword();

        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external, 
		rpcuser: rpcuser, rpcpassword: rpcpassword,
		bitcoin_message: `${stdout}`});
    }); 
};

exports.bitcoin_disable = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
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
        rpcuser = getIPs.get_rpcuser();
        rpcpassword = getIPs.get_rpcpassword();

        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		rpcuser: rpcuser, rpcpassword: rpcpassword,
		bitcoin_message: `${stdout}`});
    }); 
};

exports.bitcoin_status = function(req, res) {
    ip_internal = getIPs.get_ip_internal();
    ip_external = getIPs.get_ip_external();    
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
        console.log(`stdout: ${stdout}`);
        rpcuser = getIPs.get_rpcuser();
        rpcpassword = getIPs.get_rpcpassword();

        res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		rpcuser: rpcuser, rpcpassword: rpcpassword,
		bitcoin_message: `${stdout}`});
    });     
};

