#!/bin/bash

FILE_TX_ID=../bcube_tx_id.txt
FILE_DEBUG=../scripts_debug.log

WALLET=$1
PASS=$2
AMOUNT=$3
FEE=$4
TEXT=$5
ADDRESS_ORIGIN=$6

if [ -n "$7" ]; then
   ADDRESS_TARGET=$7
else
   ADDRESS_TARGET=$($MY_WALLET getnewaddress "" legacy)
fi

MY_WALLET="/usr/bin/bitcoin-cli -rpccookiefile=/var/lib/bitcoin/.bitcoin/.cookie -conf=/etc/bitcoin/bitcoin.conf -datadir=/var/lib/bitcoin/.bitcoin -rpcwallet=$WALLET"
BALANCE=$($MY_WALLET getbalance)

echo "" >> $FILE_DEBUG
echo "WALLET " $WALLET >> $FILE_DEBUG
#echo "PASS " $PASS >> $FILE_DEBUG
echo "AMOUNT " $AMOUNT >> $FILE_DEBUG
echo "FEE " $FEE >> $FILE_DEBUG
echo "BALANCE " $BALANCE >> $FILE_DEBUG
echo "TEXT " $TEXT >> $FILE_DEBUG
echo "ADDRESS_ORIGIN " $ADDRESS_ORIGIN >> $FILE_DEBUG
echo "ADDRESS_TARGET " $ADDRESS_TARGET >> $FILE_DEBUG

COUNT=$(echo "$AMOUNT + $FEE" | bc | awk '{printf "%08f\n", $0}')  # Format 0.xxxx
echo "COUNT " $COUNT >> $FILE_DEBUG

RETURN_BTC=$(echo "$BALANCE - $COUNT" | bc | awk '{printf "%08f\n", $0}')
echo "RETURN_BTC " $RETURN_BTC >> $FILE_DEBUG

# Cargar un wallet
echo $MY_WALLET loadwallet $WALLET >> $FILE_DEBUG
$MY_WALLET loadwallet $WALLET

# Desbloquear el wallet 10 minutos
echo $MY_WALLET walletpassphrase "$PASS" 600 >> $FILE_DEBUG
$MY_WALLET walletpassphrase "$PASS" 600

# Crear transacción 
UTXO_TXID=$($MY_WALLET listunspent | jq -r '.[] | .txid' | sort -nr | head -n1)
echo "UTXO_TXID " $UTXO_TXID >> $FILE_DEBUG
echo "listunspent " $MY_WALLET listunspent

UTXO_VOUT=$($MY_WALLET listunspent | jq -r '.[] | .vout' | sort -nr | head -n1)
echo "UTXO_VOUT " $UTXO_VOUT >> $FILE_DEBUG

OP_RETURN_DATA=$(echo -n "$TEXT" | od -A n -t x1 | sed 's/ *//g' | tr -d '\n')
echo "OP_RETURN_DATA " $OP_RETURN_DATA >> $FILE_DEBUG

if [ "$ADDRESS_ORIGIN" != "" ] ; then
  RAW_TX=$($MY_WALLET createrawtransaction "[{\"txid\":\"$UTXO_TXID\", \"vout\":$UTXO_VOUT}]" "{\"data\":\"$OP_RETURN_DATA\", \"$ADDRESS_TARGET\":$AMOUNT, \"$ADDRESS_ORIGIN\":$RETURN_BTC}")
  echo "CREATE TX " $MY_WALLET createrawtransaction "[{\"txid\":\"$UTXO_TXID\", \"vout\":$UTXO_VOUT}]" "{\"data\":\"$OP_RETURN_DATA\", \"$ADDRESS_TARGET\":$AMOUNT, \"$ADDRESS_ORIGIN\":$RETURN_BTC}" >>  $FILE_DEBUG
else
  RAW_TX=$($MY_WALLET createrawtransaction "[{\"txid\":\"$UTXO_TXID\", \"vout\":$UTXO_VOUT}]" "{\"data\":\"$OP_RETURN_DATA\", \"$ADDRESS_TARGET\":$COUNT}")
fi

echo "RAW_TX " $RAW_TX >> $FILE_DEBUG

SIGN_TX=$($MY_WALLET signrawtransactionwithwallet $RAW_TX | jq -r '.hex')
echo "SIGN_TX " $SIGN_TX >> $FILE_DEBUG

SEND_TX=$($MY_WALLET sendrawtransaction $SIGN_TX)
echo "SEND_TX " $SEND_TX >> $FILE_DEBUG

echo $SEND_TX >> $FILE_TX_ID

STATUS="OK"

echo -n "{\"wallet\":\"$WALLET\", \"address_target\":\"$ADDRESS_TARGET\", \"amount\":\"$COUNT\", \"transaction\":\"$RAW_TX\", \"send_tx\":\"$SEND_TX\", \"op_return\": \"OP_RETURN_DATA\",  \"status\":\"$STATUS\"}"
echo "{\"wallet\":\"$WALLET\", \"address_target\":\"$ADDRESS_TARGET\", \"amount\":\"$COUNT\", \"transaction\":\"$RAW_TX\", \"send_tx\":\"$SEND_TX\", \"op_return\": \"OP_RETURN_DATA\",  \"status\":\"$STATUS\"}" >> $FILE_DEBUG

