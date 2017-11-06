/*Mark Fettes estas prezidanto de UEA*/
INSERT into aneco (id, idAno, idGrupo, aprobita)
VALUES(
    1, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    6, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    1, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    1
);

/*Emilio Cid estas estrarano de UEA*/
INSERT into aneco (id, idAno, idGrupo, aprobita)
VALUES(
    2, /*id int(11) PRIMARY KEY AUTO_INCREMENT, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
    10, /*idAno int(11) NOT NULL REFERENCES uzantoAuxAsocio(id), /*la uzanto aǔ asocio kiu anas je la grupo*/
    1, /*idGrupo int(11) NOT NULL REFERENCES grupo(id),*/
    1
);
