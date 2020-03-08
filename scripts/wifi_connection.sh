#!/bin/bash

WIFI_SSID=$(nmcli con show -a | grep wlan0 | awk '{print $1}')

if [[ $WIFI_SSID != "" ]]; then
    echo "{\"connection\":\"$WIFI_SSID\"}"
else
    echo "{\"connection\":\"Off\"}"
fi


