#!/bin/sh

# Lambdas should be deployed through docker container

yarn install
cd packages/lambdas
npx sls deploy function -f uploadFiles
npx sls deploy function -f updateOrders