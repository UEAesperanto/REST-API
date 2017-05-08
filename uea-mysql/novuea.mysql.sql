/*Notoj:

Ĉiuj prezoj estas konservitaj kiel integer laŭ valuto cento da eŭro: tio permesas ne bezoni konservi al float.

 */


/***** ĜENERALAĴOJ PRI LA DATUMBAZO *****/

/*La celo de tiu ĉi tabelo estas gardi la ŝanĝojn faritajn en la datumbazo*/
CREATE TABLE sxangxhistorio (
  id int(11) PRIMARY KEY,
  tabelo varchar(255), /*la tabelo en kiu la ŝanĝoj estis faritaj, ekzemple: lando*/
  kampo varchar(255), /*la kampo en kiu la ŝanĝoj estis faritaj, ekzemple: nomoEo*/
  antauxa_valoro varchar(255), /*la antaǔa valoro de la kampo, eĉ se ĝi ne estis varchar, ĝi iĝos, ekzemple: Brasilo*/
  farita_de int(11) NULL REFERENCES uzantoAuxAsocio(id), /*kiu faris la ŝanĝon, se ne estas datumoj, estos null*/
  dato date /*kiam la ŝanĝo okazis*/
);

/*datumoj el ueadb:landokodo*/
CREATE TABLE lando (
    id int(11) PRIMARY KEY,
    nomoLoka varchar(255),
    nomoEo varchar(255),
    landkodo varchar(255)
);

/*datumoj el ueadb:urboj*/
CREATE TABLE urbo (
    id int(11) PRIMARY KEY,
    nomoLoka varchar(255),
    nomoEo varchar(255),
    idLando int(11) REFERENCES lando(id)
);

CREATE TABLE faktemo (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

 /***** KERNO PRI MEMBROJ KAJ ASOCIOJ *****/
CREATE TABLE uzantoAuxAsocio (
    id int(11) PRIMARY KEY,
    ueakodo varchar(255),
    uzantnomo varchar(255), /*por reteja uzado: datumoj el retdb:uzantaro*/
    pasvorto text  /*devus iĝi sha1 (laŭ transirebleco) datumoj el retdb:uzantaro*/
);

/*datumoj el ueadb:tuta1
 Mi nomiĝis tiun tabelon "uzanto" ĉar ĝi povas havi linioj pri ne membroj sed
simplaj uzantoj. Estas la tabelo aneco kiu permesas dedukti la membrecon.
 */
CREATE TABLE uzanto (
    id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id),
    personanomo varchar(255),
    familianomo varchar(255),
    personanomoIdentigilo varchar(255), /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo varchar(255), /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso varchar(255),
    posxtkodo varchar(255),
    logxurbo int(11) REFERENCES urbo(id),
    nacialando int(11) REFERENCES lando(id),
    naskigxtago date,
    mortdatekscio date NULL,  /*dato al kiu uea ekscias pri mortdato.*/
    mortdato date NULL, /*vera mortdato*/
    notoj varchar(255),
    profesio varchar(255),
    retposxto varchar(255),
    telhejmo varchar(255) NULL,
    teloficejo varchar(255) NULL,
    telportebla varchar(255) NULL,
    kerekzameno boolean, /*ĉu oni sukcesis KER Ekzamenko?*/
    kernivelo varchar(2) NULL, /*la nivelo laux eǔropa referenckadro, A2, B1, ktp. */
    kerdato date NULL, /*dato en kiu KER ekzameno estis farita*/
    tttpagxo varchar(255) NULL,
    validaKonto bool,
    abc varchar(255) /*estis abc */
);

/*kaze iu uzanto kreos sanĝproponon al sia profilo, ĝi devos atendi aprobon de oficisto*/
CREATE TABLE uzanto_sangxpropono (
    id int(11) PRIMARY KEY,
    id_uzanto int(11) REFERENCES uzanto(id),
    personanomo varchar(255),
    familianomo varchar(255),
    personanomoIdentigilo varchar(255), /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo varchar(255), /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso varchar(255),
    posxtkodo varchar(255),
    logxurbo int(11) REFERENCES urbo(id),
    nacialando int(11) REFERENCES lando(id),
    naskigxtago date,
    mortdatekscio date NULL,  /*dato al kiu uea ekscias pri mortdato.*/
    mortdato date NULL, /*vera mortdato*/
    notoj varchar(255),
    profesio varchar(255),
    retposxto varchar(255),
    telhejmo varchar(255),
    teloficejo varchar(255),
    telportebla varchar(255),
    tttpagxo varchar(255),
    validakonto bool,
    abc varchar(255) /*estis abc */
);

/*datumoj el ueadb:membroj, ueadb:asocioj kaj retdb:fakasocioj*/
CREATE TABLE asocio(
    id int(11) PRIMARY KEY REFERENCES uzantoAuxAsocio(id),
    nomo varchar(255),
    siglo varchar(255),
    adreso varchar(255),
    fondigxdato date,
    posxtkodo varchar(255),
    urbo int(11) NULL REFERENCES urbo(id),
    telhejmo varchar(255),
    landokodo varchar(255),
    retposxto varchar(255),
    delegFako varchar(255),
    tttpagxo varchar(255),
    abc varchar(255)
);

/*kaze iu asocio kreos sanĝproponon al sia profilo, ĝi devos atendi aprobon de oficisto*/
CREATE TABLE asocio_sangxpropono(
    id int(11) PRIMARY KEY,
    id_asocio int(11) REFERENCES asocio(id),
    nomo varchar(255),
    siglo varchar(255),
    adreso varchar(255),
    fondigxdato date,
    posxtkodo varchar(255),
    urbo int(11) NULL REFERENCES urbo(id),
    telhejmo varchar(255),
    landokodo varchar(255),
    retposxto varchar(255),
    delegFako varchar(255),
    tttpagxo varchar(255),
    abc varchar(255)
);

CREATE TABLE ref_fakasocio(
    idAsocio int(11) REFERENCES asocio(id),
    idFaktemo int(11) REFERENCES faktemo(id),
    PRIMARY KEY(idAsocio, idFaktemo)
);

CREATE TABLE ref_landasocio(
    idAsocio int(11) REFERENCES asocio(id),
    idLando int(11) REFERENCES lando(id),
    PRIMARY KEY(idAsocio, idLando)
);

/*La peranto povas esti asocio aŭ membro*/
/*datumoj el ueadb:perant*/
CREATE TABLE peranto (
    id int(11) PRIMARY KEY,
    idUeakodo int(11) REFERENCES uzantoAuxAsocio(id),
    idLando int(11) REFERENCES lando(id)
);

/*** PRI GRUPOJ DE UZANTOJ ***/
/*la uzantoj povas esti en grupoj, kiel estraro, komisiono, delegito, indivudua membraro ktp*/
CREATE TABLE grupo (
  id int(11) PRIMARY KEY,
  nomo varchar(255),
  priskribo varchar(255),
  kategorio varchar(255), /*ekzemple, komisiono*/
  id_asocio int(11) NULL REFERENCES asocio(id) /*la grupo povas aparteni al asocio*/
);

CREATE TABLE aneco (
  id int(11) PRIMARY KEY, /*povas esti ke iu anu plurfoje en malsimilaj tempoj en la sama grupo, pro tio ne estas id_uzanto + id_grupo*/
  idUzanto int(11) REFERENCES uzanto(id),
  idGrupo int(11) REFERENCES grupo(id),
  komencdato date, /*la dato en kiu la uzanto ekanis en la grupo*/
  findato date NULL, /*la dato en kiu la uzanto eliris la grupon*/
  dumviva boolean, /*ĉu temas pri dumviva aneco?*/
  tasko varchar(255) NULL, /*kiu estas la tasko de la ano en la grupo?*/
  respondeco varchar(255) NULL, /*kiu estas la respondeco de la ano en la grupo?*/
  observoj varchar(255) NULL /*Aldona kampo kaze observoj pri la aneco estos bezonataj*/
);

CREATE TABLE aneckotizo (
  id int(11) PRIMARY KEY,
  prezo int(11),
  priskribo varchar(255), /*ekzemple: "Aneco por junaj dumvivaj membroj el B landoj"*/
  idGrupo int(11) REFERENCES grupo(id)
);

/*** PRI LA ADMINISTRADO ***/
CREATE TABLE administranto (
  id int(11) PRIMARY KEY,
  idUzantoAuxAsocio int(11) NULL REFERENCES uzantoAuxAsocio(id), /*la admnistranto povas esti aǔ ne uzanto aǔ asocio*/
  uzantnomo varchar(255),
  pasvorto varchar(255) /*devus iĝi sha1*/
);

CREATE TABLE ref_administranto_adminrajto (
  idAdministranto int(11) REFERENCES administranto(id),
  idAdminrajto int(11) REFERENCES adminrajto(id),
  PRIMARY KEY(idAdministranto, idAdminrajto)
);

CREATE TABLE adminrajto (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/***** LIGITA AL LA dissenda sistemo *****/
/*dissendo temas pri iu dissendaĵo farita al specifaj grupoj.*/
/*datumoj el ueadb:dissendoj*/
CREATE TABLE dissendo (
  id int(11) PRIMARY KEY,
  dissendanto int(11) REFERENCES uzanto(id),
  nomede varchar(255), /*Kampo pri la nomo de la aŭtoro, povas esti `Mark Fettes - Prezidanto de UEA`*/
  dato date,
  temo varchar(255),
  teksto varchar(255)
);

/*dissendoj povas enhavi enketojn, tiu kaze la demanderon aperas en tiu ĉi
 * tabelo.*/
/*datumoj el ueadb:dissendo_enketoj*/
CREATE TABLE dissendo_demandero (
  id int(11) PRIMARY KEY,
  idDissendo int(11) REFERENCES dissendo(id),
  demNum int(11),  /*pozicio de la demandero*/
  demTeksto  varchar(255)
);

CREATE TABLE ref_dissendo_respondoj (
  idUzantoAuxAsocio int(11) REFERENCES uzantoAuxAsocio(id), /*la respondanto*/
  idDissendoDemandero int(11) REFERENCES dissendo_demandero(id),
  PRIMARY KEY(idUzantoAuxAsocio, idDissendoDemandero)
);

/*datumoj el retdb:abonoj:abono */
CREATE TABLE retlisto(
  id int(11) PRIMARY KEY,
  nomo varchar(255),
  priskribo varchar(255)
);

/*datumoj el retdb:abonoj */
CREATE TABLE retlist_abono(
  id int(11) PRIMARY KEY,
  ekde date,  /*estis tempo*/
  abono int(11) REFERENCES retlisto(id),
  id_uzanto int(11) REFERENCES uzanto(id), /*povas esti null se ne farita tra iu konto*/
  formato_html boolean, /*se true do html, se ne do teksto */
  kodigxo_utf8 boolean, /*se true do utf8, se ne do x-sistemo*/
  retadreso varchar(255) NULL /*null signifas ke id_uzanto estas definita kaj ke ni uzas retadreson de la uzanto.*/
);

/***** LIGITA AL VOĈDONA SISTEMO *****/
CREATE TABLE vocxdonado (
  id int(11) PRIMARY KEY,
  titolo varchar(255),
  priskribo varchar(1200),
  pluraj_opcioj boolean, /*Ĉu oni rajtos elekti pluraj opcioj?*/
  anonima boolean, /*Ĉu oni rajtos voĉdoni anonime?*/
  aperdato date, /*la tago je kiu la voĉdonado ekis*/
  limdato date /*la tago je kiu la voĉdonado finiĝ(is/os)*/
);

/*la opcioj elekteblaj*/
CREATE TABLE opcio (
  id int(11) PRIMARY KEY,
  priskribo varchar(255),
  idVocxdonado int(11) REFERENCES vocxdonado(id)
);

/*rilato inter la grupoj de homoj kiuj rajtas voĉdoni kaj voĉdonadoj*/
CREATE TABLE rajtas_vocxdoni (
  idVocxdonado int(11) REFERENCES vocxdonado(id),
  idGrupo int(11) REFERENCES grupo(id),
  PRIMARY KEY(idVocxdonado, idGrupo)
);

/*la rezultoj estos kalkulataj laux la apero de opcioj en vocxoj*/
CREATE TABLE vocxo (
  id int(11) PRIMARY KEY,
  idUzanto int(11) NULL REFERENCES uzanto(id), /*Null kaze oni rajtos voĉdoni anonime*/
  idOpcio int(11) REFERENCES opcio(id)
);

/***** LIGITA AL LA UK (aŭ aliaj kongresoj)*****/
CREATE TABLE kongreso (
    id int(11) PRIMARY KEY,
    titolo varchar(255),
    idUrbo int(11) REFERENCES urbo(id),
    jaro date,
    numero int(11),
    komencdato date,
    priskribo varchar(255),
    findato date
);

CREATE TABLE aligxkotizo (
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    prezo int(11),
    priskribo varchar(255)
);

/*por kongresoj kiuj povas okazi krom la ĉefa kongreso, ekzemple, antaǔ kongreso dum UK*/
CREATE TABLE ref_kongreso_kroma_kongreso (
   id_cxefa_kongreso int(11) REFERENCES kongreso(id),
   id_kroma_kongreso int(11) REFERENCES kongreso(id),
   PRIMARY KEY(id_cxefa_kongreso, id_kroma_kongreso)
);

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
*/
CREATE TABLE kongresa_programejo(
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    nomo varchar(255),
    priskribo varchar(255)
);

/*datumoj el uea:programo*/
CREATE TABLE kongresa_programo (
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    komenctempo date,
    fintempo date,
    evento varchar(255),
    programejo int(11) REFERENCES kongresa_programejo(id)
);

/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE kongresa_aligxinto (
    id int(11) PRIMARY KEY,
    kongresaNumero int(11),
    idUzanto int(11) REFERENCES uzanto(id),
    idAligxkotizo int(11) REFERENCES aligxkotizo (id),
    idKongreso int(11) REFERENCES kongreso(id)
);

CREATE TABLE kongresa_logxejo (
    id int(11) PRIMARY KEY,
    kongreso int(11) REFERENCES kongreso(id),
    ordig int(11), /*ordo de apero sur la retejo aŭ kongresa libro*/
    rango int(11), /*kvalito, kvanto da steloj*/
    adreso varchar(255),
    foreco varchar(255),
    priskribo varchar(255),
    retejo varchar(255),
    retadreso varchar(255),
    telefono varchar(255),
    fakso varchar(255),
    notoj varchar(255)
);


CREATE TABLE kongresa_dormcxambrsxablono (
    id int(11) PRIMARY KEY,
    litKvanto int(11),
    personKvanto int(11),
    prezo int(11),
    nomo varchar(255)
);

CREATE TABLE kongresa_dormcxambro (
    id int(11) PRIMARY KEY,
    nomo varchar(255) NULL,
    logxejo int(11) REFERENCES kongresa_logxejo(id),
    id_dormcxambrsxablono int(11) REFERENCES dormcxambrsxablono(id)
);

/*Permesas al iu aligxinto mendi logxejon*/
CREATE TABLE ref_aligxinto_logxejo(
    idAligxinto int(11) REFERENCES kongresa_aligxinto(id),
    idDormcxambro int(11) NULL REFERENCES kongresa_dormcxambro(id), /*kaze ne estos ankoraǔ difinita, povus esti NULL*/
    alvendato date,
    forirdato date,
    kvanto int(11), /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
    kunkogxantoj varchar(255) /*la mendo estas simpla teksta kampo, la sistemo traktos tion kiel homoj kiuj logxas en la cxambro kun la sama id*/
);

CREATE TABLE kongresa_ekskurso (
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    titolo varchar(255),
    priskribo varchar(255),
    dato date,
    prezo int(11),
    kvanto int(11)
);

CREATE TABLE ref_kongresa_ekskurso_mendo (
  idKAligxinto int(11) REFERENCES kongresa_aligxinto(id),
  idKEkskurso int(11) REFERENCES kongresa_ekskurso(id),
  PRIMARY KEY(idKAligxinto, idKEkskurso)
);

/**** PRI LA REVUO ESPERANTO KAJ KONTAKTO ***/
/*datumoj el uea:abonoj*/
CREATE TABLE teko(
  id int(11) PRIMARY KEY,
  titolo varchar(255),
  elnomo varchar(255), /*nomo de la pdf dosiero*/
  kodnomo varchar(255), /*ekzemplo: `eo_okt06`*/
  jaro int(11),
  absnum varchar(255),
  vido boolean
);


/*nova tablo: mi ne trovis kie estas konservita tiun rilaton*/
/*el retdb:abmendo */
CREATE TABLE ref_teko_grupo (
  id int(11) PRIMARY KEY,
  idTeko int(11) REFERENCES teko(id),
  idUzantoAuxAsocio int(11) REFERENCES uzantoAuxAsocio(id),
  jaro int(11)
);

/***** LIGITA AL LA spezoj (peranto) *****/

/*el ueadb:spezaro (ili havas tipon 1 kaj kategorio kiel "270;;0;0;0;;0;0;0".*/
CREATE TABLE kongresa_spezraporto (
  id int(11) PRIMARY KEY,
  dato date,
  idPeranto int(11) REFERENCES peranto(id),
  valuto varchar(255),
  noto varchar(255),
  validita bool, /*akceptita de administranto*/
  printia bool

);

/*Ero de kongresa spezraporto*/
CREATE TABLE kongresa_spezraportero (
  id int(11) PRIMARY KEY,
  idKongresaSpezraporto int(11) REFERENCES kongresa_spezraporto(id),
  idUzanto int(11) NULL REFERENCES uzantoAuxAsocio(id), /*povas esti 'NULL' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'NULL.*/
  nomoUzanto varchar(255) NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  kongresaKotizo int(11),
  kongresajMendoj int(11)
);

/*
  kongresa spezraporto_pag_kampo: simpla kampo por kiu oni povas pagi.
  Ekzemploj nunaj:
    - donaco_uk,
    - blindula_kaso,
    - infana_kongreseto,
    - canuto,
    - triamonda,
    - volontula
  */
CREATE TABLE ks_pag_kampo(
  id int(11) PRIMARY KEY,
  priskribo varchar(255),
  defauxltaValuto int(11) DEFAULT 0
);

CREATE TABLE ref_kongresa_spezraportero_ks_pag_kampo(
  idKongresaSpezraportero int(11) REFERENCES kongresa_spezraportero(id),
  idKsPagKampo int(11) REFERENCES ks_pag_kampo(id),
  sumo int(11),
  PRIMARY KEY(idKongresaSpezraportero, idKsPagKampo)
);

/*el ueadb:spezaro kaj ueadb:spezo (ili havas tipon 0) */
CREATE TABLE gxen_spezraporto (
  id int(11) PRIMARY KEY,
  dato date,
  idPeranto int(11) REFERENCES peranto(id),
  valuto varchar(255),
  noto varchar(255),
  validita bool, /*akceptita de administranto*/
  printita bool
);

CREATE TABLE gxen_spezraporto_kotizo (
  id int(11) PRIMARY KEY,
  idGxenSpezraporto int(11) REFERENCES gxen_spezraporto(id),
  idUzanto int(11) NULL REFERENCES uzantoAuxAsocio(id), /*povas esti 'NULL' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'NULL.*/
  nomoUzanto varchar(255) NULL, /*Null por uea uzanto, alikaze permesas identigi la perata ento.*/
  idAnoGrupo int(11) REFERENCES grupo(id)

);

CREATE TABLE gxen_spezraportero (
  id int(11) PRIMARY KEY,
  idGxenSpezraporto int(11) REFERENCES gxen_spezraporto(id),
  enspezo bool, /*Se true do enspezo, Se false do elspezo*/
  priskribo varchar(255),
  sumo int(11)
);
/***************/
