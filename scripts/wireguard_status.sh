#!/bin/bash

SERVICE=wg-quick@wg0

STATUS=$(systemctl is-active $SERVICE)

if [[ $STATUS == *"inactive"* ]]; then
  echo -n "KO. $STATUS"
else
  echo -n "OK. $STATUS"
fi

