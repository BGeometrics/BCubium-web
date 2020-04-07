#!/bin/bash

FILE_CONF="/var/lib/bitcoin/btc-rpc-explorer/app/auth.js"

echo "true" > /etc/Bgeometrics/auth_web
sed -i "s/  \/\//  /g" $FILE_CONF
/var/www/html/webconfig/scripts/btcrpcexplorer_restart.sh

