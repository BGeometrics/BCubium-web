#!/bin/bash

USER="pi"
PASS="pythagoras"
DIR_BGEOMETRICS=/etc/Bgeometrics

sudo $DIR_BGEOMETRICS/scripts/Bcube_change_pass.sh $USER $PASS
echo -n "OK"

