#!/bin/bash

FILE_TX_ID=../bcube_tx_id.txt

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
   AMOUNT=$3
else
   AMOUNT=0.000001
fi

if [ -n "$4" ]; then
   FEE=$4
else
   FEE=0.000005
fi

if [ -n "$5" ]; then
   TEXT=$5
else
   TEXT="Test 5"
fi

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"

if [ -n "$6" ]; then
   ADDRESS_TARGET=$6
else
   ADDRESS_TARGET=$($MY_WALLET getnewaddress "" legacy)
fi

echo "WALLET " $WALLET
echo "PASS " $PASS
echo "AMOUNT " $AMOUNT
echo "FEE " $FEE
echo "TEXT " $TEXT
echo "ADDRESS_TARGET " $ADDRESS_TARGET

COUNT=$(echo "$AMOUNT - $FEE" | bc | awk '{printf "%08f\n", $0}')  # Format 0.xxxx

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
# https://codebeautify.org/string-hex-converter
OP_RETURN_DATA=$(echo -n "$TEXT" | od -A n -t x1 | sed 's/ *//g' | tr -d '\n')
echo "OP_RETURN_DATA " $OP_RETURN_DATA

RAW_TX=$($MY_WALLET createrawtransaction "[{\"txid\":\"$UTXO_TXID\", \"vout\":$UTXO_VOUT}]" "{\"data\":\"$OP_RETURN_DATA\", \"$ADDRESS_TARGET\":$COUNT}")
echo "RAW_TX " $RAW_TX
SIGN_TX=$($MY_WALLET signrawtransactionwithwallet $RAW_TX | jq -r '.hex')
echo "SIGN_TX " $SIGN_TX
SEND_TX=$($MY_WALLET sendrawtransaction $SIGN_TX)
echo "SEND_TX " $SEND_TX

echo $SEND_TX >> $FILE_TX_ID

STATUS="OK"

echo -n "{\"wallet\":\"$WALLET\", \"address_target\":\"$ADDRESS_TARGET\", \"amount\":\"$COUNT\", \"transaction\":\"$RAW_TX\", \"send_tx\":\"$SEND_TX\", \"op_return\": \"OP_RETURN_DATA\",  \"status\":\"$STATUS\"}"

#$MY_WALLET decoderawtransaction $RAW_TX
# https://codebeautify.org/string-hex-converter
# https://codebeautify.org/hex-string-converter
# https://www.blockchain.com/btc/address/1Hssq3vfrdd6XxiLUiasCgHuRmzGGcXBEQ
