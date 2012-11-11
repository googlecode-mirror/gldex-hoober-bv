#!/bin/bash
FILE_PATH=./ips.txt
for line in $(cat $FILE_PATH)
do
	/sbin/iptables -I INPUT -s $line -p all -j DROP
done
echo "import ips.txt into iptables is done"
