#!/bin/bash

DATE=$(date +%F)
USER=$1
PASS_OLD=$2
PASS_NEW=$3

PASS_CHECK=$(sudo /etc/Bgeometrics/scripts/Bcube_check_pass.sh $USER $PASS_OLD)

if [[ "$PASS_CHECK" != "OK" ]] ; then
   echo -n "KO"
else
   sudo /etc/Bgeometrics/scripts/Bcube_change_pass.sh $USER $PASS_NEW
   echo -n "OK"
fi 

