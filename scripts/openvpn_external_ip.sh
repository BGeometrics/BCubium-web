#!/bin/bash

SERVICE=openvpn
PORT=443
FILE="../bcube.ovpn"

if [ -n "$1" ]; then
    PORT=$1
fi

EXTERNAL_IP=$(./scripts/IP_external.sh)

sed -i "s/remote\ .*/remote\ $EXTERNAL_IP\ $PORT/g" $FILE

