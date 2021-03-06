
var PropertiesReader = require('properties-reader');
var wifi = require("node-wifi");
var properties = PropertiesReader('/etc/bitcoin/bitcoin.conf');
var credentials_file = "/etc/Bgeometrics/credentials";
var auth_file = "/etc/Bgeometrics/auth_web";
var os = require("os");
var ip_internal_script = "./scripts/IP_internal.sh";
var ip_external_script = "./scripts/IP_external.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
var port_redirect_list = "./scripts/port_redirect_list.sh";
var upnp_rules = "./scripts/upnp_rules.sh";
var system_status = "./scripts/system_status.sh";
var system_info = "./scripts/system_info.sh";
var internet_connection = "./scripts/internet_connection.sh";
var router_connection = "./scripts/router_connection.sh";
var bitcoin_connection = "./scripts/bitcoin_connection.sh";
var wifi_connection = "./scripts/wifi_connection.sh";
var system_ports = "./scripts/system_ports.sh";
var seed_file = "/etc/Bgeometrics/seed.txt";
var lnd_pass = "/etc/Bgeometrics/lnd_pass.txt";
var op_return_txid = "../bcube_tx_id.txt";


exports.get_ip_external = function () {
   const { execSync } = require("child_process");
   console.log("Execute: " + ip_external_script);
   return execSync(ip_external_script).toString();
};

exports.get_ip_internal = function () {
   const { execSync } = require("child_process");
   console.log("Execute: " + ip_internal_script);
   return execSync(ip_internal_script).toString();
};

exports.get_rpcuser = function () {
   console.log("rpcuser: " + properties.get('rpcuser'));
   return properties.get('rpcuser');
};

exports.get_rpcpassword = function () {
   console.log("rpcpassword: " + properties.get('rpcpassword'));
   return properties.get('rpcpassword');
};

exports.get_user = function () {
   var user = "";
   const fs = require('fs');
   const data = fs.readFileSync(credentials_file, 'UTF-8');
   const lines = data.split(/\r?\n/);
   lines.forEach((line) => {
      if (line.indexOf('user=') >= 0 ) {
         user = line.substr(5,30); 
         console.log("user:  " + user); 
      }
   });

   return user;
};

exports.get_password = function () {
   var password = "";
   const fs = require('fs');
   const data = fs.readFileSync(credentials_file, 'UTF-8');
   const lines = data.split(/\r?\n/);
   lines.forEach((line) => {
      if (line.indexOf('password=') >= 0 ) {
         password = line.substr(9,30);
      }
   });

   return password;
};

exports.ports_redirect_list_convert=function(list_ports) {
   var res = "";
   var pos = list_ports.indexOf(",");
   var externals = list_ports.substring(0,pos);
   var internals = list_ports.substring(pos+1);

   var ports_external = externals.split(' ');
   var ports_internal = internals.split(' ');
   for (var i = 0; i < ports_external.length; i++) {
      res = res + "{ \'external\':\'" + ports_external[i] + "\', \'internal\': \'" + ports_internal[i] + "\'},";
   };
   console.log("res: " + res);
   res = res.substring(0, res.length - 1);
   var objectStringArray = (new Function("return [" + res + "];")());

   return objectStringArray;
};

exports.get_ports_redirect = function(req, res) {
   console.log("execute: " + port_redirect_list);
   const { execSync } = require("child_process");
   var list_ports = execSync(port_redirect_list).toString(); 
   return this.ports_redirect_list_convert(list_ports);
};

exports.get_upnp_rules = function(req, res) {
   var res = "";
   var external_port = "";
   console.log("Execute: " + upnp_rules);
   const { execSync } = require("child_process");
   var upnp_rules_out = execSync(upnp_rules).toString();
   console.log("upnp_rules_out: " + upnp_rules_out);
   var lines = upnp_rules_out.split(os.EOL);

   // Iterate legth -1 becasuse last line is null
   for (i = 0; i < lines.length-1; i++) {
      external_port = lines[i].substring(7,12).trim();
      console.log('external port: ' + external_port);
      res = res + "\{ \'line\':\"" + lines[i] + "\", \'external_port\': \"" + external_port + "\"},";
   };
   res = res.substring(0, res.length - 1);
   console.log("res: " + res);
   var objectStringArray = (new Function("return [" + res + "];")());

   return objectStringArray;
};

exports.get_system_status = function(req, res) {
   console.log("execute: " + system_status);

   const { execSync } = require("child_process");
   var ret = execSync(system_status).toString();
   console.log("get system status: " + ret); 
   ret = ret.replace(/\n$/, '')
   console.log("get system status: " + ret); 
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.get_system_info = function(req, res) {
   console.log("execute: " + system_info);

   const { execSync } = require("child_process");
   var ret = execSync(system_info).toString();
   ret = ret.replace(/\n$/, '')
   console.log("get system info: " + ret);
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.internet_connection = function(req, res) {
   console.log("execute: " + internet_connection);
   const { execSync } = require("child_process");
   var ret = execSync(internet_connection).toString();
   ret = ret.replace(/\n$/, '')
   console.log("internet connection: " + ret);
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.router_connection = function(req, res) {
   console.log("execute: " + router_connection);
   const { execSync } = require("child_process");
   var ret = execSync(router_connection).toString();
   ret = ret.replace(/\n$/, '')
   console.log('Router: ' + ret);
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.bitcoin_connection = function(req, res) {
   console.log("execute: " + bitcoin_connection);
   const { execSync } = require("child_process");
   var ret = execSync(bitcoin_connection).toString();
   console.log('bitcoin_connection: ' + ret);
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.get_system_ports = function(req, res) {
   console.log("execute: " + system_ports);
   const { execSync } = require("child_process");
   var ret = execSync(system_ports).toString();
   console.log("system_ports: " + ret);
   ret = ret.replace(/\n$/, '')
   console.log("system_ports: " + ret);
   var obj_status = JSON.parse(ret);

   return obj_status;
};

exports.read_file = function (file) {
   const fs = require('fs');
   var data = fs.readFileSync(file, 'utf8');
  
   return data;
};

exports.read_text_file = function () {
   return this.read_file(seed_file);
};

exports.get_lnd_pass = function () {
   return this.read_file(lnd_pass);
};

exports.wifi_connection = function(req, res) {
    console.log("execute: " + wifi_connection);
    const { execSync } = require("child_process");
    var ret = execSync(wifi_connection).toString();
    console.log('wifi_connection: ' + ret);
    var obj_status = JSON.parse(ret);

    return obj_status;
};

exports.get_op_return_txid = function () {
     var txids = this.read_file(op_return_txid);
     console.log("read file: " + txids);
     var txid_list = txids.split(os.EOL);
     var res = "";
     console.log("txid_list: " + txid_list);

     for( var i = 0; i < txid_list.length-1; ++i ) {
         console.log(txid_list[i]);
         res = res + "\{\'txid\':\"" + txid_list[i] + "\"},";
     }
     res = res.substring(0, res.length - 1);
     console.log("res: " + res);
     var objectStringArray = (new Function("return [" + res + "];")());
     
     return objectStringArray;
};

exports.get_auth = function () {
     var user = "";
     const fs = require('fs');
     var auth = fs.readFileSync(auth_file, 'UTF-8');
     auth = auth.replace(/\n$/, '')

     return auth;
};
