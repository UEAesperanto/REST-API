#!/bin/bash
#
#    Kodo al enigi valoroj en datumbazo
#    Victor Hugo - victorhundo@gmail.com - 2017
#

ENIGOJ="/app/mysql/enigoj"
SINSEKVO="/app/mysql/sinsekvo"
DATUMBAZO="uea"
UZANTO="root"

cat $SINSEKVO | while read ENIGI
do
  TIPO=$(echo $ENIGI  | cut -d' ' -f1)
  TABLO=$(echo $ENIGI | cut -d' ' -f2)
  
  if [ ! -z $1 ]; then
    mysql -h"$DB_HOST" -u"$UZANTO" -p"$DB_PASSWORD" $DATUMBAZO < $ENIGOJ/$TABLO
    echo "ENIGO" $TABLO "EN DATUMBAZO";
  elif [ $TIPO == "SISTEMO" ]; then
    mysql -h"$DB_HOST" -u"$UZANTO" -p"$DB_PASSWORD" $DATUMBAZO < $ENIGOJ/$TABLO
    echo "ENIGO" $TABLO "EN DATUMBAZO";
  fi
done
