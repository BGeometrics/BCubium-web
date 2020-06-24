#!/bin/bash

IP_EXTERNAL=$(dig @resolver1.opendns.com A myip.opendns.com +short -4)
DIR_BGEOMETRICS=/etc/Bgeometrics

echo -n $IP_EXTERNAL
if [ -d "$DIR_BGEOMETRICS" ]; then
  echo -n $IP_EXTERNAL > /etc/Bgeometrics/public_ip
fi

