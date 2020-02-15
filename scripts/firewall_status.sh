#!/bin/bash

SERVICE=ufw

STATUS=$(sudo systemctl status $SERVICE | head -n 1)

if [[ $STATUS == *" inactive"* ]]; then
  echo -n "KO. $STATUS"
else
  echo -n "OK. $STATUS"
fi

