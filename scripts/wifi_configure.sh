#!/bin/bash

FILE_CONF_WIFI=/etc/wpa_supplicant/wpa_supplicant.conf

echo "" > $FILE_CONF_WIFI 
cat <<EOF >> $FILE_CONF_WIFI
network={
  ssid="$1"
  psk="$2"
}
EOF

sudo /bin/systemctl restart network-manager
