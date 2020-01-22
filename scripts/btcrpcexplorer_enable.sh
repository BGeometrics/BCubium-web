#!/bin/bash

SERVICE=btc-rpc-explorer
STATUS=$(systemctl is-active $SERVICE)
ACTIVE=active

if [ "$STATUS" == "$ACTIVE" ] ; then
        echo -n "$SERVICE process is already running"
else
	echo "start"
   	sudo systemctl start $SERVICE
        sudo systemctl enable $SERVICE
        systemctl status $SERVICE | grep Active
fi
