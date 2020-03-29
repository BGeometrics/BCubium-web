#!/bin/bash

if [ -n "$1" ]; then
   TX_ID=$1

   DATA_HEX=$(curl https://api.blockcypher.com/v1/btc/main/txs/$TX_ID | grep data_hex | cut -c 20-)
   DATA_HEX=$(echo "$DATA_HEX" | cut -c 1-$((${#DATA_HEX}-2)))
   DATA_WORD=$(echo $DATA_HEX | xxd -r -p)

   BLOCK=$(curl https://api.blockcypher.com/v1/btc/main/txs/$TX_ID | grep "block_height" | cut -c 19-)
   BLOCK=$(echo "$BLOCK" | cut -c 1-$((${#BLOCK}-1)))
   echo -n "$DATA_WORD||||$DATA_HEX||||$BLOCK"

else
   echo -n "No transaction||||00000000||||00000000"
fi

