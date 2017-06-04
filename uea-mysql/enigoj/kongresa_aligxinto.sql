INSERT INTO kongresa_aligxinto()
VALUES (
    1,  /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
    1,  /*kongresaNumero int(11),*/
    2,  /*idUzanto int(11) REFERENCES uzanto(id),*/
    0,  /*idAligxkotizo int(11) REFERENCES aligxkotizo (id),*/
    0, /* pagita boolean, /*Ĉu la aliĝinto pagis la kotizon?*/
    1  /*idKongreso int(11) REFERENCES kongreso(id)*/
);

INSERT INTO kongresa_aligxinto()
VALUES (
    2,  /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
    103,  /*kongresaNumero int(11),*/
    4,  /*idUzanto int(11) REFERENCES uzanto(id),*/
    0,  /*idAligxkotizo int(11) REFERENCES aligxkotizo (id),*/
    0, /* pagita boolean, /*Ĉu la aliĝinto pagis la kotizon?*/
    1  /*idKongreso int(11) REFERENCES kongreso(id)*/
);
