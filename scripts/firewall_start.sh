#!/bin/bash

# Rules
ufw default deny incoming
ufw default allow outgoing
ufw allow 22    comment 'allow SSH'
ufw allow 80    comment 'allow HTTP'
ufw allow 443   comment 'allow HTTPS and OpenVPN'
ufw allow 1900  comment 'allow UPnP'
ufw allow 3000  comment 'allow LndHub'
ufw allow 3002  comment 'allow BTC-RPC-Explorer'
ufw allow 3010  comment 'allow RTL'
ufw allow 8333  comment 'allow Bitcoin mainnet'
ufw allow 9050  comment 'allow TOR'
ufw allow 9735  comment 'allow Lightning'
ufw allow 10009 comment 'allow Lightning gRPC'
ufw allow 10080 comment 'allow Lightning REST RPC'
ufw allow 18333 comment 'allow Bitcoin testnet'
ufw allow 50001 comment 'allow Electrum Server'
ufw allow 50002 comment 'allow Electrum Server'

# TEMP
ufw allow 4443  comment 'Temp allow SSL'
ufw allow 7012  comment 'Temp allow bitcoin'
#

ufw allow from 127.0.0.1 comment 'allow from localhost'
ufw allow from ::1 comment 'allow from localhost'

#ufw --force enable
#systemctl enable ufw
#ufw status

#sleep 10s
#ufw reload

