#/bin/bash

RTL_CONF="/var/lib/bitcoin/RTL/RTL-Config.json"
RTL_CONF_SAMPLE="/etc/Bgeometrics/scripts/sample-RTL-Config.json"

if [ -z "$1" ]; then
    PASS=$(cat /etc/Bgeometrics/credentials | grep password | cut -b 10-)
else
    PASS=$1
fi

cp $RTL_CONF $RTL_CONF.bak
cp $RTL_CONF_SAMPLE $RTL_CONF
sed -i "s/password/$PASS/g" $RTL_CONF

#HASH=$(echo -n "$PASS" | sha256sum | awk '{print $1}')
#sed -i "s/\"multiPassHashed\".*/\"multiPassHashed\":\ \"$HASH\"/g" $FILE_RTL

sudo systemctl restart rtl


