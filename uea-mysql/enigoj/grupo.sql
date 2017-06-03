INSERT INTO grupo ()
  VALUES (
    1, /*id int(11) PRIMARY KEY,*/
    "estraro", /*nomo varchar(255)*/
    "priskribo varchar(255)",
    1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
  );

INSERT INTO grupo ()
  VALUES (
    2, /*id int(11) PRIMARY KEY,*/
    "komitato A", /*nomo varchar(255)*/
    "priskribo varchar(255)",
    1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
  );

INSERT INTO grupo ()
    VALUES (
      3, /*id int(11) PRIMARY KEY,*/
      "komitato B", /*nomo varchar(255)*/
      "priskribo varchar(255)",
      1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
  );

INSERT INTO grupo ()
    VALUES (
        4, /*id int(11) PRIMARY KEY,*/
        "komitato C", /*nomo varchar(255)*/
        "priskribo varchar(255)",
        1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
    );

INSERT INTO grupo ()
    VALUES (
        5, /*id int(11) PRIMARY KEY,*/
        "komitato Ĉ", /*nomo varchar(255)*/
        "priskribo varchar(255)",
        1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
    );


INSERT INTO grupo ()
VALUES (
  99,
  "alia",
  "priskribo",
  NULL
);

INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   1, /*idGrupo int(11) REFERENCES grupo(id)*/
   1 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);

INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   2, /*idGrupo int(11) REFERENCES grupo(id)*/
   1 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);


INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   2, /*idGrupo int(11) REFERENCES grupo(id)*/
   2 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);

INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   3, /*idGrupo int(11) REFERENCES grupo(id)*/
   1 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);


INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   3, /*idGrupo int(11) REFERENCES grupo(id)*/
   2 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);


INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   4, /*idGrupo int(11) REFERENCES grupo(id)*/
   1 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);


INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   4, /*idGrupo int(11) REFERENCES grupo(id)*/
   2 /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
);
