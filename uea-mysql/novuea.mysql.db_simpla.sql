/*Notoj:

Ĉiuj prezoj estas konservitaj kiel integer laŭ valuto cento da eŭro: tio permesas ne bezoni konservi al float.

 */

 /***** KERNO PRI MEMBROJ KAJ ASOCIOJ *****/
CREATE TABLE uzantoAuxAsocio (
    id int(11) PRIMARY KEY,
    ueakodo varchar(255)
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

/*datumoj el ueadb:tuta1
 Mi nomiĝis tiun tabelon "uzanto" ĉar ĝi povas havi linioj pri ne membroj sed
simplaj uzantoj. Estas la tabelo ref_uzantoAuxAsocio_anokategorio kiu permesas
dedukti la membrecon.
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
    telhejmo varchar(255),
    teloficejo varchar(255),
    telportebla varchar(255),
    tttpagxo varchar(255),
    validaKonto bool,
    abc varchar(255) /*estis abc */
);

CREATE TABLE adminrajto (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/*Permesas havi grupojn da uzantoj kun samaj rajtoj*/
CREATE TABLE rajtgrupo (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

CREATE TABLE ref_rajtgrupo_uzanto (
    idRajtgrupo int(11) REFERENCES rajtgrupo(id),
    idUzanto int(11) REFERENCES uzanto(id),
    PRIMARY KEY(idRajtgrupo, idUzanto)
);

/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE ref_rajtgrupo_adminrajto (
    idRajtgrupo int(11) REFERENCES rajtgrupo(id),
    idAdminrajto int(11) REFERENCES adminrajto(id),
    PRIMARY KEY(idRajtgrupo, idAdminrajto)
);


/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE ref_uzanto_adminrajto (
    idAdminrajto int(11) REFERENCES adminrajto(id),
    idUzanto int(11) REFERENCES uzanto(id),
    PRIMARY KEY(idAdminrajto, idUzanto)
);

CREATE TABLE komitatkategorio (
    id int(11) PRIMARY KEY,
    nomo varchar(255)
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

/*datumoj el ueadb:komit*/
CREATE TABLE komitato (
    id int(11) PRIMARY KEY,
    idUzanto int(11) REFERENCES uzanto(id),
    idAsocio int(11) NULL REFERENCES asocio(id),
    idKomitatkategorio int(11) REFERENCES komitatkategorio(id)
);

/*La peranto povas esti asocio aŭ membro*/
/*datumoj el ueadb:perant*/
CREATE TABLE peranto (
    id int(11) PRIMARY KEY,
    idUeakodo int(11) REFERENCES uzantoAuxAsocio(id),
    idLando int(11) REFERENCES lando(id)
);

/*datumoj el retdb:taskoj*/
CREATE TABLE tasko (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/*datumoj el retdb:taskoj*/
CREATE TABLE ref_tasko_uzanto (
    idTasko int(11) REFERENCES tasko(id),
    idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
    PRIMARY KEY(idTasko, idUzanto)
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE respondeco (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE ref_respondeco_uzanto (
    idRespondeco int(11) REFERENCES respondeco(id),
    idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
    PRIMARY KEY(idRespondeco, idUzanto)
);

/*nova tablo, sed el retdb:fakasocio columno 'kategorio'*/
CREATE TABLE delegito (
    idUzanto int(11) REFERENCES uzanto(id),
    idLando int(11) REFERENCES lando(id),
    PRIMARY KEY(idUzanto, idLando)
);

CREATE TABLE faktemo (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
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

/*nova tablo, enhavas la diversajn membrecajn kategoriojn*/
CREATE TABLE anokategorio (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/*nova tablo, povas esti kreita rigardante ueadb:asocioj:konstkat kaj ueadb:membroj:konstkat*/
CREATE TABLE ref_uzantoAuxAsocio_anokategorio(
    id int(11) PRIMARY KEY,
    idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
    jaro int(11) NULL,
    idKategorio int(11) REFERENCES anokategorio(id)
);

/*Mi ne vidis tiun tablon en la ekzistantaj datumbazoj, sed ĝi ie devas ekzisti por permesi akiri prezon pro kotizo laŭ lando.
 Ĝi eventuale povus esti tiel farita ke ni konsideru lando kategorio sistemo.
 */
CREATE TABLE ref_anokategorio_lando (
  idAnokategorio int(11) REFERENCES anokategorio(id),
  idLando int(11) REFERENCES lando(id),
  aligxPrezo int(11),
  PRIMARY KEY(idAnokategorio, idLando)
);

/*nova tablo, permesas fari grupojn de uzantoj laŭ kriterioj kiuj ne rilatas al membreco aŭ kotizo. */
CREATE TABLE uzantogrupo (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

CREATE TABLE ref_uzantoAuxAsocio_uzantogrupo(
    idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
    idGrupo int(11) REFERENCES uzantogrupo(id),
    PRIMARY KEY (idUzanto, idGrupo)
);

/***** LIGITA AL LA MONKONTA SISTEMO *****/

/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE konto (
    id int(11) PRIMARY KEY,
    posedanto int(11) NULL REFERENCES uzantoAuxAsocio(id),
    ueaPosedanto varchar(255) NULL /*por diversaj uea kontoj, ili ne estas ligita al iu uzantoAuxAsocio sed al UEA internaĵo.*/
);

/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE gxiro (
    id int(11) PRIMARY KEY,
    sumo int(11),
    dato date,
    elKonto int(11) NULL REFERENCES konto(id), /*NULL signifus kredito el ekstero (el bankonto de la uzanto, el UEA)*/
    alKonto int(11) NOT NULL REFERENCES uzantoAuxAsocio(id),
    priskribo varchar(255)
);

CREATE TABLE gxirpropono (
    id int(11) PRIMARY KEY,
    idGxiro int(11) REFERENCES gxiro(id),
    idEl int(11) REFERENCES uzantoAuxAsocio(id),
    kialo varchar(255)
);

CREATE TABLE aprobitagxiro (
    id int(11) PRIMARY KEY,
    idGxirpropono int(11) REFERENCES gxirpropono(id),
    aprobitaDe int(11) REFERENCES uzantoAuxAsocio(id)
);


/***** LIGITA AL LA RETEJO *****/

/* Ĉu ne-membroj povas esti retUzantoj?? Mi supozas ke ne */
/*datumoj el retdb:uzantaro*/
CREATE TABLE retUzanto (
    id int(11) PRIMARY KEY REFERENCES uzanto(id),
    kromnomo varchar(255),
    pasvorto text  /*devus iĝi sha1 (laŭ transirebleco)*/
);

/***** LIGITA AL LA dissenda sistemo *****/
/*dissendo temas pri iu dissendaĵo farita al specifaj anokategorioj.*/
/*datumoj el ueadb:dissendoj*/
CREATE TABLE dissendo (
  id int(11) PRIMARY KEY,
  dissendanto int(11) REFERENCES uzanto(id),
  nomede varchar(255), /*Kampo pri la nomo de la aŭtoro, povas esti `Mark Fettes - Prezidanto de UEA`*/
  dato date,
  temo varchar(255),
  teksto varchar(255)
);

/*La tabelo kiu diras al kiu iu dissendo estas sendita.*/
CREATE TABLE ref_dissendo_anokategorioj (
  idDissendo int(11) REFERENCES dissendo(id),
  idAnokategorio int(11) REFERENCES anokategorio(id),
  PRIMARY KEY(idDissendo, idAnokategorio)
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
  idUzantoAuxAsocio int(11) REFERENCES uzantoAuxAsocio(id), /*La respondanto*/
  idDissendoDemandero int(11) REFERENCES dissendo_demandero(id),
  PRIMARY KEY(idUzantoAuxAsocio, idDissendoDemandero)
);

/*datumoj el ueadb:gazkom*/
CREATE TABLE gazkom(
  id int(11) PRIMARY KEY,
  num int(11),
  numero int(11),
  dato date,
  titolo varchar(255),
  subtitolo varchar(255), /* el gazkom:ttit*/
  htmlTeksto varchar(255),
  bazTeksto varchar(255)
);

CREATE TABLE teko(
  id int(11) PRIMARY KEY,
  titolo varchar(255),
  elnomo varchar(255), /*nomo de la pdf dosiero*/
  kodnomo varchar(255), /*ekzemplo: `eo_okt06`*/
  jaro int(11),
  absnum varchar(255),
  vido bool
);

/***** LIGITA AL LA UK (aŭ aliaj kongresoj)*****/

CREATE TABLE antauxDumPostKongreso(
    id int(11) PRIMARY KEY
);

CREATE TABLE kongreso (
    id int(11) PRIMARY KEY REFERENCES antauxDumPostKongreso(id),
    idUrbo int(11) REFERENCES urbo(id),
    jaro date,
    numero int(11),
    komencdato date,
    findato date
);

/*nova tablo*/
CREATE TABLE uk (
    id int(11) PRIMARY KEY REFERENCES kongreso(id),
    idUrbo int(11) REFERENCES urbo(id),
    temo varchar(255)
);

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
*/
CREATE TABLE k_loko(
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    nomo varchar(255),
    priskribo varchar(255)
);

/*datumoj el uea:programo*/
CREATE TABLE k_Programo (
    id int(11) PRIMARY KEY,
    idKongreso int(11) REFERENCES kongreso(id),
    komenctempo date,
    fintempo date,
    evento varchar(255),
    loko int(11) REFERENCES k_loko(id)
);

/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE k_aligxinto (
    id int(11) PRIMARY KEY,
    kongresaNumero int(11),
    idUzanto int(11) NULL REFERENCES uzanto(id), /*povas esti uzanto aŭ ne*/
    id_kongreso int(11) REFERENCES kongreso(id),
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
    loĝurbo int(11) REFERENCES urbo(id),
    nacialando int(11) REFERENCES lando(id),
    naskigxtago varchar(255),
    mortdato varchar(255) NULL,
    notoj varchar(255),
    profesio varchar(255),
    retposxto varchar(255),
    telhejmo varchar(255),
    teloficejo varchar(255),
    telportebla varchar(255),
    tttpagxo varchar(255),
    abc varchar(255) /*estis abc */
);

/*datumoj el uea:hoteloj
 Mi ne komprenas la signifon de ordo, ordig kaj rango el la pasinta tablo
uea:hoteloj.
 */
CREATE TABLE k_hotelo (
    id int(11) PRIMARY KEY,
    idKongresoAuxAntauxPost int(11) REFERENCES antauxDumPostKongreso(id),
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

/*Ĉu estas grava se la sistemo por reservo de hotelo ne povas enhavi la datumon de la pasintaj tempoj?*/

/*nova tablo.
Ĝi permesos al administranto krei ĉambrtipon laŭ bezono.
 */
CREATE TABLE k_h_cxambrotipo (
    id int(11) PRIMARY KEY,
    litKvanto int(11),
    personKvanto int(11),
    nomo varchar(255)
);

CREATE TABLE k_hotelo_cxambrotipo (
    id int(11) PRIMARY KEY,
    kHotelo int(11) REFERENCES k_hotelo(id),
    kHCxambrotipo int(11) REFERENCES k_h_cxambrotipo(id),
    prezo int(11),
    kvanto int(11)
);

/*Permesas al iu aligxinto mendi hotelon*/
CREATE TABLE k_hotelo_mendo (
    id int(11) PRIMARY KEY,
    idKAligxinto int(11) REFERENCES k_aligxinto(id),
    kHoteloCxambrotipo int(11) REFERENCES k_hotelo_cxambrotipo(id),
    alvendato date,
    forirdato date,
    kvanto int(11), /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
    kunkogxantoj varchar(255) /*Simpla teksta kampo, tiel ke plenigita de la uzanto. La sistemo poste tradukas tion per la tablo k_h_kunlogxanto.*/
);

CREATE TABLE ref_k_h_kunlogxanto (
    idHMendo int(11) REFERENCES k_hotelo_mendo(id),
    idKAligxinto int(11) REFERENCES k_aligxinto(id),
    PRIMARY KEY(idHMendo, idKAligxinto)
);

/*datumoj el uea:akpk*/
CREATE TABLE k_antauxKajPost (
    id int(11) PRIMARY KEY REFERENCES antauxDumPostKongreso(id),
    idKongreso int(11) REFERENCES kongreso(id),
    titolo varchar(255),
    komencdato date,
    findato date,
    revenLoko varchar(255),
    priskribo varchar(255),
    kvanto int(11)
);

CREATE TABLE k_ekskurso (
    id int(11) PRIMARY KEY,
    idKongresoAuxAntauxPost int(11) REFERENCES antauxDumPostKongreso(id),
    titolo varchar(255),
    priskribo varchar(255),
    dato date,
    kvanto int(11)
);

CREATE TABLE ref_k_ekskurso_mendo (
  idKAligxinto int(11) REFERENCES k_aligxinto(id),
  idKEkskurso int(11) REFERENCES k_ekskurso(id),
  PRIMARY KEY(idKAligxinto, idKEkskurso)
);


/***** LIGITA AL LA libroservo *****/

/*datumoj el uea:ls*/
CREATE TABLE ref_k_antauxKAjPost_mendo (
  idKAligxinto int(11) REFERENCES k_aligxinto(id),
  idKAntauxKajPost int(11) REFERENCES k_antauxKajPost(id),
  PRIMARY KEY(idKAligxinto, idKAntauxKajPost)
);

CREATE TABLE ls_verkisto( /*aux auxtoro, aux tradukisto, aux kontribuanto*/
  id int(11) PRIMARY KEY,
  familinomo varchar(255),
  personanomo varchar(255),
  idMembro int(11) NULL REFERENCES uzanto(id)
);

CREATE TABLE ls_kategorio(
  id int(11) PRIMARY KEY,
  nomo varchar(255),
  priskribo varchar(255)
);

CREATE TABLE ls_subkategorio(
  id int(11) PRIMARY KEY,
  nomo varchar(255),
  priskribo varchar(255)
);

CREATE TABLE ls_sxlosilvorto(
  id int(11) PRIMARY KEY,
  vorto varchar(255)
);

/*Helpos trovi libron laŭ eldonisto kaj havi organizitan eldonistan liston
 Plenigita el ueadb:eldonitade
 */
CREATE TABLE ls_eldonisto(
  id int(11) PRIMARY KEY,
  nomo varchar(255)
);

/*datumoj el uea:ls*/
CREATE TABLE libroservo(
  id int(11) PRIMARY KEY,
  kodo varchar(9),
  jaro date,
  prezo int(11), /* *cent por havi ĝin en centoj */
  rabatoricevita int(11),
  rabatodonata int(11),
  fakturtitolo varchar(255),
  titolo varchar(255),
  aldonatitolo varchar(255),
  idAuxtoro int(11) REFERENCES ls_verkisto(id),
  kontribuantoj varchar(255), /*TODO: ĉu nova table ls_kontribuantoj kiu ligas intger libroservo kaj ls_verkisto*/
  idKategorio int(11) REFERENCES ls_kategorio(id),
  idSubkategorio int(11) REFERENCES ls_subkategorio(id),
  idTradukisto int(11) REFERENCES ls_verkisto(id),
  lingvajinformoj varchar(255),
  eldonloko int(11) REFERENCES urbo(id),
  idEldonisto int(11) REFERENCES ls_eldonisto(id),
  eldonjaro date,
  imposto int(11),
  isbnissn varchar(255),
  alteco varchar(255),
  pagxnombro int(11),
  acxetprezo int(11),  /* *cent por havi ĝin en centoj */
  acxetvaluto int(11), /* *cent por havi ĝin en centoj */
  stokvaloro int(11), /* *cent por havi ĝin en centoj */
  dato date,
  enirukat varchar(255), /*TODO: mi ne komprenas tiun kampon*/
  mendoloke varchar(255),
  aldInf varchar(255),
  laDeRe varchar(255),
  recEnRe varchar(255),
  specialajInf varchar(255),
  katalogaKlar varchar(255),
  kvanto int(11),
  komisiakvanto int(11)
);

/*datumoj el ueadb:brok */
CREATE TABLE brok(
  id int(11) PRIMARY KEY, /*el uea:bvar*/
  titolo varchar(255),
  idKategorio int(11) REFERENCES ls_kategorio(id),
  idSubkategorio int(11) REFERENCES ls_subkategorio(id),
  idTradukisto int(11) REFERENCES ls_verkisto(id),
  eldonloko int(11) REFERENCES urbo(id),
  eldonjaro int(11),
  eldI varchar(255), /*povas esti '1a', '2a korektita' ... do bezonas esti 'string'*/
  pagxoj int(11),
  prezo int(11),
  kvanto int(11),
  bind varchar(255),
  aldone varchar(255),
  posedanto varchar(255),
  loko varchar(255)
);

CREATE TABLE brok_periodajxo(
  id int(11) PRIMARY KEY,
  ueakodo varchar(255),
  titolo varchar(255),
  subtitolo varchar(255),
  bildo varchar(255),
  notoj varchar(255)
);

/*datumoj el ueadb:brok_periodajhoj */
CREATE TABLE brok_periodajxo_numero(
  id int(11) PRIMARY KEY,
  idPeriodjxoj int(11) REFERENCES brok_periodajxo(id),
  stato varchar(255),
  jaro int(11),
  jaro2 int(11) NULL, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numero varchar(255),
  monato int(11), /*de 1 ĝis 12*/
  monato2 int(11), /*de 1 ĝis 12, simila la 'jaro2'*/
  notoj varchar(255),
  prezokategorio varchar(255) NULL,
  prezo int(11) NULL, /*nur uzata se prezokategorio estas 'NULL'*/
  kvanto int(11),
  deponloko varchar(255),
  enskribitade varchar(255)
);

CREATE TABLE brok_periodajxoj_jarkolekto(
  id int(11) PRIMARY KEY,
  idPeriodjxoj int(11) REFERENCES brok_periodajxo(id),
  notoj varchar(255),
  stato varchar(255),
  prezokategorio varchar(255) NULL,
  prezo int(11) NULL, /*nur uzata se prezokategorio estas 'NULL'*/
  jaro int(11),
  jaro2 int(11) NULL, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numeroj varchar(255),
  kvanto int(11),
  deponloko varchar(255),
  enskribitade varchar(255)
);

CREATE TABLE ref_ls_ls_sxlosilvorto(
  idLs int(11) REFERENCES libroservo(id),
  idSxlosilvorto int(11) REFERENCES ls_sxlosilvorto(id),
  PRIMARY KEY(idLs, idSxlosilvorto)
);

CREATE TABLE brosxuro (
  id int(11) PRIMARY KEY,
  titolo varchar(255),
  idLando int(11) REFERENCES lando(id),
  loko varchar(255),
  eldonloko varchar(255),
  jaro int(11),
  prezo int(11),
  kvanto int(11),
  bildo varchar(255),
  formato varchar(255),
  pagxo int(11),
  stato varchar(255),
  notoj varchar(255)
);

CREATE TABLE recenzo (
  id int(11) PRIMARY KEY,
  vnum int(11), /*mi ne komprenis la signifon de tiu kampo*/
  kodo varchar(255),
  dato date,
  recTitolo varchar(255),
  recAutoro varchar(255),
  fonto varchar(255),
  ligilo varchar(255),
  recenzo varchar(255),
  nomo varchar(255), /*mi ne bone komprenas al kiu ĝi celas*/
  rajto bool
);

CREATE TABLE opinio (
  id int(11) PRIMARY KEY,
  num int(11),
  dato date,
  opinio varchar(255),
  nomo varchar(255)
);

/*Tiu korespondas al iu aĉeta ago sur la libro servo. varmendo_varoj ligas al ĝi kaj permesas scii kiujn varojn estis aĉetitaj.

el retdb:varmendintoj

 */
CREATE TABLE varmendo (
  id int(11) PRIMARY KEY,
  idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
  dato date,
  ricevantFamilinomo varchar(255) NULL, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantPersononomo varchar(255) NULL, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantAdreso varchar(255),
  ricevantUrbo varchar(255),
  ricevantPoŝtkdo varchar(255),
  idRicevantLando int(11) REFERENCES lando(id),
  ricevantTelkodo varchar(255),
  ricevantTelhejmo varchar(255),
  ricevantTeloficejo varchar(255),
  ricevantFakso varchar(255),
  ricevatRetadreso varchar(255),
  idPagmaniero varchar(255), /*TODO: pripensi bezono havi tiun kampon kun la nova pagsistemo kiu estos proponita.*/
  validigo varchar(255),
  notoj varchar(255),
  rabato int(11) NULL /*inter 0 kaj 100, estas rabata procento.*/
  /*la prezo ne aperas kiel kampo, ĝi estas kalkulita el la diversaj varmendo_varoj modifiita de la rabato. */
);

/*
el retdb:varmendo
 */
CREATE TABLE varmendo_varo (
    id int(11) PRIMARY KEY,
    idVarmendo int(11) REFERENCES varmendo(id),
    idLibroservo int(11) REFERENCES libroservo(id),
    kvanto int(11),
    pagsumo int(11), /*dum la mendo defaŭlte estas la varprezo, sed administranto povas ŝanĝi ĝin laŭ rabatoj. Tiu prezo estas sumo de la kvanto: se ni aĉetas 3 varoj kiuj kostas 500, ĝi enhavas 1500.*/
    avisumo int(11)
);

/**** PRI LA REVUO ESPERANTO KAJ KONTAKTO ***/

/*datumoj el uea:abonoj*/
CREATE TABLE revua_abono (
  id int(11) PRIMARY KEY,
  kodo varchar(255),
  titolo varchar(255),
  klarigo varchar(255),
  ofteco int(11),
  prezo int(11),
  aerposxto int(11),
  rete int(11),
  difinebla varchar(255),
  dprez int(11)
);

/*nova tablo: mi ne trovis kie estas konservita tiun rilaton*/
/*el retdb:abmendo */
CREATE TABLE ref_revua_abonantoj (
  id int(11) PRIMARY KEY,
  idRevuaAbono int(11) REFERENCES revua_abono(id),
  idUzantoAuxAsocio int(11) REFERENCES uzantoAuxAsocio(id),
  jaro int(11)
);

/*Por abonoj al revuoj
el retdb:abmendo
 */
CREATE TABLE varmendo_abono (
    id int(11) PRIMARY KEY,
    idVarmendo int(11) REFERENCES varmendo(id),
    idRevuaAbono int(11) REFERENCES revua_abono(id),
    prioritataPosxto bool,
    difino int(11),
    pagsumo int(11),
    avi int(11)
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
  nomoUzanto varchar(255) NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  idAnokategorio int(11) REFERENCES anokategorio(id)

);

CREATE TABLE gxen_spezraportero (
  id int(11) PRIMARY KEY,
  idGxenSpezraporto int(11) REFERENCES gxen_spezraporto(id),
  enspezo bool, /*Se true do enspezo, Se false do elspezo*/
  priskribo varchar(255),
  sumo int(11)
);
/***************/
