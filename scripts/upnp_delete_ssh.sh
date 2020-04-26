#!/bin/bash

PORT=22
PORT_MAP=22222
PROTOCOL=TCP

/var/www/html/webconfig/scripts/port_redirect_delete.sh $PORT $PORT_MAP
/etc/Bgeometrics/scripts/upnpDelete $PORT_MAP $PORT_MAP $PROTOCOL

