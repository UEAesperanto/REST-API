#!/bin/bash
cd /app

#Wait Liquibase is Down!
while ping -q -c1 liquibase > /dev/null; do
    sleep 1
done

echo "App preta."
npm install --unsafe-perm --dev && npm start
