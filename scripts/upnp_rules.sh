#!/bin/bash
#sudo apt-get install miniupnpc
#crontab -l | grep upnp || echo $(crontab -l ; echo '*/5 * * * * ~/bin/upnpPortMapper.sh  >/dev/null 2>&1') | crontab -

set +x

/usr/bin/upnpc -l | grep TCP
