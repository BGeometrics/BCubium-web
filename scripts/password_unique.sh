#!/bin/bash

USER="pi"
PASS=$(/etc/Bgeometrics/scripts/pass)
DIR_BGEOMETRICS=/etc/Bgeometrics

sudo $DIR_BGEOMETRICS/scripts/Bcube_change_pass.sh $USER $PASS
echo -n "OK"

