#!/bin/bash
cd /app

#Wait Liquibase is Down!
while ping -q -c1 $LIQUIBASE > /dev/null; do
    sleep 1
done

echo "app preta!"
npm install --unsafe-perm --only=dev
node --inspect=0.0.0.0:9229 server
tail -f /dev/null
 
# if [ -z "$TEST" ]; then
#   npm install --unsafe-perm --dev && nodemon
# else
#   npm install --unsafe-perm --dev
#   nodemon \
#     --ext js \
#     --watch ./ --exec 'mocha ./test || true' \
#     --delay 1
# fi
