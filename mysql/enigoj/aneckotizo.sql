/*Kiom oni devas pagi por ani en grupo*/
INSERT INTO aneckotizo()
VALUES (
  1, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  25, /*al kiu lando tiu kotizo indas*/
  'EUR', /*kotizo*/
  5 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);


INSERT INTO aneckotizo()
VALUES (
  2, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  25, /*al kiu lando tiu kotizo indas*/
  'EUR', /*kotizo*/
  6 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);


INSERT INTO aneckotizo()
VALUES (
  3, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
  500,/*prezo int(11),*/
  "priskribo varchar(255)", /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  26, /*al kiu lando tiu kotizo indas*/
  'Pundo', /*kotizo*/
  7 /*idGrupo int(11) REFERENCES grupo(id) /*la grupo al kiu oni anas*/
);
