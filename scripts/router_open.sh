#!/bin/bash

ROUTER=$(ip r | grep default | cut -d " " -f 3 | head -n 1)
OPEN_PORT=$(nc $ROUTER $1 < /dev/null)

if [ "$?" -ne 0 ]; then
  echo -n "KO. Connection to $ROUTER on port $1 failed"
  exit 1
else
  echo -n "$ROUTER"
  exit 0
fi
