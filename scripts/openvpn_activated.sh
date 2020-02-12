#!/bin/bash

SERVICE=openvpn

STATUS=$(systemctl status $SERVICE | grep "; enabled;")

if [[ $STATUS != "" ]]; then
  echo -n "OK. $STATUS"
else
  echo -n "KO. $STATUS"
fi

