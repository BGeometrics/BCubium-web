#!/bin/bash

if [ -n "$1" ]; then
   WALLET=$1
else
   WALLET="mywallet"
fi

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"

$MY_WALLET loadwallet $WALLET
BALANCE=$($MY_WALLET getbalance)
ADDRESS=$($MY_WALLET getaddressesbylabel "" | sed -n 2p | cut -c 4-37)
STATUS="OK"

echo -n "{\"wallet\":\"$WALLET\", \"balance\":\"$BALANCE\", \"address\":\"$ADDRESS\", \"status\":\"$STATUS\"}"

