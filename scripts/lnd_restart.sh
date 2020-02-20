#!/bin/bash

SERVICE=lnd

sudo systemctl restart $SERVICE
STATUS=$(systemctl status $SERVICE | grep Active)

if [[ $STATUS == *" active"* ]]; then
  echo -n "OK. Restart $SERVICE service. $STATUS"
else
  echo -n "KO. $STATUS"
fi
