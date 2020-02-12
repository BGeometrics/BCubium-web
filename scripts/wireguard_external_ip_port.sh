#!/bin/bash

SERVICE=wireguard
PORT=28165
FILE="/etc/wireguard/client.conf"

if [[ -n "$1" ]] && [[ $1 =~ ^[0-9]+$ ]]; then
    PORT=$1
else
    exit 0
fi

EXTERNAL_IP=$(./scripts/IP_external.sh)
sed -i "s/Endpoint\ .*/Endpoint\ =\ $EXTERNAL_IP:$PORT/g" $FILE

# Generate QR
qrencode -t PNG -o ./public/bcube-wg0.png < $FILE

