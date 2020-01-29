#!/bin/bash

SERVICE=ufw

sudo systemctl stop $SERVICE
sudo systemctl disable $SERVICE
systemctl status $SERVICE | grep Active
