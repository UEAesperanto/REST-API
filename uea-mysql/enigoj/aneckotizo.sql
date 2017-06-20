/*Kiom oni devas pagi por ani en grupo*/
INSERT INTO aneckotizo()
VALUES (
  1, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  "1983-10-11", /*maksimuma naskiĝitago por tiu aneco*/
  1, /*landKategorio int(11) REFERENCES landKategorio(id), /*al kiu(j) lando(j) tiu kotizo indas*/
  5 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);


INSERT INTO aneckotizo()
VALUES (
  2, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  "1983-10-11", /*maksimuma naskiĝitago por tiu aneco*/
  1, /*landKategorio int(11) REFERENCES landKategorio(id), /*al kiu(j) lando(j) tiu kotizo indas*/
  6 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);


INSERT INTO aneckotizo()
VALUES (
  3, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  "1983-10-11", /*maksimuma naskiĝitago por tiu aneco*/
  1, /*landKategorio int(11) REFERENCES landKategorio(id), /*al kiu(j) lando(j) tiu kotizo indas*/
  7 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);
