#!/bin/bash

DATE=$(date +%F)
USER=pi
PASS_OLD=$1
PASS_NEW=$2

PASS_CHECK=$(sudo /etc/Bgeometrics/scripts/check_pass.sh $USER $PASS_OLD | grep OK)

if [ $PASS_CHECK != "OK" ] ; then
   echo -n "KO"
else
   /etc/Bgeometrics/scripts/change_pass.sh $PASS_NEW
   echo -n "OK"
fi 

