#!/bin/bash

echo -n $(dig @resolver1.opendns.com A myip.opendns.com +short -4)
#echo -n $(dig @resolver1.opendns.com ANY myip.opendns.com +short)
