#!/bin/bash
#sudo apt-get install miniupnpc
#crontab -l | grep upnp || echo $(crontab -l ; echo '*/5 * * * * ~/bin/upnpPortMapper.sh  >/dev/null 2>&1') | crontab -


if [[ $1 =~ ^[0-9]+$ ]] && [[ $2 =~ ^[0-9]+$ ]]
then
   export LC_ALL=C
   ROUTER=$(ip r | grep default | cut -d " " -f 3 | head -n 1)
   GATEWAY=$(upnpc -l | grep "desc: http://$ROUTER:" | grep "/rootDesc.xml" | grep -v "IGD" | cut -d " " -f 3)
   IP=$(upnpc -l | grep "Local LAN ip address" | cut -d: -f2)

   EXTERNAL=$1
   PORT=$2

   echo "/usr/bin/upnpc -u $GATEWAY -d $EXTERNAL TCP"
   echo "/usr/bin/upnpc -u $GATEWAY -e "Upnp $EXTERNAL $PORT" -a $IP $PORT $EXTERNAL TCP"

   /usr/bin/upnpc -u $GATEWAY -d $EXTERNAL TCP
   /usr/bin/upnpc -u $GATEWAY -e "Upnp $EXTERNAL $PORT" -a $IP $PORT $EXTERNAL TCP 
   # In case the IGD is not activated
   /usr/bin/upnpc -e "Upnp $EXTERNAL $PORT" -a $IP $PORT $EXTERNAL TCP

   sudo /usr/sbin/ufw allow $PORT "allow Upnp"
   sudo /usr/sbin/ufw reload
else
    echo "Ports only admit numbers"
fi
