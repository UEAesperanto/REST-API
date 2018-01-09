#!/bin/bash
cd /app

#Wait Liquibase is Down!
while ping -q -c1 $LIQUIBASE > /dev/null; do
    sleep 1
done

echo "app preta!"
if [ -z "$TEST" ]; then
  npm install --unsafe-perm --dev && nodemon
elif [ "$TEST" == 'circleci' ]; then
  npm install --unsafe-perm --dev && npm start
else
  npm install --unsafe-perm --dev &&  nodemon --ext js --watch ./ --exec 'mocha ./test || true' --delay 1
fi
