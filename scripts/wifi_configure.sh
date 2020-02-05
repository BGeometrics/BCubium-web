#!/bin/bash

FILE_CONF_WIFI=/etc/wpa_supplicant/wpa_supplicant.conf
DATE=$(date +%F)

#cp /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant.conf-$DATE
#cat <<EOF > $FILE_CONF_WIFI
#network={
#  ssid="$1"
#  psk="$2"
#}
#EOF

sudo /usr/bin/wpa_passphrase $1 $2 > /etc/wpa_supplicant/wpa_supplicant.conf
sudo /usr/bin/nmcli device wifi connect $1 password $2
sudo /bin/systemctl restart network-manager

#sudo dhclient wlan0 -r
