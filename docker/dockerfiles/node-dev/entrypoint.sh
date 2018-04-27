#!/bin/bash
cd /app

#Wait Liquibase is Down!
while ping -q -c1 $LIQUIBASE > /dev/null; do
    sleep 1
done

echo "app preta!"

#node --inspect=0.0.0.0:9229 server
npm install --unsafe-perm --only=dev
 if [ -z "$TEST" ]; then
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'node --inspect=0.0.0.0:9229 || true' \
       --delay 1
 else
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'mocha --opts ./test/unit/mocha.opts ./test/unit/*.js || true' \
       --delay 1
 fi
