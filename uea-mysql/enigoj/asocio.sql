
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
      0, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      "abc" /*abc varchar(255)*/
  );

INSERT INTO asocio ()
    VALUES(
      4, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
      "Brazila Esperantista Junulara Organizo ", /*nomo varchar(255) */
      "BEJO", /*siglo varchar(255) */
      "SDS Bl.P 36, Ed. Venâncio III Sala 303, 70393-902 Brasília - DF, Brazilo", /*adreso varchar(255) */
      "1907-1-1", /* fondigxdato date */
      "033", /*posxtkodo varchar(255)*/
      1, /*urbo int(11) NULL REFERENCES urbo(id)*/
      "(61) 3226 1298", /*telhejmo varchar(255) */
      25, /* landokodo varchar(255) */
      "bel@esperanto.org.br", /*retposxto varchar(255), */
      "delegFako", /* delegFako varchar(255) */
      "http://bejo.esperanto.org.br/", /* tttpagxo varchar(255) */
      1, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      "abc" /*abc varchar(255)*/
  );
