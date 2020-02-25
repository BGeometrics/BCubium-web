
var backup = "./scripts/backup.sh"; 
var port_redirect_add = "./scripts/port_redirect_add.sh"; 
var port_redirect_list = "./scripts/port_redirect_list.sh"; 
var port_redirect_delete = "./scripts/port_redirect_delete.sh"; 
var upnp_add = "./scripts/upnp_add.sh"; 
var upnp_list = "./scripts/upnp_list.sh"; 
var upnp_delete = "./scripts/upnp_delete.sh"; 
var router_open = "./scripts/router_open.sh"; 
var password_change = "./scripts/password_change.sh"; 
var reboot_node = "./scripts/reboot_node.sh"; 
var glances_start = "./scripts/glances_start.sh"; 
var web_port = "4444";

const url = require('url');
const utilities = require('./utilities');

exports.backup_home = function(req, res) {
    console.log('Backup');
    const { exec } = require("child_process");
    exec(backup, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log('Execute: ' + backup);
        var url_backup = 'https://' + utilities.get_ip_internal() + ':' + web_port + '/backup.zip';
        console.log('Backup done ' + url_backup);
	      res.render('backup_home.pug', {backup_message: url_backup, usefull_message: 'Backup done',
			  user: utilities.get_user(), password: utilities.get_password()});
    }); 
}

exports.port_home = function(req, res) {
    console.log("port_redirect_list:" + utilities.get_ports_redirect(req, res));
    res.render('port_home.pug', { port_redirect_list: utilities.get_ports_redirect(req, res)});
};

exports.port_redirect_add = function(req, res) {
    var execute = port_redirect_add + " " + req.body.port_internal + " " + req.body.port_external;
    console.log("Execute: " + execute);

    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    res.render('port_home.pug', { usefull_message: 'Port redirect done', 
		 port_redirect_list: utilities.get_ports_redirect(req, res)}
    );
};

exports.port_redirect_delete = function(req, res) {
    var execute = port_redirect_delete + " " + req.query.port_internal + " " + req.query.port_external;
    console.log("Execute: " + execute);

    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    console.log('Delete redirect port done. ' +  req.query.port_external + ' ' + req.query.port_internal);
    res.render('port_home.pug', { usefull_message: 'Delete redirect port done ',
		 port_redirect_list: utilities.get_ports_redirect(req, res)});
};

exports.upnp_home = function(req, res) {
    var upnp_rules = utilities.get_upnp_rules();
    console.log("upnp_home upnp_rules: " + upnp_rules);
    res.render('upnp_home.pug', { upnp_rules: upnp_rules});
};

exports.upnp_add = function(req, res) {
    var execute = upnp_add + " " + req.body.external_port + " " + req.body.internal_port;
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    var upnp_rules = utilities.get_upnp_rules();
    console.log("upnp_rules: " + upnp_rules);
    res.render('upnp_home.pug', { usefull_message: 'UPnP rule done',
                 upnp_rules: upnp_rules});
};

exports.upnp_delete = function(req, res) {
    var execute = upnp_delete + " " + req.query.external_port;
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    console.log('Delete redirect port done. ' + req.query.external_port);
    var upnp_rules = utilities.get_upnp_rules();
    res.render('upnp_home.pug', { usefull_message: 'Delete UPnP rule',
                 upnp_rules: upnp_rules});
};

exports.system_ports_home = function(req, res) {
    var system_ports = utilities.get_system_ports();
    res.render('system_ports.pug', { system_ports: system_ports});
};

exports.graphics_home = function(req, res) {
    res.render('graphics_home.pug');
};

exports.router_open = function(req, res) {
    var execute = router_open + " 80" ;
    console.log("Execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    if (ret.substring(0,2) == 'KO') {
       ip_internal = utilities.get_ip_internal();
       ip_external = utilities.get_ip_external();

       console.log("Ret: " + ret);
       res.render('index_home.pug', {ip_internal: ip_internal, ip_external: ip_external,
                system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password(),
                system_info: utilities.get_system_info(), internet_connection: utilities.internet_connection(),
                router_connection: utilities.router_connection(), bitcoin_connection: utilities.bitcoin_connection(       )});
    }
    else {
       var url = 'http://' + ret + '/'; 
       console.log('Ret: '+ url);
       res.redirect(url);
    }
};

exports.settings_home = function(req, res) {
    res.render('settings_home.pug');
};

exports.password_change = function(req, res) {
    var execute = password_change + " " + req.body.password_current  + " " + req.body.password_new +  " " + req.body.password_new_confirm;
    console.log("execute: " + execute);
    const { execSync } = require("child_process");
    var ret = execSync(execute).toString();
    res.render('settings_home.pug');
};

exports.reboot_node = function(req, res) {
    console.log("execute: " + reboot_node);
    const { execSync } = require("child_process");
    var ret = execSync(reboot_node).toString();
    res.render('settings_home.pug');
};

exports.glances_start = function(req, res) {
    var execute = glances_start + " " + 120;
    console.log("execute: " + execute);

    const { exec } = require("child_process");
    exec(execute, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.redirect('http://' +  utilities.get_ip_internal() + ':61208/');
    });

    setTimeout(function() {
       console.log('hello world!');
       res.redirect('http://' +  utilities.get_ip_internal() + ':61208/');
    }, 5000);
};

