#!/bin/bash
cd /app

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

#Create database
echo "ALDONO UEA DATUMBAZO"
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.sql

echo "app preta!"
if [ -z "$TEST" ]; then
  bash /app/mysql/enigi.sh MOCK
  npm install --unsafe-perm --dev && nodemon
elif [ "$TEST" == 'circleci' ]; then
  npm install --unsafe-perm --dev && npm start
else
  npm install --unsafe-perm --dev &&  nodemon --ext js --watch ./ --exec 'mocha ./test || true' --delay 1
fi
