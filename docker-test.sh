#!/bin/sh
clear
docker build -t simple-balance-test .
docker run --rm -it --name simple-balance-test simple-balance-test $1