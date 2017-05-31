INSERT INTO grupo ()
  VALUES (
    1, /*id int(11) PRIMARY KEY,*/
    "estraro", /*nomo varchar(255)*/
    "priskribo varchar(255)",
    1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
  );

INSERT INTO grupo ()
  VALUES (
    2 /*id int(11) PRIMARY KEY,*/,
    "komitato", /*nomo varchar(255)*/,
    "priskribo varchar(255)",
    1 /*"idAsocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
  );

INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   1, /*idGrupo int(11) REFERENCES grupo(id)*/
   1, /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
  PRIMARY KEY (idGrupo, idGrupaKategorio)
);

INSERT INTO ref_grupo_grupa_kategorio ()
  VALUES (
   2, /*idGrupo int(11) REFERENCES grupo(id)*/
   1, /*idGrupaKategorio int(11) REFERENCES grupa_kategorio(id),*/
  PRIMARY KEY (idGrupo, idGrupaKategorio)
);
