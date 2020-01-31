#!/bin/bash

SERVICE=webconfig
STATUS=$(systemctl is-active $SERVICE)

sudo systemctl restart $SERVICE &
echo "Restart OK"
