#!/bin/bash

if [[ $1 =~ ^[0-9]+$ ]] && [[ $2 =~ ^[0-9]+$ ]]
then
   sudo /sbin/iptables -t nat -A PREROUTING -p tcp -m tcp --dport $1 -j REDIRECT --to-ports $2
   sudo /usr/sbin/netfilter-persistent save
   sudo /usr/sbin/netfilter-persistent reload
   sudo /usr/sbin/ufw allow $1 "allow redirect"
   sudo /usr/sbin/ufw reload
else
    echo "Ports only admit numbers"
fi

