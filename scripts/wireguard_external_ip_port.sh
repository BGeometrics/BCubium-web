#!/bin/bash

HTML_DIR=/var/www/html
FILE_CONF="$HTML_DIR/client-wg0.conf"


if [ -z "$1" ]; then
    EXTERNAL_IP=$(dig @resolver1.opendns.com ANY myip.opendns.com +short)
else
    EXTERNAL_IP=$1
fi

if [[ -n "$2" ]] && [[ $2 =~ ^[0-9]+$ ]]; then
    PORT=$2
else
    PORT=28165
fi

echo $EXTERNAL_IP
echo $PORT

sed -i "s/Endpoint\ .*/Endpoint\ =\ $EXTERNAL_IP:$PORT/g" $FILE_CONF
qrencode -t PNG -o $HTML_DIR/webconfig/public/bcube-wg0.png < $FILE_CONF


