#!/bin/bash

SERVICE=openvpn
PORT=4702
FILE="./public/client.ovpn"

set -x

EXTERNAL_IP=$(./scripts/IP_external.sh)

sed -i "s/remote\ .*/remote\ $EXTERNAL_IP\ $PORT/g" $FILE

