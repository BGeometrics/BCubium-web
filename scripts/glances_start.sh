#!/bin/bash

/usr/bin/timeout $1s /usr/local/bin/glances -w &

echo -n "OK"



