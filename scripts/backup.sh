#!/bin/bash

#https://{Internel_IP}/backup.tgz

BACKUP_TMP=/opt/backup_tmp
BACKUP_DIR=/opt/backup
BACKUP_CONFIG=$BACKUP_TMP/config
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

BITCOIN_WALLETS=/var/lib/bitcoin/.bitcoin/backup_*
LND_CHANNEL=/var/lib/bitcoin/.lnd/data/chain/bitcoin/mainnet/channel.backup
LND_WALLET=/var/lib/bitcoin/.lnd/data/chain/bitcoin/mainnet/wallet.db
LND_KEYS=/var/lib/bitcoin/.lnd/tls.*
LND_SEED=/etc/Bgeometrics/seed.txt
BCUBE_CREDENTIALS=/etc/Bgeometrics/credentials

rm -rf $BACKUP_TMP/*
#mkdir $BACKUP_CONFIG
#cp $BITCOIN_CONF $BACKUP_CONFIG
#cp $BITCOIN_SERVICE $BACKUP_CONFIG
#cp $BTC_EXPLORER_ENV $BACKUP_CONFIG
#cp $BTC_EXPLORER_SERVICE $BACKUP_CONFIG
#cp $LND_CONF $BACKUP_CONFIG
#cp $LND_SERVICE $BACKUP_CONFIG
#cp $ELECTRS_SERVICE $BACKUP_CONFIG
#cp $TOR_CONF $BACKUP_CONFIG
#cp $WEBCONFIG_SERVICE $BACKUP_CONFIG
#cp $TOR_CONF $BACKUP_CONFIG

cp $BITCOIN_WALLETS $BACKUP_TMP
cp $LND_KEYS $BACKUP_TMP
cp $LND_CHANNEL $BACKUP_TMP
cp $LND_SEED $BACKUP_TMP
cp $LND_WALLET $BACKUP_TMP
cp $BCUBE_CREDENTIALS $BACKUP_TMP

zip -r $BACKUP_DIR/backup.zip $BACKUP_TMP
mv $BACKUP_DIR/backup.zip /var/www/html/backup.zip
