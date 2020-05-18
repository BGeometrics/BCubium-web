#!/bin/bash

FILE_TX_ID=../bcube_tx_id.txt
FILE_DEBUG=../scripts_debug.log

WALLET=$1
PASS=$2

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"

echo "" 
echo "WALLET " $WALLET

# Cargar un wallet
#echo $MY_WALLET loadwallet $WALLET >> $FILE_DEBUG
#$MY_WALLET loadwallet $WALLET

# Desbloquear el wallet 10 minutos
#echo $MY_WALLET walletpassphrase "$PASS" 600 >> $FILE_DEBUG
#$MY_WALLET walletpassphrase "$PASS" 600
 
echo -n $($MY_WALLET listunspent | jq -r '.[]')
