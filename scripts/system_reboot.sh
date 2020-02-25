#!/bin/bash

sudo systemctl stop lnd 
sudo systemctl stop bitcoin
sleep 3s
sudo shutdown -h now

