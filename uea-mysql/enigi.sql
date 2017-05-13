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

INSERT INTO uzantoAuxAsocio ()
  VALUES (
    3, /* id */
    "3", /* ueakodo */
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

/* ------------ Asocio -------------------- */

INSERT INTO asocio ()
    VALUES(
      3, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
      "Brazila Esperanto-Ligo", /*nomo varchar(255) */
      "BEL", /*siglo varchar(255) */
      "SDS Bl.P 36, Ed. Venâncio III Sala 303, 70393-902 Brasília - DF, Brazilo", /*adreso varchar(255) */
      "1907-1-1", /* fondigxdato date */
      "033", /*posxtkodo varchar(255)*/
      1, /*urbo int(11) NULL REFERENCES urbo(id)*/
      "(61) 3226 1298", /*telhejmo varchar(255) */
      25, /* landokodo varchar(255) */
      "bel@esperanto.org.br", /*retposxto varchar(255), */
      "delegFako", /* delegFako varchar(255) */
      "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
      1, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      "abc" /*abc varchar(255)*/
  );
