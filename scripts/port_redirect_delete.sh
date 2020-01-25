#!/bin/bash

if [[ $1 =~ ^[0-9]+$ ]] && [[ $2 =~ ^[0-9]+$ ]]
then
    sudo /sbin/iptables -t nat --delete PREROUTING -p tcp -m tcp --dport $2 -j REDIRECT --to-ports $1
    sudo /usr/sbin/netfilter-persistent save
    sudo /usr/sbin/netfilter-persistent reload
else
    echo "Ports only admit numbers"
fi


