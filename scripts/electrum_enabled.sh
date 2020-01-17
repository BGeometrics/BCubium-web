#!/bin/bash

sudo systemctl start bitcoind
sleep 1
systemctl status bitcoind | grep Active
