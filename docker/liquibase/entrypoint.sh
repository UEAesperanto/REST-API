#!/bin/bash

CHANGELOG_FILE=/changelog/changelog-master.yaml
CONN=/opt/jdbc_drivers/mysql-connector-java-5.1.44-bin.jar
SNAKEYAML=/opt/jdbc_drivers/snakeyaml-1.19.jar
DATUMBAZO_NOMO="uea"
DATUMBAZO_UZANTO="root"

if [ "$MEDIO" == "MOCK" ]; then
  CHANGELOG_FILE=/changelog/changelog-mock.yaml
fi

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -u"$DATUMBAZO_UZANTO" -p"$DB_PASSWORD" --silent; do
    sleep 1
done

#Create database if dont exists
DATUMBAZO=$( mysqlshow -h"$DB_HOST" -u"$DATUMBAZO_UZANTO" -p"$DB_PASSWORD" $DATUMBAZO_NOMO | grep -v Wildcard | grep -o $DATUMBAZO_NOMO )
if [ ! "$DATUMBAZO" == "$DATUMBAZO_NOMO" ]; then
    mysql -h$"$DB_HOST" -u"$DATUMBAZO_UZANTO" -p"$DB_PASSWORD" -e "create database $DATUMBAZO_NOMO";
fi

# Populate!
liquibase --driver=com.mysql.jdbc.Driver \
     --classpath=$CONN:$SNAKEYAML \
     --changeLogFile=$CHANGELOG_FILE \
     --url="jdbc:mysql://mysql/$DATUMBAZO_NOMO" \
     --username=$DATUMBAZO_UZANTO \
     --password=$DB_PASSWORD \
     migrate

if [ $? -eq 0 ]; then
	echo "Okej"
else
  echo "Ne Okej"
  tail -f /dev/null
fi
