#!/bin/bash

SERVICE=electrs

#STATUS=$(systemctl status $SERVICE | grep "; disabled;")
STATUS=$(systemctl status $SERVICE | grep "; enabled;")

if [[ $STATUS != "" ]]; then
  echo -n "OK. $STATUS"
else
  echo -n "KO. $STATUS"
fi

