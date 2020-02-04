#!/bin/bash

SERVICE=ufw

STATUS=$(sudo $SERVICE status | head -n 1)

if [[ $STATUS == *" inactive"* ]]; then
	echo "start"
        ./firewall_start.sh
   	sudo systemctl start $SERVICE
   	sudo systemctl enable $SERVICE
        sudo $SERVICE status | head -n 1 
else
        echo -n "$SERVICE process is already enabled"
fi
