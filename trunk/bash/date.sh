#!/bin/bash
DATE=`date | awk { printf $1}`
case $DATE in
	Mon) LEVEL=1;; 
	Tue) LEVEL=2;; 
	Wed) LEVEL=3;; 
	Thu) LEVEL=4;; 
	Fri) LEVEL=5;; 
	Sat) LEVEL=6;; 
	Sun) LEVEL=7;; 
esac 