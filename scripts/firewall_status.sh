#!/bin/bash

SERVICE=ufw

STATUS=$(sudo systemctl is-active $SERVICE)

if [[ $STATUS == *"inactive"* ]]; then
  echo -n "KO. $STATUS"
else
  echo -n "OK. $STATUS"
fi

