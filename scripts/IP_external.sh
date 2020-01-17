#!/bin/bash

echo -n $(dig @resolver1.opendns.com ANY myip.opendns.com +short)
