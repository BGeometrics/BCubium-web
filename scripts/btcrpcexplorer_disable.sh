#!/bin/bash

SERVICE=btc-rpc-explorer

sudo systemctl stop $SERVICE
sudo systemctl disable $SERVICE
systemctl status $SERVICE | grep Active
