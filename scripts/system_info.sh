#!/bin/bash

CPU=`top -b -n1 | grep "Cpu(s)" | awk '{print $2 + $4}'` 
FREE_DATA=`free -m | grep Mem` 
CURRENT=`echo $FREE_DATA | cut -f3 -d' '`
TOTAL=`echo $FREE_DATA | cut -f2 -d' '`
RAM=$(echo "scale = 2; $CURRENT/$TOTAL*100" | bc)
HDD=`df -lh | awk '{if ($6 == "/") { print $5 }}' | head -1 | cut -d'%' -f1`
SSD=`df -lh | awk '{if ($6 == "/mnt/disk") { print $5 }}' | head -1 | cut -d'%' -f1`
TEMP_=`cat /sys/class/thermal/thermal_zone0/temp`
TEMP=$(echo "scale = 2; $TEMP_/1000" | bc)

echo "{\"CPU\":\"$CPU\", \"RAM\":\"$RAM\", \"HDD\":\"$HDD\", \"TEMP\":\"$TEMP\", \"SSD\":\"$SSD\"}"


