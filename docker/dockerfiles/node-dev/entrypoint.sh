#!/bin/bash
cd /app

#Wait Liquibase is Down!
while ping -q -c1 $LIQUIBASE > /dev/null; do
    sleep 1
done

echo "app preta!"

npm install --unsafe-perm --only=dev
 if [ -z "$TEST" ]; then
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'node --inspect=0.0.0.0:9229 server || true' \
       --delay 1
 else
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'npm run test-unit || true' \
       --delay 1
 fi
