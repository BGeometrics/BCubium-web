#!/bin/bash

if [ -n "$1" ]; then
   TX_ID=$1
else
   TX_ID="36127f1b3b3cb1984efaf55bc182e12c9ca9fc4e8127c249c9ce4aad88517cbe"
fi

DATA_HEX=$(curl https://api.blockcypher.com/v1/btc/main/txs/$TX_ID | grep data_hex | cut -c 20-)
DATA_HEX=$(echo "$DATA_HEX" | cut -c 1-$((${#DATA_HEX}-2)))
DATA_WORD=$(echo $DATA_HEX | xxd -r -p)

echo -n "$DATA_WORD||||$DATA_HEX"



