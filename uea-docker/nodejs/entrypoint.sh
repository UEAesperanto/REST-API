#!/bin/bash

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

cd /app
npm install --unsafe-perm && npm start
