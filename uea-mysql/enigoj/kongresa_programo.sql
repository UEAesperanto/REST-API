CREATE TABLE kongresa_programo (
    1, /*id int(11) PRIMARY KEY AUTO_INCREMENT*/
    1, /*idKongreso int(11) REFERENCES kongreso(id),*/
    "2018-01-01", /*komenctempo date,*/
    "2018-01-30", /*fintempo date,*/
    "evento", /*evento varchar(255),*/
    "priskribo", /*priskribo varchar(1600),*/
    1, /*idkategorio int (11) REFERENCES kongresa_programo_kategorio(id),*/
    1, /*idprogramejo int(11) REFERENCES kongresa_programejo(id)*/
);
