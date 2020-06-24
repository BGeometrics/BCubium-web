#!/bin/bash

BACKUP_TMP=/opt/lnd_backup_tmp
BACKUP_DIR=/opt/lnd_backup
DATE=$(date '+%Y%m%d_%H%M%S')
DIR_BGEOMETRICS=/etc/Bgeometrics

LND_CHANNEL=/var/lib/bitcoin/.lnd/data/chain/bitcoin/mainnet/channel.backup
LND_WALLET=/var/lib/bitcoin/.lnd/data/chain/bitcoin/mainnet/wallet.db
LND_KEYS=/var/lib/bitcoin/.lnd/tls.*
LND_SEED=$DIR_BGEOMETRICS/seed.txt
LND_PASS=$DIR_BGEOMETRICS/lnd_pass.txt

rm -rf $BACKUP_TMP/*
cp $LND_KEYS $BACKUP_TMP
cp $LND_CHANNEL $BACKUP_TMP
cp $LND_WALLET $BACKUP_TMP
cp $LND_SEED $BACKUP_TMP
cp $LND_PASS $BACKUP_TMP

#tar cfzP "$BACKUP_DIR/backup-$DATE.tgz" $BACKUP_TMP
zip -r $BACKUP_DIR/lnd_backup.zip $BACKUP_TMP
mv $BACKUP_DIR/lnd_backup.zip /var/www/html/lnd_backup.zip
