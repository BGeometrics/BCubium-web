#!/bin/bash

sudo systemctl stop lnd 
sudo systemctl stop bitcoin
sudo /sbin/reboot
#sudo /sbin/shutdown -h now

