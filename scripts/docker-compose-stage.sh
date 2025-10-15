#!/bin/sh

docker compose -f docker-compose.base.yml -f docker-compose.stage.yml up -d --build --force-recreate -V
