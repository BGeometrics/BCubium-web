#!/bin/bash

DATE=$(date +%F)
USER=$1
PASS_OLD=$2
PASS_NEW=$3
DIR_BGEOMETRICS=/etc/Bgeometrics

PASS_CHECK=$(sudo $DIR_BGEOMETRICS/scripts/Bcube_check_pass.sh $USER $PASS_OLD)

if [[ "$PASS_CHECK" != "OK" ]] ; then
   echo -n "KO"
else
   sudo $DIR_BGEOMETRICS/scripts/Bcube_change_pass.sh $USER $PASS_NEW
   echo -n "OK"
fi 

