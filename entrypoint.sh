#!/bin/bash
cd /app

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

DATUMBAZO=$( mysqlshow -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea | grep -v Wildcard | grep -o uea )
if [ ! "$DATUMBAZO" == "uea" ]; then
    #Create database
    mysql -h$"$DB_HOST" -uroot -p"$DB_PASSWORD" -e "create database uea";
    mysql -h$"$DB_HOST" -uroot -p"$DB_PASSWORD" -e "create database liquibase";
    mysql -h"$DB_HOST" -uroot -p"$DB_PASSWORD" uea < ./mysql/novuea.mysql.sql
fi

echo "App preta."
npm install --unsafe-perm --dev && npm start
