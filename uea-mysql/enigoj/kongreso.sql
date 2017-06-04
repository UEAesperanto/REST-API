INSERT INTO kongreso ()
VALUES (
    1, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
    "UK", /*titolo varchar(255),8*/
    "bildo varchar(255)", /*la kongresa bildo aux logoo*/
    2, /*idUrbo int(11) REFERENCES urbo(id),*/
    "2018-01-01",
    103,
    "2018-08-10",
    "temo varchar(255)",
    "priskribo varchar(255)",
    "2018-08-16"
);

INSERT INTO kongreso ()
VALUES (
    2, /*id int(11) PRIMARY KEY AUTO_INCREMENT,*/
    "UK posta kongreso", /*titolo varchar(255),8*/
    "bildo varchar(255)", /*la kongresa bildo aux logoo*/
    2, /*idUrbo int(11) REFERENCES urbo(id),*/
    "2018-01-01",
    103,
    "2018-08-10",
    "temo varchar(255)",
    "priskribo varchar(255)",
    "2018-08-16"
);

INSERT INTO ref_kongreso_kroma_kongreso()
VALUES (
  1,
  2
);
