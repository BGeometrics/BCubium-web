var title = 'Bcube';
var wifi = require("node-wifi");
var wifi_configure = "./scripts/wifi_configure.sh";

exports.wifi_home = function(req, res) {
   console.log("Wifi home");

   wifi.getCurrentConnections(function(err, currentConnections) {
      if (err) {
         console.log(err);
      } 
      else {
         console.log(currentConnections);

         res.render('wifi_home.pug', {title: title, connections: currentConnections});
      }
   });
};

// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});
 

// Scan networks
exports.wifi_scan = function(req, res) {
  console.log("Wifi scan");
  wifi.scan(function(err, networks) {
    if (err) {
       console.log(err);
    } else {
       console.log(networks);
      /*
        networks = [
            {
              ssid: '...',
              bssid: '...',
              mac: '...', // equals to bssid (for retrocompatibility)
              channel: <number>,
              frequency: <number>, // in MHz
              signal_level: <number>, // in dB
              quality: <number>, // same as signal level but in %
              security: 'WPA WPA2' // format depending on locale for open networks in Windows
              security_flags: '...' // encryption protocols (format currently depending of the OS)
              mode: '...' // network mode like Infra (format currently depending of the OS)
            },
            ...
        ];
        */

        res.render('wifi_home.pug', {networks: networks, });
    }
  });
};

// Connect to a network
exports.wifi_connect = function(req, res) { 
  console.log("ssid: " + req.body.ssid);

  wifi.connect({ ssid: req.body.ssid, password: req.body.password }, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("Connected");
  });

  var execute = wifi_configure + " " + req.body.ssid  + " " + req.body.wifi_password;	
  console.log("execute: " + execute);
  const { execSync } = require("child_process");
  var ret = execSync(execute).toString();
  res.render('wifi_home.pug', { ssid: req.body.ssid });
};
 
// Disconnect from a network
// not available on all os for now
wifi.disconnect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Disconnected");
});
 
// Delete a saved network
// not available on all os for now
wifi.deleteConnection({ ssid: "ssid" }, function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Deleted");
});

// List the current wifi connections
wifi.getCurrentConnections(function(err, currentConnections) {
  if (err) {
    console.log(err);
  }
  console.log(currentConnections);
  /*
    // you may have several connections
    [
        {
            iface: '...', // network interface used for the connection, not available on macOS
            ssid: '...',
            bssid: '...',
            mac: '...', // equals to bssid (for retrocompatibility)
            channel: <number>,
            frequency: <number>, // in MHz
            signal_level: <number>, // in dB
            quality: <number>, // same as signal level but in %
            security: '...' //
            security_flags: '...' // encryption protocols (format currently depending of the OS)
            mode: '...' // network mode like Infra (format currently depending of the OS)
        }
    ]
    */
});
 
// All functions also return promise if there is no callback given
wifi
  .scan()
  .then(function(networks) {
    // networks
  })
  .catch(function(error) {
    // error
  });
