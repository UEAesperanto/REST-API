#!/bin/bash

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

cd /app
#Create database
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.sql
mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/enigi.sql
npm install --unsafe-perm --dev && nodemon
