
/* ------------ Asocio -------------------- */

INSERT INTO asocio ()
    VALUES(
      1, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
      "Universala Esperanto-Asocio", /*nomo varchar(255) */
      "UEA", /*siglo varchar(255) */
      "SDS Bl.P 36, Ed. Venâncio III Sala 303, 70393-902 Brasília - DF, Brazilo", /*adreso varchar(255) */
      "1907-1-1", /* fondigxdato date */
      "033", /*posxtkodo varchar(255)*/
      1, /*urbo int(11) NULL REFERENCES urbo(id)*/
      NULL, /*fako*/
      25, /* landokodo varchar(255) */
      "(61) 3226 1298", /*telhejmo varchar(255) */
      "bel@esperanto.org.br", /*retposxto varchar(255), */
      "delegFako", /* delegFako varchar(255) */
      "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
      0, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      0, /*Ĉu tiu asocio estas faka?*/
      1, /*Ĉu tiu asocio estas landa?*/
      "abc" /*abc varchar(255)*/
  );


INSERT INTO asocio ()
    VALUES(
      3, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
      "Brazila Esperanto-Ligo", /*nomo varchar(255) */
      "BEL", /*siglo varchar(255) */
      "SDS Bl.P 36, Ed. Venâncio III Sala 303, 70393-902 Brasília - DF, Brazilo", /*adreso varchar(255) */
      "1907-1-1", /* fondigxdato date */
      "033", /*posxtkodo varchar(255)*/
      1, /*urbo int(11) NULL REFERENCES urbo(id)*/
      NULL, /*fako*/
      25, /* landokodo varchar(255) */
      "(61) 3226 1298", /*telhejmo varchar(255) */
      "bel@esperanto.org.br", /*retposxto varchar(255), */
      "delegFako", /* delegFako varchar(255) */
      "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
      0, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      0, /*Ĉu tiu asocio estas faka?*/
      1, /*Ĉu tiu asocio estas landa?*/
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
      NULL, /*fako*/
      25, /* landokodo varchar(255) */
      "(61) 3226 1298", /*telhejmo varchar(255) */
      "bel@esperanto.org.br", /*retposxto varchar(255), */
      "delegFako", /* delegFako varchar(255) */
      "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
      1, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
      0, /*Ĉu tiu asocio estas faka?*/
      1, /*Ĉu tiu asocio estas landa?*/
      "abc" /*abc varchar(255)*/
  );


  INSERT INTO asocio ()
      VALUES(
        5, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
        "Junulara Esperanto Britio ", /*nomo varchar(255) */
        "JEB", /*siglo varchar(255) */
        "ie, londono", /*adreso varchar(255) */
        "1907-1-1", /* fondigxdato date */
        "033", /*posxtkodo varchar(255)*/
        NULL, /*urbo int(11) NULL REFERENCES urbo(id)*/
        NULL, /*fako*/
        26, /* landokodo varchar(255) */
        "(61) 3226 1298", /*telhejmo varchar(255) */
        "bel@esperanto.org.br", /*retposxto varchar(255), */
        "delegFako", /* delegFako varchar(255) */
        "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
        1, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
        0, /*Ĉu tiu asocio estas faka?*/
        1, /*Ĉu tiu asocio estas landa?*/
        "abc" /*abc varchar(255)*/
    );

    INSERT INTO asocio ()
        VALUES(
          6, /*id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id)*/
          "Internacia Scienca Esperantista-Asocio ", /*nomo varchar(255) */
          "ISAE", /*siglo varchar(255) */
          "ie, Londono", /*adreso varchar(255) */
          "1907-1-1", /* fondigxdato date */
          "033", /*posxtkodo varchar(255)*/
          NULL, /*urbo int(11) NULL REFERENCES urbo(id)*/
          NULL, /*fako*/
          26, /* landokodo varchar(255) */
          "(61) 3226 1298", /*telhejmo varchar(255) */
          "bel@esperanto.org.br", /*retposxto varchar(255), */
          "delegFako", /* delegFako varchar(255) */
          "http://www.esperanto.org.br", /* tttpagxo varchar(255) */
          0, /* junulara boolean - Ĉu tiu asocio estas junulara?*/
          1, /*Ĉu tiu asocio estas faka?*/
          0, /*Ĉu tiu asocio estas landa?*/
          "abc" /*abc varchar(255)*/
      );
