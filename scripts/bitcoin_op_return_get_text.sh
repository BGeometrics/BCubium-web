#!/bin/bash


if [ -n "$1" ]; then
   WALLET=$1
else
   WALLET="mywallet"
fi

if [ -n "$2" ]; then
   PASS=$2
else
   PASS="vale que esto es una prueba vale"
fi

if [ -n "$3" ]; then
   TX_ID=$3
else
   TX_ID="36127f1b3b3cb1984efaf55bc182e12c9ca9fc4e8127c249c9ce4aad88517cbe"
fi

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin"

#echo $MY_WALLET loadwallet $WALLET
$MY_WALLET loadwallet "$WALLET"

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"

#echo $MY_WALLET walletpassphrase "$PASS" 600
$MY_WALLET walletpassphrase "$PASS" 600

WORD_HEX=$($MY_WALLET getrawtransaction "$TX_ID" true | grep OP_RETURN  | cut -c 27-)
WORD_HEX=$(echo "$WORD" | cut -c 1-$((${#WORD_HEX}-2)))

echo $WORD_HEX | xxd -r -p
