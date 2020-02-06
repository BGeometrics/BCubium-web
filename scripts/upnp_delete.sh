#!/bin/bash

set +x

if [[ $1 =~ ^[0-9]+$ ]]
then
   export LC_ALL=C

   PROTOCOL=TCP

   if [ "$2" = "UDP" ] ; then
      PROTOCOL=UDP
   fi

   ROUTER=$(ip r | grep default | cut -d " " -f 3 | head -n 1)
   GATEWAY=$(upnpc -l | grep "desc: http://$ROUTER:" | grep "/rootDesc.xml" | grep -v "IGD" | cut -d " " -f 3)
   EXTERNAL=$1

   echo /usr/bin/upnpc -u $GATEWAY -d $EXTERNAL $PROTOCOL
   /usr/bin/upnpc -u $GATEWAY -d $EXTERNAL $PROTOCOL
   # In case the IGD is not activated
   echo /usr/bin/upnpc -d $EXTERNAL $PROTOCOL
   /usr/bin/upnpc -d $EXTERNAL $PROTOCOL
else
    echo "Ports only admit numbers"
fi
