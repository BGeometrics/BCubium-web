#!/bin/bash

IP_EXTERNAL=$(dig @resolver1.opendns.com A myip.opendns.com +short -4)

#echo -n "XXX.XXX.XXX.XXX"
echo -n $IP_EXTERNAL
echo -n $IP_EXTERNAL > /etc/Bgeometrics/public_ip

