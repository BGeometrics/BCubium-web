#!/bin/bash

set +x

if [[ $1 =~ ^[0-9]+$ ]]
then
   export LC_ALL=C
   ROUTER=$(ip r | grep default | cut -d " " -f 3 | head -n 1)
   GATEWAY=$(upnpc -l | grep "desc: http://$ROUTER:" | grep "/rootDesc.xml" | grep -v "IGD" | cut -d " " -f 3)
   EXTERNAL=$1

   /usr/bin/upnpc -u $GATEWAY -d $EXTERNAL TCP
   # In case the IGD is not activated
   /usr/bin/upnpc -d $EXTERNAL TCP
else
    echo "Ports only admit numbers"
fi
