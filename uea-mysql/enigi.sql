/*

    Kodo al enigi valoroj en datumbazo
    Victor Hugo - victorhundo@gmail.com - 2017

*/

/* ---------------- Lando ----------------------- */

INSERT INTO lando ()
  VALUES (
    25, /* id */
    "Brasil", /* nomoLoka */
    "Brazilo", /* nomoEo */
    55 /* landKodo */
  );

INSERT INTO lando ()
  VALUES (
    26, /* id */
    "Great Britain", /* nomoLoka */
    "Britio", /* nomoEo */
    44 /* landKodo */
  );

/* ------------------- Urbo -------------------*/
INSERT INTO urbo ()
  VALUES (
    1, /* id */
    "nomoLoka", /* nomoLoka */
    "NomoEo", /* nomoEO */
    25 /* idLando */
  );

/* -----------  Uzanto aux Asocio -------------*/
INSERT INTO uzantoAuxAsocio ()
  VALUES (
    1, /* id */
    "1", /* ueakodo */
    NULL, /* uzantnomo */
    NULL /* pasvorto */
  );

INSERT INTO uzantoAuxAsocio ()
  VALUES (
    2, /* id */
    "2", /* ueakodo */
    NULL, /* uzantnomo */
    NULL /* pasvorto */
  );

/* --------------- Uzanto ---------------------*/
INSERT INTO uzanto ()
  VALUES (
    1, /* id */
    "personanomo", /*  personanomo */
    "familianomo", /* familianomo   */
    "titolo", /* titolo  */
    "bildo", /* bildo   */
    "personanomoIdentigilo", /* personanomoIdentigilo  */
    "familianomoIdentigilo", /* familianomoIdentigilo  */
    "adreso", /*  adreso */
    "posxtkodo", /* posxtkodo  */
    1, /* logxurbo  */
    25, /* nacialando  */
    "1993-3-18", /* naskigxtago  */
    NULL, /* mortdatekscio  */
    NULL, /* mortdato  */
    "notoj", /* notoj  */
    "profesio", /* profesio  */
    "retposxto",  /* retposxto */
    "telhejmo", /* telhejmo  */
    "teloficejo", /* teloficejo  */
    "telportebla", /* telportebla  */
    1, /* kerekzameno   */
    1, /* kernivelo */
    "1993-3-18", /* kerdato  */
    "tttpagxo", /* tttpagxo  */
    1, /* validaKonto  */
    "abc" /* abc  */
  );

INSERT INTO uzanto ()
  VALUES (
    2, /* id */
    "Ana", /*  personanomo */
    "Ribeiro", /* familianomo   */
    "titolo", /* titolo  */
    "bildo", /* bildo   */
    "personanomoIdentigilo", /* personanomoIdentigilo  */
    "familianomoIdentigilo", /* familianomoIdentigilo  */
    "adreso", /*  adreso */
    "posxtkodo", /* posxtkodo  */
    1, /* logxurbo  */
    25, /* nacialando  */
    "1993-3-18", /* naskigxtago  */
    NULL, /* mortdatekscio  */
    NULL, /* mortdato  */
    "notoj", /* notoj  */
    "profesio", /* profesio  */
    "retposxto",  /* retposxto */
    "telhejmo", /* telhejmo  */
    "teloficejo", /* teloficejo  */
    "telportebla", /* telportebla  */
    1, /* kerekzameno   */
    1, /* kernivelo */
    "1993-3-18", /* kerdato  */
    "tttpagxo", /* tttpagxo  */
    1, /* validaKonto  */
    "abc" /* abc  */
  );
