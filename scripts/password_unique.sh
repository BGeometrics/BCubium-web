#!/bin/bash

USER="pi"
PASS=$(/etc/Bgeometrics/scripts/pass)

sudo /etc/Bgeometrics/scripts/Bcube_change_pass.sh $USER $PASS
echo -n "OK"

