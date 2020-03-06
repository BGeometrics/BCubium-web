#!/bin/bash

if [ -n "$1" ]; then
   WALLET=$1
else
   WALLET="mywallet"
fi

PASS=$2

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"
MY_WALLET_WITH="$MY_WALLET -rpcwallet=$WALLET"

$MY_WALLET unloadwallet 
$MY_WALLET createwallet $WALLET 
$MY_WALLET_WITH encryptwallet $PASS 
ADDRESS=$($MY_WALLET_WITH getnewaddress "" legacy)
BALANCE=$($MY_WALLET_WITH getbalance)
$MY_WALLET_WITH backupwallet /var/lib/bitcoin/.bitcoin/backup_wallet_$WALLET 
STATUS="OK"

echo -n "{\"wallet\":\"$WALLET\", \"balance\":\"$BALANCE\", \"address\":\"$ADDRESS\", \"status\":\"$STATUS\"}"


