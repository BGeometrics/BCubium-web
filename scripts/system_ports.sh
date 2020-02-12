#!/bin/bash

DIR_SCRIPTS=/var/www/html/webconfig/scripts


BITCOIN_PORT=$(grep "^port=" /etc/bitcoin/bitcoin.conf | cut -b 6-)
LND_PORT=$(grep "^listen=" /etc/bitcoin/lnd.conf | cut -b 16-)
BTCRPCEXPLORER_PORT=$(grep "^BTCEXP_PORT=" /var/lib/bitcoin/btc-rpc-explorer/.env | cut -b 13-)
RTL_PORT=$(grep "port" /var/lib/bitcoin/RTL/RTL-Config.json | cut -b 12-15)
TOR_PORT=$(grep "^SOCKSPort" /etc/tor/torrc | cut -b 11-)
OPENVPN_PORT=$(grep "^port " /etc/openvpn/server.conf | cut -b 6-)
WIREGUARD_PORT=$(grep "^ListenPort" /etc/wireguard/wg0.conf | cut -b 14-)

echo "{\"bitcoin_port\":\"$BITCOIN_PORT\", \"lnd_port\":\"$LND_PORT\", \"btcrpcexplorer_port\":\"$BTCRPCEXPLORER_PORT\", \"rtl_port\":\"$RTL_PORT\", \"tor_port\":\"$TOR_PORT\", \"wireguard_port\":\"$WIREGUARD_PORT\", \"openvpn_port\":\"$OPENVPN_PORT\"}"



