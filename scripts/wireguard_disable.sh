#!/bin/bash

SERVICE=wg-quick@wg0

sudo systemctl stop $SERVICE
sudo systemctl disable $SERVICE
systemctl status $SERVICE | grep Active
