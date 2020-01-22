#!/bin/bash

if [[ $1 =~ ^[0-9]+$ ]] && [[ $2 =~ ^[0-9]+$ ]]
then
   sudo /sbin/iptables -t nat -A PREROUTING -p tcp -m tcp --dport $1 -j REDIRECT --to-ports $2
else
    echo "Ports only admit numbers"
fi

