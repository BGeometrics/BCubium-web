#!/bin/bash

redirect_source_cmd() {
   sudo /sbin/iptables -t nat -L -n | grep REDIRECT | awk {'print $7'} | cut -b 5-
}
redirect_target_cmd() {
   sudo /sbin/iptables -t nat -L -n | grep REDIRECT | awk {'print $10'}
}

SOURCE_PORT=$(redirect_source_cmd)
TARGET_PORT=$(redirect_target_cmd)

echo -n $SOURCE_PORT,$TARGET_PORT

