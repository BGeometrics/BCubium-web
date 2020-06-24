#!/bin/bash

PORT=22
PORT_MAP=22222
PROTOCOL=TCP
DIR_BGEOMETRICS=/etc/Bgeometrics
DIR_WEB=/var/www/html/webconfig

$DIR_WEB/scripts/port_redirect_add.sh $PORT $PORT_MAP
$DIR_BGEOMETRICS/scripts/upnpAdd $PORT_MAP $PORT_MAP $PROTOCOL

