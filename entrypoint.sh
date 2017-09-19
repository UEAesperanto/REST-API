#!/bin/bash
cd /app

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

#Create database
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.sql
echo "App preta."
npm install --unsafe-perm --dev && npm start
