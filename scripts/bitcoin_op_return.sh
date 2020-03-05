#!/bin/bash

#./bitcoin_op_return.sh myadddress text amount feed 

if [ -n "$1" ]; then
   MY_ADDRESS=$1
else
   # mywallet getreceivedbyaddress 1DEDLPxcRWutG2FcscC5Xe3NXzZQqrHvJY
   MY_ADDRESS=1DEDLPxcRWutG2FcscC5Xe3NXzZQqrHvJY
fi

if [ -n "$2" ]; then
   TEXT=$2
else
   TEXT="Test 3"
fi

if [ -n "$3" ]; then
   # https://www.blockchain.com/btc/address/$MY_ADDRESS
   AMOUNT=$3
else
   AMOUNT=0.00010700
fi

if [ -n "$4" ]; then
   FEE=$4
else
   FEE=0.000008
fi

PASS="vale que esto es una prueba vale"
COUNT=$(echo "$AMOUNT - $FEE" | bc | awk '{printf "%08f\n", $0}')  # Format 0.xxxx
WALLET=mywallet
MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"
#alias mywallet="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=mywallet"

# $MY_WALLET getaddressesbylabel ""
# $MY_WALLET listreceivedbyaddress
# $MY_WALLET getreceivedbyaddress 3GT1onkH5va5ja13TE4VxU5UeoHqtdK9hE
# $MY_WALLET gettransaction
# $MY_WALLET getbalance 
# $MY_WALLET getwalletinfo

# $MY_WALLET createwallet $WALLET

# Wallet cifrado
# $MY_WALLET encryptwallet $PASS

# Backup del wallet con el usuario bitcoin
# $MY_WALLET backupwallet ~/backupwallet.dat


# Cargar un wallet
echo $MY_WALLET loadwallet $WALLET
$MY_WALLET loadwallet $WALLET

# Desbloquear el wallet 10 minutos
echo $MY_WALLET walletpassphrase "$PASS" 600
$MY_WALLET walletpassphrase "$PASS" 600


# Crear transacción 
echo "UTXO_TXID " $UTXO_TXID
UTXO_TXID=$($MY_WALLET listunspent | jq -r '.[0] | .txid')
echo "UTXO_VOUT " $UTXO_VOUT
UTXO_VOUT=$($MY_WALLET listunspent | jq -r '.[0] | .vout')
NEW_ADDRESS=$($MY_WALLET getnewaddress "" legacy)
# https://codebeautify.org/string-hex-converter
OP_RETURN_DATA=$(echo -n "$TEXT" | od -A n -t x1 | sed 's/ *//g' | tr -d '\n')
echo "OP_RETURN_DATA " $OP_RETURN_DATA

RAW_TX=$($MY_WALLET createrawtransaction "[{\"txid\":\"$UTXO_TXID\", \"vout\":$UTXO_VOUT}]" "{\"data\":\"$OP_RETURN_DATA\", \"$NEW_ADDRESS\":$COUNT}")
echo "RAW_TX " $RAW_TX
#SIGN_TX=$($MY_WALLET signrawtransactionwithwallet $RAW_TX)
SIGN_TX=$($MY_WALLET signrawtransactionwithwallet $RAW_TX | jq -r '.hex')
echo "SIGN_TX " $SIGN_TX
SEND_TX=$($MY_WALLET sendrawtransaction $SIGN_TX)
echo "SEND_TX " $SEND_TX

echo "NEW_ADDRESS " $NEW_ADDRESS

#$MY_WALLET decoderawtransaction $RAW_TX
