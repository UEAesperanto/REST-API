#!/bin/bash

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

cd /app
#Create database
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.db_simpla.sql
npm install --unsafe-perm --dev
nodemon --ext js --watch ./ --exec 'mocha ./test || true' --delay 1
