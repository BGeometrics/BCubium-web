#!/bin/bash

FILE_CONF="/var/lib/bitcoin/btc-rpc-explorer/app/auth.js"

echo "false" > /etc/Bgeometrics/auth_web
sed -i "s/  if/  \/\/if/g" $FILE_CONF
sed -i "s/  }/  \/\/}/g" $FILE_CONF
/var/www/html/webconfig/scripts/btcrpcexplorer_restart.sh



