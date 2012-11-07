#!/bin/bash
/sbin/modprobe ip_conntrack_ftp
/sbin/iptables -F
/sbin/iptables -X
/sbin/iptables -P INPUT DROP
/sbin/iptables -P FORWARD ACCEPT
/sbin/iptables -P OUTPUT ACCEPT
/sbin/iptables -A INPUT -i lo -j ACCEPT
/sbin/iptables -A INPUT -p tcp --sport 21 -j ACCEPT
/sbin/iptables -A INPUT -p tcp --dport 21 -j ACCEPT
/sbin/iptables -A INPUT -p tcp --dport 22 -j ACCEPT
/sbin/iptables -A INPUT -p udp --dport 53 -j ACCEPT
/sbin/iptables -A INPUT -p tcp --dport 80 -j ACCEPT
/sbin/iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
/sbin/iptables -A INPUT -p icmp -j ACCEPT
/sbin/iptables -A INPUT -f -m limit --limit 150/sec --limit-burst 150 -j ACCEPT
/sbin/iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s --limit-burst 10 -j ACCEPT
/sbin/iptables -A INPUT -p tcp -m tcp --tcp-flags SYN,RST,ACK SYN -m limit --limit 25/sec --limit-burst 250 -j ACCEPT
service iptables save
