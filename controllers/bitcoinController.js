// Display detail page for Bitcoin.

var title = 'Bcube';
var bitcoinEnable = "./scripts/bitcoin_enable.sh";  
var bitcoinDisable = "./scripts/bitcoin_disable.sh"; 
var bitcoinStatus = "./scripts/bitcoin_status.sh"; 
var bitcoin_restart = "./scripts/bitcoin_restart.sh"; 
var bitcoin_op_return = "./scripts/bitcoin_op_return.sh"; 
var bitcoin_load_wallet = "./scripts/bitcoin_load_wallet.sh"; 
var bitcoin_create_wallet = "./scripts/bitcoin_create_wallet.sh"; 
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
		router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
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
		router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
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
		router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
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
		router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.bitcoin_restart = function(req, res) {
    console.log("Execute: " +  bitcoin_restart);
    const { execSync } = require("child_process");
    var ret = execSync(bitcoin_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
		bitcoin_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
		router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};

exports.bitcoin_opreturn_home = function(req, res) {
    res.render('bitcoin_load_wallet.pug');
};

exports.bitcoin_opreturn_message = function(req, res) {
    var execute = bitcoin_op_return + " " + req.body.wallet + " \"" + req.body.wallet_password + "\" "  
          + req.body.amount + " " + req.body.fee + " \"" + req.body.text + "\" " + req.body.address_target;
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    ret = ret.substring(ret.indexOf("{\""));
    console.log("Return: " + ret);
    var ret_obj = JSON.parse(ret);

    res.render('bitcoin_opreturn_home.pug', {bitcoin_opreturn: ret_obj});
};

exports.bitcoin_load_wallet = function(req, res) {
    var execute = bitcoin_load_wallet + " \"" + req.body.wallet + "\" ";
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    ret = ret.substring(ret.indexOf("{\""));
    console.log("Return: " + ret);
    var ret_obj = JSON.parse(ret);

    res.render('bitcoin_opreturn_home.pug', {bitcoin_opreturn: ret_obj});
};

exports.bitcoin_create_wallet = function(req, res) {
    var execute = bitcoin_create_wallet + " \"" + req.body.create_wallet + "\" \"" + req.body.password + "\" ";
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    ret = ret.substring(ret.indexOf("{\""));
    console.log("Return: " + ret);
    var ret_obj = JSON.parse(ret);

    res.render('bitcoin_opreturn_home.pug', {bitcoin_opreturn: ret_obj});
};

