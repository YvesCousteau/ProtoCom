#!/bin/bash
scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")
#write out current crontab
crontab -l > mycron
#echo new cron into cron file
echo "@reboot sleep 15 && python3 $scriptDir/../../services/power/server_slave.py $IP" >> mycron
#install new cron file
crontab mycron
rm mycron