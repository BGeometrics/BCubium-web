#!/bin/bash

EXTERNAL_IP=$(dig @resolver1.opendns.com A myip.opendns.com +short -4)
PORT=$(netstat -ap | grep bitcoind |grep "\*:[0-9]" | grep LISTEN | head -n 1 |  awk '{print $4}' | cut -b 3-)
BITCOIN_STATUS=$(curl -H "Accept: application/json; indent=4" https://bitnodes.io/api/v1/nodes/$EXTERNAL_IP-$PORT/ | grep status)
RET=${BITCOIN_STATUS/,/}

if [[ $RET == *"DOWN"* ]]; then
  BITCOIN_STATUS_2=$(curl -sL https://bitnodes.earn.com/api/v1/nodes/me-$PORT/)

  if [[ $BITCOIN_STATUS_2 == *"true"* ]]; then
    echo -n "{\"status\":\"UP\"}"
  else
    echo -n "{"$RET"}"
  fi
else
  echo -n "{"$RET"}"
fi


