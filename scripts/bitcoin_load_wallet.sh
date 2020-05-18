#!/bin/bash

if [ -n "$1" ]; then
   WALLET=$1
else
   WALLET="wallet"
fi

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"

$MY_WALLET loadwallet $WALLET
BALANCE=$($MY_WALLET getbalance)
ADDRESS=$($MY_WALLET getaddressesbylabel "" | sed -n 2p | sed 's/.\{4\}$//' | cut -c 4-)

UTXO_TXID=$($MY_WALLET listunspent | jq -r '.[] | .txid' | sort -nr | head -n1)
AMOUNT_TXID=$($MY_WALLET listunspent | jq -r '.[] | .amount' | sort -nr | head -n1)
STATUS="OK"

echo -n "{\"wallet\":\"$WALLET\", \"balance\":\"$BALANCE\", \"address\":\"$ADDRESS\", \"txid\":\"$UTXO_TXID\", \"amount_txid\":\"$AMOUNT_TXID\", \"status\":\"$STATUS\"}"

