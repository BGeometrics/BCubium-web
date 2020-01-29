#!/bin/bash

SERVICE=bitcoind

sudo systemctl stop $SERVICE
sudo systemctl disable $SERVICE
systemctl status $SERVICE | grep Active
