#!/bin/bash

IP_EXTERNAL=$(dig @resolver1.opendns.com A myip.opendns.com +short -4)

echo -n $IP_EXTERNAL
if [ -d "/etc/Bgeometrics" ]; then
  echo -n $IP_EXTERNAL > /etc/Bgeometrics/public_ip
fi

