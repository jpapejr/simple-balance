#!/bin/sh
clear
#This line is simply to clean up any <none> docker images in your docker images list
docker rmi `docker images -q -f dangling=true`
docker build -t simple-balance-test .
docker run --rm -it --name simple-balance-test simple-balance-test $1