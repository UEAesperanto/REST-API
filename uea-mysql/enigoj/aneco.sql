/*Mark Fettes estas prezidanto de UEA*/
INSERT into aneco ()
VALUES(
    1, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    6, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    1, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    "2010-04-12", /*komencdato date, /*la dato en kiu la uzanto ekanis en la grupo*/
    "2014-05-12", /*la dato en kiu la uzanto eliris la grupon*/
    0,/*dumviva boolean, /*ĉu temas pri dumviva aneco?*/
    "prezidanto", /*tasko varchar(255) NULL, /*kiu estas la tasko de la ano en la grupo?*/
    "scienca kaj faka agado", /*kiu estas la respondeco de la ano en la grupo?*/
    1, /*idAsocio int(11) NULL REFERENCES asocio(id), /*Ĉu la ano reprezentas iun asocion, kiel en kazoj de komitatanoj A*/
    NULL, /*Ĉu la ano reprezentas urbon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Ĉu la ano reprezentas fakon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Aneckotizo*/
    "observoj varchar(255) NULL", /*Aldona kampo kaze observoj pri la aneco estos bezonataj*/
    1
);

/*Emilio Cid estas estrarano de UEA*/
INSERT into aneco ()
VALUES(
    2, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    10, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    1, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    "2010-04-12", /*komencdato date, /*la dato en kiu la uzanto ekanis en la grupo*/
    "2014-05-12", /*la dato en kiu la uzanto eliris la grupon*/
    0,/*dumviva boolean, /*ĉu temas pri dumviva aneco?*/
    "estrarano", /*tasko varchar(255) NULL, /*kiu estas la tasko de la ano en la grupo?*/
    "informado", /*kiu estas la respondeco de la ano en la grupo?*/
    1, /*idAsocio int(11) NULL REFERENCES asocio(id), /*Ĉu la ano reprezentas iun asocion, kiel en kazoj de komitatanoj A*/
    NULL, /*Ĉu la ano reprezentas urbon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Ĉu la ano reprezentas fakon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Aneckotizo*/
    "observoj varchar(255) NULL", /*Aldona kampo kaze observoj pri la aneco estos bezonataj*/
    1
);

/*Emilio Cid estas komitatano B de UEA*/
INSERT into aneco ()
VALUES(
    3, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    10, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    3, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    "2010-04-12", /*komencdato date, /*la dato en kiu la uzanto ekanis en la grupo*/
    "2014-05-12", /*la dato en kiu la uzanto eliris la grupon*/
    0,/*dumviva boolean, /*ĉu temas pri dumviva aneco?*/
    "komitatno", /*tasko varchar(255) NULL, /*kiu estas la tasko de la ano en la grupo?*/
    "informado", /*kiu estas la respondeco de la ano en la grupo?*/
    1, /*idAsocio int(11) NULL REFERENCES asocio(id), /*Ĉu la ano reprezentas iun asocion, kiel en kazoj de komitatanoj A*/
    NULL, /*Ĉu la ano reprezentas urbon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Ĉu la ano reprezentas fakon en sia aneco, kiel en kazoj de delegitoj*/
    "observoj varchar(255) NULL", /*Aldona kampo kaze observoj pri la aneco estos bezonataj*/
    1
);

/*Mirejlo  estas komitatano A de UEA*/
INSERT into aneco ()
VALUES(
    4, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    8, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    2, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    "2010-04-12", /*komencdato date, /*la dato en kiu la uzanto ekanis en la grupo*/
    "2014-05-12", /*la dato en kiu la uzanto eliris la grupon*/
    0,/*dumviva boolean, /*ĉu temas pri dumviva aneco?*/
    "estrarano", /*tasko varchar(255) NULL, /*kiu estas la tasko de la ano en la grupo?*/
    "informado", /*kiu estas la respondeco de la ano en la grupo?*/
    1, /*idAsocio int(11) NULL REFERENCES asocio(id), /*Ĉu la ano reprezentas iun asocion, kiel en kazoj de komitatanoj A*/
    NULL, /*Ĉu la ano reprezentas urbon en sia aneco, kiel en kazoj de delegitoj*/
    NULL, /*Aneckotizo*/
    4, /*Ĉu la ano reprezentas fakon en sia aneco, kiel en kazoj de delegitoj*/
    "observoj varchar(255) NULL", /*Aldona kampo kaze observoj pri la aneco estos bezonataj*/
    1
);
