
var title = 'Bcube';
var webconfigRestart = "./scripts/webconfig_restart.sh";  
var ip_intenal_file = "./scripts/ip_internal.txt";
var ip_external_file = "./scripts/ip_external.txt";
var ip_internal = "";
var ip_external = "";
const utilities = require('./utilities'); 

exports.webconfig_restart = function(req, res) {
   var ret = "Web Bcube restart in 5 seconds...";
   res.render('index_home.pug', { title: title, ip_internal: ip_internal, ip_external: ip_external,
                webconfig_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});

   setTimeout(function() {
      const { exec } = require("child_process");
      exec(webconfigRestart, (error, stdout, stderr) => {
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
                webconfig_message: ret, system_status: utilities.get_system_status(),
                user: utilities.get_user(), password: utilities.get_password()});
      });
   }, 5000);
};

