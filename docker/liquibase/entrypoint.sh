#!/bin/bash

CHANGELOG_FILE=/changelog/changelog-master.yaml
CONN=/opt/jdbc_drivers/mysql-connector-java-5.1.44-bin.jar
SNAKEYAML=/opt/jdbc_drivers/snakeyaml-1.19.jar

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

liquibase --driver=com.mysql.jdbc.Driver \
     --classpath=$CONN:$SNAKEYAML \
     --changeLogFile=$CHANGELOG_FILE \
     --url="jdbc:mysql://mysql/uea" \
     --username=root \
     --password=$DB_PASSWORD \
     migrate

tail -f /dev/null
