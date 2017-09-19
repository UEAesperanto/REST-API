#!/bin/bash
#
#    Kodo al enigi valoroj en datumbazo
#    Victor Hugo - victorhundo@gmail.com - 2017
#

ENIGOJ="/app/mysql/enigoj"
SINSEKVO="/app/mysql/sinsekvo"
DATUMBAZO="uea"
UZANTO="root"
for ENIGI in $(cat $SINSEKVO); do
  echo "ENIGO" $ENIGI "EN DATUMBAZO";
  mysql -h"$DB_HOST" -u"$UZANTO" -p"$DB_PASSWORD" $DATUMBAZO < $ENIGOJ/$ENIGI
done
