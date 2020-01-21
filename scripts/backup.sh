#!/bin/bash

BACKUP_TMP=/opt/backup_tmp
BACKUP_DIR=/opt/backup
DATE=$(date '+%Y%m%d_%H%M%S')

BITCOIN_CONF=/etc/bitcoin/bitcoin.conf
BITCOIN_SERVICE=/etc/systemd/system/bitcoind.service
BTC_EXPLORER_ENV=/var/lib/bitcoin/btc-rpc-explorer/.env
BTC_EXPLORER_SERVICE=/etc/systemd/system/btc-rpc-explorer.service
LND_CONF=/etc/bitcoin/lnd.conf
LND_SERVICE=/etc/systemd/system/lnd.service
ELECTRS_SERVICE=/etc/systemd/system/electrs.service
TOR_CONF=/etc/tor/torrc
WEBCONFIG_SERVICE=/etc/systemd/system/webconfig.service

rm -f $BACKUP_TMP/*
cp $BITCOIN_CONF $BACKUP_TMP
cp $BITCOIN_SERVICE $BACKUP_TMP
cp $BTC_EXPLORER_ENV $BACKUP_TMP
cp $BTC_EXPLORER_SERVICE $BACKUP_TMP
cp $LND_CONF $BACKUP_TMP
cp $LND_SERVICE $BACKUP_TMP
cp $ELECTRS_SERVICE $BACKUP_TMP
cp $TOR_CONF $BACKUP_TMP
cp $WEBCONFIG_SERVICE $BACKUP_TMP
cp $TOR_CONF $BACKUP_TMP
cp $TOR_CONF $BACKUP_TMP
cp $TOR_CONF $BACKUP_TMP

tar cfzP "$BACKUP_DIR/backup-$DATE.tgz" $BACKUP_TMP
