#!/bin/bash

SERVICE=ufw

sudo systemctl restart $SERVICE
STATUS=$(sudo systemctl is-active $SERVICE)

if [[ $STATUS == *"inactive"* ]]; then
  echo -n "KO. Restart $SERVICE service. $STATUS"
else
  echo -n "OK. Restart $SERVICE service. $STATUS"
fi


