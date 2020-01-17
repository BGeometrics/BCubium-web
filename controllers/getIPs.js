var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('/etc/bitcoin/bitcoin.conf');

var ip_internal_script = "./scripts/IP_internal.sh";
var ip_external_script = "./scripts/IP_external.sh";
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";


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
