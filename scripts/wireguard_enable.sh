#!/bin/bash

SERVICE=wg-quick@wg0
STATUS=$(systemctl is-active $SERVICE)
ACTIVE=active

sudo systemctl enable $SERVICE
if [ "$STATUS" != "$ACTIVE" ] ; then
    sudo systemctl start $SERVICE
fi
systemctl status $SERVICE | grep Active

