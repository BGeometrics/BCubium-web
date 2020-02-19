#!/bin/bash

DIR=/var/lib/bitcoin/.lnd/data/chain

if [ -d "$DIR" ]; then
   echo -n "KO. Not created the wallet, before creating it delete the existing one."
else
   /etc/Bgeometrics/scripts/Bcube_create_lnd_wallet.sh 2 > /dev/null
   echo -n "OK. LND Wallet created."
fi

