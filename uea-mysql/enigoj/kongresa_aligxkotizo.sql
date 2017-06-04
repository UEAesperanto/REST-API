INSERT INTO kongresa_aligxkotizo()
VALUES (
    1, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
    1, /*idKongreso int(11) REFERENCES kongreso(id),*/
    10, /*prezo int(11),*/
    "1996-05-15", /*gxis_naskigxjaro date NULL, /*maksimuma naskiĝitago por tiu aliĝkotizo*/
    0, /*landKategorio int(11) REFERENCES landKategorio(id), /*al kiu(j) lando(j) tiu kotizo indas*/
    1, /*grupo int(11) REFERENCES grupo(id), /*al kiu grupo de uzantoj tiu kategorio estas*/
    1, /*aligxperiodo int(11) REFERENCES aligxperiodo(id), /*al kiu aligxperiodo tio estas*/
    "priskribo varchar(1600)"
);
