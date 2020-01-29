#!/bin/bash

ETH0=$(ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)

if [ "$ETH0" = "" ] ; then
   WLAN0=$(ip addr show wlan0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)
   echo -n $WLAN0  
else
   echo -n $ETH0  
fi

#echo -n $(ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1)
