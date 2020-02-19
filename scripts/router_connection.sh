#!/bin/bash


ROUTER=$(ip r | grep default | cut -d " " -f 3 | head -n 1)
ping -q -c2 $ROUTER > /dev/null

if [[ $? -eq 0 ]]; then
    echo "{\"connection\":\"On\", \"router\":\"$ROUTER\"}"
else
    echo "{\"connection\":\"Off\", \"router\":\"$ROUTER\"}"
fi

