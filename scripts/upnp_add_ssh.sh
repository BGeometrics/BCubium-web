#!/bin/bash

PORT=22
PORT_MAP=22222
PROTOCOL=TCP

/var/www/html/webconfig/scripts/port_redirect_add.sh $PORT $PORT_MAP
/etc/Bgeometrics/scripts/upnpAdd $PORT_MAP $PORT_MAP $PROTOCOL

