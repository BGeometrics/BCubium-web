var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('/etc/bitcoin/bitcoin.conf');
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


/* Get internal IP */
const { exec } = require("child_process");
exec(ip_internal_script, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    ip_internal = `${stdout}`;
    console.log("ip intenal: " + ip_internal);

    var fs = require('fs');
    var stream = fs.createWriteStream(ip_intenal_file);
    stream.once('open', function(fd) {
       stream.write(ip_internal);
       stream.end();
    });
});

/* Get external IP */
exec(ip_external_script, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    ip_external = `${stdout}`;
    console.log("ip external: " + ip_external);

    var fs = require('fs');
    var stream = fs.createWriteStream(ip_external_file);
    stream.once('open', function(fd) {
       stream.write(ip_external);
       stream.end();
    });
});


exports.get_ip_internal = function () {
   var fs_int = require("fs");
   fs_int.readFile(ip_intenal_file, "utf-8", (err, ip_internal_data) => {
       ip_internal = ip_internal_data;
       console.log(ip_internal);
   });

   return ip_internal;
};

exports.get_ip_external = function () {
   var fs_ext = require("fs");
   fs_ext.readFile(ip_external_file, "utf-8", (err, ip_external_data) => {
       ip_external = ip_external_data;
       console.log(ip_external);
   });

   return ip_external;

};

exports.get_rpcuser = function () {
   console.log("rpcuser: " + properties.get('rpcuser'));
   return properties.get('rpcuser');
};

exports.get_rpcpassword = function () {
   console.log("rpcpassword: " + properties.get('rpcpassword'));
   return properties.get('rpcpassword');
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

   var str = '{ "name": "John Doe", "age": 42 }';
   console.log("str: " + str); 
   var obj = JSON.parse(str);

   console.log("obj: " + obj); 
   console.log("obj: " + obj.name); 
   const { execSync } = require("child_process");
   var ret = execSync(system_status).toString();
   //var ret1 = '{"bitcoin":"OK", "lnd":"OK", "electrum":"KO", "btcrpcexplorer":"OK", "rtl":"OK", "tor":"OK", "firewall":"KO"}';
   console.log("get system status: " + ret); 
   var obj_status = JSON.parse(ret);
   console.log("obj_status: " + obj_status); 

   return obj_status;
};
