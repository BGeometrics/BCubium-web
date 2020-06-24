#!/bin/bash

DIR_BGEOMETRICS=/etc/Bgeometrics

if [ -z "$1" ]; then
    EXTERNAL_IP_NEW=$(dig @resolver1.opendns.com A myip.opendns.com +short -4)
else
    EXTERNAL_IP_NEW=$1
fi

echo -n $(grep $EXTERNAL_IP_NEW $DIR_BGEOMETRICS/public_ip | wc -l)

