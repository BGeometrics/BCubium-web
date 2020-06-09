
var title = 'cubeBitcoin';
var lndStart = "./scripts/lnd_start.sh";  
var lndStop = "./scripts/lnd_stop.sh"; 
var lndEnable = "./scripts/lnd_enable.sh";  
var lndDisable = "./scripts/lnd_disable.sh"; 
var lndStatus = "./scripts/lnd_status.sh"; 
var lnd_restart = "./scripts/lnd_restart.sh";  
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var seed_file = "/etc/Bgeometrics/seed.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 
var lnd_wallet_delete = "./scripts/lnd_wallet_delete.sh"; 
var lnd_wallet_create = "./scripts/lnd_wallet_create.sh"; 
var lnd_wallet_backup = "./scripts/lnd_wallet_backup.sh"; 
var web_port = "4444";


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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            lnd_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            lnd_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });
};

exports.lnd_enable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            lnd_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.lnd_disable = function(req, res) {
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
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            lnd_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    }); 
};

exports.lnd_status = function(req, res) {
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
        console.log(ret);
        res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
		            lnd_message: `${stdout}`, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
    });     
};

exports.lnd_home = function(req, res) {
   var seed = utilities.read_text_file(seed_file);
   console.log('seed: ' + seed);
   res.render('lnd_home.pug', {'seed': seed, 'password_wallet': utilities.get_lnd_pass(),
                user: utilities.get_user(), password: utilities.get_password()});
};

exports.lnd_wallet_delete = function(req, res) {
   const { execSync } = require("child_process");
   console.log("Execute: " + lnd_wallet_delete);
   var ret = execSync(lnd_wallet_delete).toString();
   res.render('lnd_home.pug', {'lnd_message': ret});
};

exports.lnd_wallet_create = function(req, res) {
    const { execSync } = require("child_process");
    console.log("Execute: " + lnd_wallet_create);
    var ret = execSync(lnd_wallet_create).toString();
    console.log("ret: " + ret);
    var seed = utilities.read_text_file(seed_file);
    var stat;
    if (ret.substring(0,2) == 'OK') {
       stat = ret.substring(0,2);
    }
    console.log("stat: " + stat);
    res.render('lnd_home.pug', {'seed': seed, 'lnd_message': ret, 'stat': stat,
                user: utilities.get_user(), password: utilities.get_password(),
		            'password_wallet': utilities.get_lnd_pass()});
};

exports.lnd_wallet_backup = function(req, res) {
    const { execSync } = require("child_process");
    console.log("Execute: " + lnd_wallet_backup);
    var ret = execSync(lnd_wallet_backup).toString();
    var seed = utilities.read_text_file(seed_file);
    var url_backup = 'https://' + utilities.get_ip_internal() + ':' + web_port + '/lnd_backup.zip';
    console.log('Backup LND done ' + url_backup);
    res.render('lnd_home.pug', {'seed': seed, 'lnd_backup': url_backup, 'lnd_message': 'Backup keys done',
   	password_wallet: utilities.get_lnd_pass(), 
        user: utilities.get_user(), password: utilities.get_password(),
        ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external()});
};

exports.lnd_restart = function(req, res) {
    console.log("Execute: " +  lnd_restart);
    const { execSync } = require("child_process");
    var ret = execSync(lnd_restart).toString();
    res.render('index_home.pug', { title: title, ip_internal: utilities.get_ip_internal(), ip_external: utilities.get_ip_external(),
                lnd_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(), 
                wifi_connection: utilities.wifi_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection()});
};

exports.lnd_wallet_home = function(req, res) {
    ip_internal = utilities.get_ip_internal();
    res.redirect('http://' + ip_internal + ':3003/rtl/lnd/home');
};
