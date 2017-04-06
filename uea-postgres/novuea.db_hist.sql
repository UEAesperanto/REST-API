/*Notoj:
 
Ĉiuj prezoj estas konservitaj kiel integer laŭ valuto cento da eŭro: tio permesas ne bezoni konservi al float.
 
 */


/***** KERNO PRI MEMBROJ KAJ ASOCIOJ *****/
CREATE TABLE uzantoAuxAsocio (
    id integer PRIMARY KEY,
    ueakodo character varying
);

/*datumoj el ueadb:landokodo*/
CREATE TABLE lando (
    id integer PRIMARY KEY,
    nomoLoka character varying,
    nomoEo character varying,
    landkodo character varying
);

/*datumoj el ueadb:urboj*/
CREATE TABLE urbo (
    id integer PRIMARY KEY,
    nomoLoka character varying,
    nomoEo character varying,
    idLando integer REFERENCES lando(id)
);

/*datumoj el ueadb:tuta1
 Mi nomiĝis tiun tabelon "uzanto" ĉar ĝi povas havi linioj pri ne membroj sed
simplaj uzantoj. Estas la tabelo ref_uzantoAuxAsocio_anokategorio kiu permesas
dedukti la membrecon.
 */
CREATE TABLE uzanto ( 
    id integer PRIMARY KEY REFERENCES uzantoAuxAsocio(id),
    personanomo character varying,
    familianomo character varying,
    personanomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso character varying,
    posxtkodo character varying,
    logxurbo integer REFERENCES urbo(id),
    nacialando integer REFERENCES lando(id),
    naskigxtago date,
    mortdatekscio date NULL,  /*dato al kiu uea ekscias pri mortdato.*/
    mortdato date NULL, /*vera mortdato*/
    notoj character varying,
    profesio character varying,
    retposxto character varying,
    telhejmo character varying,
    teloficejo character varying,
    telportebla character varying,
    tttpagxo character varying,
    validaKonto boolean,
    abc character varying /*estis abc */
);


CREATE TABLE adminrajto (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);

/*Permesas havi grupojn da uzantoj kun samaj rajtoj*/
CREATE TABLE rajtgrupo (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_rajtgrupo_uzanto (
    idRajtgrupo integer REFERENCES rajtgrupo(id),
    idUzanto integer REFERENCES uzanto(id),
    PRIMARY KEY(idRajtgrupo, idUzanto)
);

CREATE TABLE ref_rajtgrupo_adminrajto (
    idRajtgrupo integer REFERENCES rajtgrupo(id),
    idAdminrajto integer REFERENCES adminrajto(id),
    PRIMARY KEY(idRajtgrupo, idAdminrajto)
);

/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE ref_uzanto_adminrajto (
    idAdminrajto integer REFERENCES adminrajto(id),
    idUzanto integer REFERENCES uzanto(id),
    PRIMARY KEY(idAdminrajto, idUzanto)
);


CREATE TABLE komitatkategorio (
    id integer PRIMARY KEY,
    nomo character varying
);

/*datumoj el ueadb:membroj, ueadb:asocioj kaj retdb:fakasocioj*/
CREATE TABLE asocio(
    id integer PRIMARY KEY REFERENCES uzantoAuxAsocio(id),
    nomo character varying,
    siglo character varying,
    adreso character varying,
    fondigxdato date,
    posxtkodo character varying,
    urbo integer NULL REFERENCES urbo(id),
    telhejmo character varying,
    landokodo character varying,
    retposxto character varying,
    delegFako character varying,
    tttpagxo character varying,
    abc character varying
);


/*datumoj el ueadb:komit*/
CREATE TABLE komitato (
    id integer PRIMARY KEY,
    idUzanto integer REFERENCES uzanto(id),
    idKomitatkategorio integer REFERENCES komitatkategorio(id),
    idAsocio integer REFERENCES asocio(id) null
);

/*La peranto povas esti asocio aŭ membro*/
/*datumoj el ueadb:perant*/
CREATE TABLE peranto (
    id integer PRIMARY KEY,
    idUeakodo integer REFERENCES uzantoAuxAsocio(id),
    idLando integer REFERENCES lando(id)
);

/*datumoj el retdb:taskoj*/
CREATE TABLE tasko (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);


/*datumoj el retdb:taskoj*/
CREATE TABLE ref_tasko_uzanto (
    idTasko integer REFERENCES tasko(id),
    idUzanto integer REFERENCES uzantoAuxAsocio(id),
    PRIMARY KEY(idTasko, idUzanto)
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE respondeco (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE ref_respondeco_uzanto (
    idRespondeco integer REFERENCES respondeco(id),
    idUzanto integer REFERENCES uzantoAuxAsocio(id),
    PRIMARY KEY(idRespondeco, idUzanto)
);

CREATE TABLE delegito (
    idUzanto integer REFERENCES uzanto(id),
    idLando integer REFERENCES lando(id),
    PRIMARY KEY(idUzanto, idLando)
);

/*nova tablo, sed el retdb:fakasocio columno 'kategorio'*/
CREATE TABLE faktemo (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_fakasocio(
    idAsocio integer REFERENCES asocio(id),
    idFaktemo integer REFERENCES faktemo(id),
    PRIMARY KEY(idAsocio, idFaktemo)
);

CREATE TABLE ref_landasocio(
    idAsocio integer REFERENCES asocio(id),
    idLando integer REFERENCES lando(id),
    PRIMARY KEY(idAsocio, idLando)
);

/*nova tablo, enhavas la diversajn membrecajn kategoriojn*/
CREATE TABLE anokategorio (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);


/*nova tablo, povas esti kreita rigardante ueadb:asocioj:konstkat kaj ueadb:membroj:konstkat*/
CREATE TABLE ref_uzantoAuxAsocio_anokategorio(
    id integer PRIMARY KEY,
    idUzanto integer REFERENCES uzantoAuxAsocio(id),
    jaro integer null, 
    idKategorio integer REFERENCES anokategorio(id),
);

/*Mi ne vidis tiun tablon en la ekzistantaj datumbazoj, sed ĝi ie devas ekzisti por permesi akiri prezon pro kotizo laŭ lando. 
 Ĝi eventuale povus esti tiel farita ke ni konsideru lando kategorio sistemo.
 */
CREATE TABLE ref_anokategorio_lando (
  idAnokategorio integer REFERENCES anokategorio(id),
  idLando integer REFERENCES lando(id),
  aligxPrezo integer,
  PRIMARY KEY(idAnokategorio, idLando)
);

/*nova tablo, permesas fari grupojn de uzantoj laŭ kriterioj kiuj ne rilatas al membreco aŭ kotizo. */
CREATE TABLE uzantogrupo (
    id integer PRIMARY KEY,
    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_uzantoAuxAsocio_uzantogrupo(
    idUzanto integer REFERENCES uzantoAuxAsocio(id),
    idGrupo integer REFERENCES uzantogrupo(id),
    PRIMARY KEY (idUzanto, idGrupo)
);


/***** LIGITA AL LA MONKONTA SISTEMO *****/

/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE konto (
    id integer PRIMARY KEY,
    posedanto integer REFERENCES uzantoAuxAsocio(id) null,
    ueaPosedanto character varying null /*por diversaj uea kontoj, ili ne estas ligita al iu uzantoAuxAsocio sed al UEA internaĵo.*/
);


/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE gxiro (
    id integer PRIMARY KEY,
    sumo integer,
    dato date,
    elKonto integer REFERENCES konto(id) NULL, /*null signifus kredito el ekstero (el bankonto de la uzanto, el UEA)*/
    alKonto integer REFERENCES uzantoAuxAsocio(id) NOT NULL,
    priskribo character varying
);

CREATE TABLE gxirpropono (
    id integer PRIMARY KEY,
    idGxiro integer REFERENCES gxiro(id),
    idEl integer REFERENCES uzantoAuxAsocio(id),
    kialo character varying
);

CREATE TABLE aprobitagxiro (
    id integer PRIMARY KEY,
    idGxirpropono integer REFERENCES gxirpropono(id),
    aprobitaDe integer REFERENCES uzantoAuxAsocio(id)
);


/***** LIGITA AL LA RETEJO *****/

/* Ĉu ne-membroj povas esti retUzantoj?? Mi supozas ke ne */
/*TODO: Eble tiu ĉi tablo malaperos, zorgita de la reteja zorganto*/
/*datumoj el retdb:uzantaro*/
CREATE TABLE retUzanto (
    id integer PRIMARY KEY REFERENCES uzanto(id),
    kromnomo character varying,
    pasvorto text  /*devus iĝi sha1 (laŭ transirebleco)*/
);


/***** LIGITA AL LA dissenda sistemo *****/
/*dissendo temas pri iu dissendaĵo farita al specifaj anokategorioj.*/
/*datumoj el ueadb:dissendoj*/
CREATE TABLE dissendo (
  id integer PRIMARY KEY,
  dissendanto integer REFERENCES uzanto(id),
  nomede character varying, /*Kampo pri la nomo de la aŭtoro, povas esti "Mark Fettes - Prezidanto de UEA"*/
  dato date,
  temo character varying,
  teksto character varying
);

/*La tabelo kiu diras al kiu iu dissendo estas sendita.*/
CREATE TABLE ref_dissendo_anokategorioj (
  idDissendo integer REFERENCES dissendo(id),
  idAnokategorio integer REFERENCES anokategorio(id),
  PRIMARY KEY(idDissendo, idAnokategorio)
);

/*dissendoj povas enhavi enketojn, tiu kaze la demanderon aperas en tiu ĉi
 * tabelo.*/
/*datumoj el ueadb:dissendo_enketoj*/
CREATE TABLE dissendo_demandero (
  id integer PRIMARY KEY,
  idDissendo integer REFERENCES dissendo(id),
  demNum integer,  /*pozicio de la demandero*/
  demTeksto  character varying
);

CREATE TABLE ref_dissendo_respondoj (
  idUzantoAuxAsocio integer REFERENCES uzantoAuxAsocio(id), /*La respondanto*/
  idDissendoDemandero integer REFERENCES dissendo_demandero(id),
  PRIMARY KEY(idUzantoAuxAsocio, idDissendoDemandero)
);

/*datumoj el ueadb:gazkom*/
CREATE TABLE gazkom(
  id integer PRIMARY KEY,
  num integer,
  numero integer,
  dato date,
  titolo character varying, 
  subtitolo character varying, /* el gazkom:ttit*/
  htmlTeksto character varying,
  bazTeksto character varying
);

CREATE TABLE teko(
  id integer PRIMARY KEY,
  titolo character varying,
  elnomo character varying, /*nomo de la pdf dosiero*/  
  kodnomo character varying, /*ekzemplo: "eo_okt06"*/
  jaro integer, 
  absnum character varying,
  vido boolean
);

/***** LIGITA AL LA UK (aŭ aliaj kongresoj)*****/

CREATE TABLE antauxDumPostKongreso(
    id integer PRIMARY KEY
);


CREATE TABLE kongreso (
    id integer PRIMARY KEY REFERENCES antauxDumPostKongreso(id),
    idUrbo integer REFERENCES urbo(id),
    jaro date,
    numero integer,
    komencdato date,
    findato date
);

/*nova tablo*/
CREATE TABLE uk (
    id integer PRIMARY KEY REFERENCES kongreso(id),
    idUrbo integer REFERENCES urbo(id),
    temo character varying
);

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
 
 */
CREATE TABLE k_loko(
    id integer PRIMARY KEY,
    idKongreso integer REFERENCES kongreso(id),
    nomo character varying,
    priskribo character varying
);

/*datumoj el uea:programo*/
CREATE TABLE k_Programo (
    id integer PRIMARY KEY,
    idKongreso integer REFERENCES kongreso(id),
    komenctempo date,
    fintempo date,
    evento character varying,
    loko integer REFERENCES k_loko(id)
);

/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE k_aligxinto (
    id integer PRIMARY KEY,
    kongresaNumero integer,
    idUzanto integer REFERENCES uzanto(id) NULL, /*povas esti uzanto aŭ ne*/ 
    id_kongreso integer REFERENCES kongreso(id),
    personanomo character varying,
    familianomo character varying,
    personanomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso character varying,
    posxtkodo character varying,
    loĝurbo integer REFERENCES urbo(id),
    nacialando integer REFERENCES lando(id),
    naskigxtago character varying,
    mortdato character varying NULL,
    notoj character varying,
    profesio character varying,
    retposxto character varying,
    telhejmo character varying,
    teloficejo character varying,
    telportebla character varying,
    tttpagxo character varying,
    abc character varying /*estis abc */
);

/*datumoj el uea:hoteloj 
 Mi ne komprenas la signifon de ordo, ordig kaj rango el la pasinta tablo
uea:hoteloj.
 */
CREATE TABLE k_hotelo (
    id integer PRIMARY KEY,
    idKongresoAuxAntauxPost integer REFERENCES antauxDumPostKongreso(id),
    ordig integer, /*ordo de apero sur la retejo aŭ kongresa libro*/
    rango integer, /*kvalito, kvanto da steloj*/
    adreso character varying,
    foreco character varying,
    priskribo character varying,
    retejo character varying,
    retadreso character varying,
    telefono character varying,
    fakso character varying,
    notoj character varying
);

/*Ĉu estas grava se la sistemo por reservo de hotelo ne povas enhavi la datumon de la pasintaj tempoj?*/

/*nova tablo.
Ĝi permesos al administranto krei ĉambrtipon laŭ bezono.
 */
CREATE TABLE k_h_cxambrotipo (
    id integer PRIMARY KEY,
    litKvanto integer,
    personKvanto integer,
    nomo character varying
);

CREATE TABLE k_hotelo_cxambrotipo (
    id integer PRIMARY KEY,
    kHotelo integer REFERENCES k_hotelo(id),
    kHCxambrotipo integer REFERENCES k_h_cxambrotipo(id),
    prezo integer,
    kvanto integer 
);

/*Permesas al iu aligxinto mendi hotelon*/
CREATE TABLE k_hotelo_mendo (
    id integer PRIMARY KEY,
    idKAligxinto integer REFERENCES k_aligxinto(id),
    kHoteloCxambrotipo integer REFERENCES k_hotelo_cxambrotipo(id),
    alvendato date,
    forirdato date,
    kvanto integer, /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
    kunkogxantoj character varying /*Simpla teksta kampo, tiel ke plenigita de la uzanto. La sistemo poste tradukas tion per la tablo k_h_kunlogxanto.*/
);

CREATE TABLE ref_k_h_kunlogxanto (
    idHMendo integer REFERENCES k_hotelo_mendo(id),
    idKAligxinto integer REFERENCES k_aligxinto(id),
    PRIMARY KEY(idHMendo, idKAligxinto)
);

/*datumoj el uea:akpk*/
CREATE TABLE k_antauxKajPost (
    id integer PRIMARY KEY REFERENCES antauxDumPostKongreso(id),
    idKongreso integer REFERENCES kongreso(id),
    titolo character varying,
    komencdato date,
    findato date,
    revenLoko character varying,
    priskribo character varying,
    kvanto integer
);

CREATE TABLE ref_k_antauxKAjPost_mendo (
  idKAligxinto integer REFERENCES k_aligxinto(id),
  idKAntauxKajPost integer REFERENCES k_antauxKajPost(id),
  PRIMARY KEY(idKAligxinto, idKAntauxKajPost)
);

CREATE TABLE k_ekskurso (
    id integer PRIMARY KEY,
    idKongresoAuxAntauxPost integer REFERENCES antauxDumPostKongreso(id),
    titolo character varying,
    priskribo character varying,
    dato date,
    kvanto integer
);

CREATE TABLE ref_k_ekskurso_mendo (
  idKAligxinto integer REFERENCES k_aligxinto(id),
  idKEkskurso integer REFERENCES k_ekskurso(id),
  PRIMARY KEY(idKAligxinto, idKEkskurso)
);

/***** LIGITA AL LA libroservo *****/

/*datumoj el uea:ls*/
CREATE TABLE ls_verkisto( /*aux auxtoro, aux tradukisto, aux kontribuanto*/
  id integer PRIMARY KEY,
  familinomo character varying,
  personanomo character varying,
  idMembro integer NULL REFERENCES uzanto(id)
);

CREATE TABLE ls_kategorio(
  id integer PRIMARY KEY,
  nomo character varying,
  priskribo character varying
);

CREATE TABLE ls_subkategorio(
  id integer PRIMARY KEY,
  nomo character varying,
  priskribo character varying
);

CREATE TABLE ls_sxlosilvorto(
  id integer PRIMARY KEY,
  vorto character varying
);

/*Helpos trovi libron laŭ eldonisto kaj havi organizitan eldonistan liston
 Plenigita el ueadb:eldonitade
 */
CREATE TABLE ls_eldonisto(
  id integer PRIMARY KEY,
  nomo character varying
);

/*datumoj el uea:ls*/
CREATE TABLE libroservo(
  id integer PRIMARY KEY,
  kodo character varying(9),
  jaro date,
  prezo integer, /* *cent por havi ĝin en centoj */
  rabatoricevita integer,
  rabatodonata integer,
  fakturtitolo character varying,
  titolo character varying,
  aldonatitolo character varying,
  idAuxtoro integer REFERENCES ls_verkisto(id),
  kontribuantoj character varying, /*TODO: ĉu nova table ls_kontribuantoj kiu ligas intger libroservo kaj ls_verkisto*/
  idKategorio integer REFERENCES ls_kategorio(id),
  idSubkategorio integer REFERENCES ls_subkategorio(id),
  idTradukisto integer REFERENCES ls_verkisto(id),
  lingvajinformoj character varying,
  eldonloko integer REFERENCES urbo(id),
  idEldonisto integer REFERENCES ls_eldonisto(id),
  eldonjaro date,
  imposto integer,
  isbnissn character varying,
  alteco character varying,
  pagxnombro integer,
  acxetprezo integer,  /* *cent por havi ĝin en centoj */
  acxetvaluto integer, /* *cent por havi ĝin en centoj */
  stokvaloro integer, /* *cent por havi ĝin en centoj */
  dato date,
  enirukat character varying, /*TODO: mi ne komprenas tiun kampon*/ 
  mendoloke character varying,
  aldInf character varying,
  laDeRe character varying,
  recEnRe character varying,
  specialajInf character varying,
  katalogaKlar character varying,
  kvanto integer,
  komisiakvanto integer
);




/*datumoj el ueadb:brok */
CREATE TABLE brok(
  id integer PRIMARY KEY, /*el uea:bvar*/
  titolo character varying,
  idKategorio integer REFERENCES ls_kategorio(id),
  idSubkategorio integer REFERENCES ls_subkategorio(id),
  idTradukisto integer REFERENCES ls_verkisto(id),
  eldonloko integer REFERENCES urbo(id),
  eldonjaro integer,
  eldI character varying, /*povas esti '1a', '2a korektita' ... do bezonas esti 'string'*/
  pagxoj integer,
  prezo integer,
  kvanto integer,
  bind character varying,
  aldone character varying,
  posedanto character varying,
  loko character varying
);

CREATE TABLE brok_periodajxo(
  id integer PRIMARY KEY,
  ueakodo character varying,
  titolo character varying,
  subtitolo character varying,
  bildo character varying,
  notoj character varying
);

/*datumoj el ueadb:brok_periodajhoj */
CREATE TABLE brok_periodajxo_numero(
  id integer PRIMARY KEY,
  idPeriodjxoj integer REFERENCES brok_periodajxo(id),
  stato character varying, 
  jaro integer, 
  jaro2 integer null, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numero character varying,
  monato integer, /*de 1 ĝis 12*/
  monato2 integer, /*de 1 ĝis 12, simila la 'jaro2'*/
  notoj character varying,
  prezokategorio character varying null,
  prezo integer null, /*nur uzata se prezokategorio estas 'null'*/
  kvanto integer,
  deponloko character varying,
  enskribitade character varying
);

CREATE TABLE brok_periodajxoj_jarkolekto(
  id integer PRIMARY KEY,
  idPeriodjxoj integer REFERENCES brok_periodajxo(id),
  notoj character varying,
  stato character varying, 
  prezokategorio character varying null,
  prezo integer null, /*nur uzata se prezokategorio estas 'null'*/
  jaro integer, 
  jaro2 integer null, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numeroj character varying,
  kvanto integer,
  deponloko character varying,
  enskribitade character varying
);



CREATE TABLE ref_ls_ls_sxlosilvorto(
  idLs integer REFERENCES libroservo(id),
  idSxlosilvorto integer REFERENCES ls_sxlosilvorto(id),
  PRIMARY KEY(idLs, idSxlosilvorto)
);

/*datumoj el uea:abonoj*/
CREATE TABLE revua_abono (
  id integer PRIMARY KEY,
  kodo character varying,
  titolo character varying,
  klarigo character varying,
  ofteco integer,
  prezo integer,
  aerposxto integer,
  rete integer,
  difinebla character varying,
  dprez integer
);

/*nova tablo: mi ne trovis kie estas konservita tiun rilaton*/
/*el retdb:abmendo */
CREATE TABLE ref_revua_abonantoj (
  id integer PRIMARY KEY,
  idRevuaAbono integer REFERENCES revua_abono(id),
  idUzantoAuxAsocio integer REFERENCES uzantoAuxAsocio(id),
  jaro integer
);


CREATE TABLE brosxuro (
  id integer PRIMARY KEY,
  titolo character varying,
  idLando integer REFERENCES lando(id),
  loko character varying,
  eldonloko character varying,
  jaro integer,
  prezo integer,
  kvanto integer,
  bildo character varying,
  formato character varying,
  pagxo integer,
  stato character varying,
  notoj character varying
);


/*el ueadb:recenzoj*/
CREATE TABLE recenzo (
  id integer PRIMARY KEY,
  vnum integer, /*mi ne komprenis la signifon de tiu kampo*/
  kodo character varying,
  dato date,
  recTitolo character varying,
  recAutoro character varying,
  fonto character varying,
  ligilo character varying,
  recenzo character varying,
  nomo character varying, /*mi ne bone komprenas al kiu ĝi celas*/
  rajto boolean
);

/*el ueadb:opinioj*/
CREATE TABLE opinio (
  id integer PRIMARY KEY,
  num integer,
  dato date,
  opinio character varying,
  nomo character varying
);

/*Tiu korespondas al iu aĉeta ago sur la libro servo. varmendo_varoj ligas al ĝi kaj permesas scii kiujn varojn estis aĉetitaj.
 
el retdb:varmendintoj

 */
CREATE TABLE varmendo (
  id integer PRIMARY KEY,
  idUzanto integer REFERENCES uzantoAuxAsocio(id),
  dato date,
  ricevantFamilinomo character varying null, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantPersononomo character varying null, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantAdreso character varying,
  ricevantUrbo character varying,
  ricevantPoŝtkdo character varying,
  idRicevantLando integer REFERENCES lando(id),
  ricevantTelkodo character varying,
  ricevantTelhejmo character varying,
  ricevantTeloficejo character varying,
  ricevantFakso character varying,
  ricevatRetadreso character varying,
  idPagmaniero character varying, /*TODO: pripensi bezono havi tiun kampon kun la nova pagsistemo kiu estos proponita.*/
  validigo character varying, 
  notoj character varying,
  rabato integer null /*inter 0 kaj 100, estas rabata procento.*/
  /*la prezo ne aperas kiel kampo, ĝi estas kalkulita el la diversaj varmendo_varoj modifiita de la rabato. */
);

/*
el retdb:varmendo
 */
CREATE TABLE varmendo_varo (
    id integer PRIMARY KEY,
    idVarmendo integer REFERENCES varmendo(id),
    idLibroservo integer REFERENCES libroservo(id),
    kvanto integer,
    pagsumo integer, /*dum la mendo defaŭlte estas la varprezo, sed administranto povas ŝanĝi ĝin laŭ rabatoj. Tiu prezo estas sumo de la kvanto: se ni aĉetas 3 varoj kiuj kostas 500, ĝi enhavas 1500.*/
    avisumo integer
);

/*Por abonoj al revuoj
el retdb:abmendo
 */
CREATE TABLE varmendo_abono (
    id integer PRIMARY KEY,
    idVarmendo integer REFERENCES varmendo(id),
    idRevuaAbono integer REFERENCES revua_abono(id),
    prioritataPosxto boolean,
    difino integer, 
    pagsumo integer,
    avi integer
);


/***** LIGITA AL LA spezoj (peranto) *****/

/*el ueadb:spezaro (ili havas tipon 1 kaj kategorio kiel "270;;0;0;0;;0;0;0".*/
CREATE TABLE kongresa_spezraporto (
  id integer PRIMARY KEY,
  dato date,
  idPeranto integer REFERENCES peranto(id),
  valuto character varying,
  noto character varying,
  validita boolean, /*akceptita de administranto*/
  printia boolean

);

/*Ero de kongresa spezraporto*/
CREATE TABLE kongresa_spezraportero (
  id integer PRIMARY KEY,
  idKongresaSpezraporto integer REFERENCES kongresa_spezraporto(id),
  idUzanto integer NULL REFERENCES uzantoAuxAsocio(id), /*povas esti 'null' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'null.*/
  nomoUzanto character varying NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  kongresaKotizo integer,
  kongresajMendoj integer
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
  id integer PRIMARY KEY,
  priskribo character varying,
  defauxltaValuto integer DEFAULT 0
);

CREATE TABLE ref_kongresa_spezraportero_ks_pag_kampo(
  idKongresaSpezraportero integer REFERENCES kongresa_spezraportero(id),
  idKsPagKampo integer REFERENCES ks_pag_kampo(id),
  sumo integer,
  PRIMARY KEY(idKongresaSpezraportero, idKsPagKampo)
);

/*el ueadb:spezaro kaj ueadb:spezo (ili havas tipon 0) */
CREATE TABLE gxen_spezraporto (
  id integer PRIMARY KEY,
  dato date,
  idPeranto integer REFERENCES peranto(id),
  valuto character varying,
  noto character varying,
  validita boolean, /*akceptita de administranto*/
  printita boolean
);

CREATE TABLE gxen_spezraporto_kotizo (
  id integer PRIMARY KEY,
  idGxenSpezraporto integer REFERENCES gxen_spezraporto(id),
  idUzanto integer NULL REFERENCES uzantoAuxAsocio(id), /*povas esti 'null' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'null.*/
  nomoUzanto character varying NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  idAnokategorio integer REFERENCES anokategorio(id)

);

CREATE TABLE gxen_spezraportero (
  id integer PRIMARY KEY,
  idGxenSpezraporto integer REFERENCES gxen_spezraporto(id),
  enspezo boolean, /*Se true do enspezo, Se false do elspezo*/
  priskribo character varying,
  sumo integer
);
/***************/


/******** Por historio *********/

CREATE TABLE uzantoAuxAsocio_hist (
    id integer PRIMARY KEY,
    idDatum integer REFERENCES uzantoAuxAsocio(id),
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    ueakodo character varying
);

/*datumoj el ueadb:landokodo*/
CREATE TABLE lando_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomoLoka character varying,
    nomoEo character varying,
    landkodo character varying
);

/*datumoj el ueadb:urboj*/
CREATE TABLE urbo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomoLoka character varying,
    nomoEo character varying,
    idLando integer REFERENCES lando_hist(id)
);

/*datumoj el ueadb:tuta1
 Mi nomiĝis tiun tabelon "uzanto" ĉar ĝi povas havi linioj pri ne membroj sed
simplaj uzantoj. Estas la tabelo ref_uzantoAuxAsocio_anokategorio kiu permesas
dedukti la membrecon.
 */
CREATE TABLE uzanto_hist ( 
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    personanomo character varying,
    familianomo character varying,
    personanomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso character varying,
    posxtkodo character varying,
    logxurbo integer REFERENCES urbo_hist(id),
    nacialando integer REFERENCES lando_hist(id),
    naskigxtago date,
    mortdatekscio date NULL,  /*dato al kiu uea ekscias pri mortdato.*/
    mortdato date NULL, /*vera mortdato*/
    notoj character varying,
    profesio character varying,
    retposxto character varying,
    telhejmo character varying,
    teloficejo character varying,
    telportebla character varying,
    tttpagxo character varying,
    validaKonto boolean,
    abc character varying /*estis abc */
);


CREATE TABLE adminrajto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);

/*Permesas havi grupojn da uzantoj kun samaj rajtoj*/
CREATE TABLE rajtgrupo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_rajtgrupo_uzanto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idRajtgrupo integer REFERENCES rajtgrupo_hist(id),
    idUzanto integer REFERENCES uzanto_hist(id)
);

CREATE TABLE ref_rajtgrupo_adminrajto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idRajtgrupo integer REFERENCES rajtgrupo_hist(id),
    idAdminrajto integer REFERENCES adminrajto_hist(id)
);

/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE ref_uzanto_adminrajto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idAdminrajto integer REFERENCES adminrajto_hist(id),
    idUzanto integer REFERENCES uzanto_hist(id)
);


CREATE TABLE komitatkategorio_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying
);

/*datumoj el ueadb:membroj, ueadb:asocioj kaj retdb:fakasocioj*/
CREATE TABLE asocio_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    siglo character varying,
    adreso character varying,
    fondigxdato date,
    posxtkodo character varying,
    urbo integer NULL REFERENCES urbo(id),
    telhejmo character varying,
    landokodo character varying,
    retposxto character varying,
    delegFako character varying,
    tttpagxo character varying,
    abc character varying
);


/*datumoj el ueadb:komit*/
CREATE TABLE komitato_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUzanto integer REFERENCES uzanto(id),
    idKomitatkategorio integer REFERENCES komitatkategorio(id),
    idAsocio integer REFERENCES asocio(id) null
);

/*La peranto povas esti asocio aŭ membro*/
/*datumoj el ueadb:perant*/
CREATE TABLE peranto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUeakodo integer REFERENCES uzantoAuxAsocio(id),
    idLando integer REFERENCES lando(id)
);

/*datumoj el retdb:taskoj*/
CREATE TABLE tasko_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);


/*datumoj el retdb:taskoj*/
CREATE TABLE ref_tasko_uzanto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idTasko integer REFERENCES tasko_hist(id),
    idUzanto integer REFERENCES uzantoAuxAsocio_hist(id)
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE respondeco_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);

/*datumoj el retdb:respondecoj*/
CREATE TABLE ref_respondeco_uzanto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idRespondeco integer REFERENCES respondeco_hist(id),
    idUzanto integer REFERENCES uzantoAuxAsocio_hist(id)
);

CREATE TABLE delegito_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUzanto integer REFERENCES uzanto_hist(id),
    idLando integer REFERENCES lando_hist(id)
);

/*nova tablo, sed el retdb:fakasocio columno 'kategorio'*/
CREATE TABLE faktemo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_fakasocio_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idAsocio integer REFERENCES asocio_hist(id),
    idFaktemo integer REFERENCES faktemo_hist(id)
);

CREATE TABLE ref_landasocio_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idAsocio integer REFERENCES asocio_hist(id),
    idLando integer REFERENCES lando_hist(id)
);

/*nova tablo, enhavas la diversajn membrecajn kategoriojn*/
CREATE TABLE anokategorio_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);


/*nova tablo, povas esti kreita rigardante ueadb:asocioj:konstkat kaj ueadb:membroj:konstkat*/
CREATE TABLE ref_uzantoAuxAsocio_anokategorio_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUzanto integer REFERENCES uzantoAuxAsocio_hist(id),
    jaro integer null, 
    idKategorio integer REFERENCES anokategorio_hist(id)
);

/*Mi ne vidis tiun tablon en la ekzistantaj datumbazoj, sed ĝi ie devas ekzisti por permesi akiri prezon pro kotizo laŭ lando. 
 Ĝi eventuale povus esti tiel farita ke ni konsideru lando kategorio sistemo.
 */
CREATE TABLE ref_anokategorio_lando_hist (
  id integer PRIMARY KEY,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idAnokategorio integer REFERENCES anokategorio_hist(id),
  idLando integer REFERENCES lando_hist(id),
  aligxPrezo integer
);

/*nova tablo, permesas fari grupojn de uzantoj laŭ kriterioj kiuj ne rilatas al membreco aŭ kotizo. */
CREATE TABLE uzantogrupo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    nomo character varying,
    priskribo character varying
);

CREATE TABLE ref_uzantoAuxAsocio_uzantogrupo_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUzanto integer REFERENCES uzantoAuxAsocio_hist(id),
    idGrupo integer REFERENCES uzantogrupo_hist(id)
);


/***** LIGITA AL LA MONKONTA SISTEMO *****/

/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE konto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),
    
    posedanto integer REFERENCES uzantoAuxAsocio_hist(id) null,
    ueaPosedanto character varying null /*por diversaj uea kontoj, ili ne estas ligita al iu uzantoAuxAsocio sed al UEA internaĵo.*/
);


/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE gxiro_hist (
    id integer PRIMARY KEY,
    idDatum integer, /*kutime, ligita al gxiro(id) sed ne kiel REFERENCES ĉar gxiro(id) povas esti forviŝita.*/
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    sumo integer,
    dato date,
    elKonto integer REFERENCES konto_hist(id) NULL, /*null signifus kredito el ekstero (el bankonto de la uzanto, el UEA)*/
    alKonto integer REFERENCES uzantoAuxAsocio_hist(id) NOT NULL,
    priskribo character varying
);

CREATE TABLE gxirpropono_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idGxiro integer REFERENCES gxiro_hist(id),
    idEl integer REFERENCES uzantoAuxAsocio_hist(id),
    kialo character varying
);

CREATE TABLE aprobitagxiro_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idGxirpropono integer REFERENCES gxirpropono_hist(id),
    aprobitaDe integer REFERENCES uzantoAuxAsocio_hist(id)
);


/***** LIGITA AL LA RETEJO *****/

/* Ĉu ne-membroj povas esti retUzantoj?? Mi supozas ke ne */
/*TODO: Eble tiu ĉi tablo malaperos, zorgita de la reteja zorganto*/
/*datumoj el retdb:uzantaro*/
CREATE TABLE retUzanto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    id integer REFERENCES uzanto_hist(id),
    kromnomo character varying,
    pasvorto text  /*devus iĝi sha1 (laŭ transirebleco)*/
);


/***** LIGITA AL LA dissenda sistemo *****/
/*dissendo temas pri iu dissendaĵo farita al specifaj anokategorioj.*/
/*datumoj el ueadb:dissendoj*/
CREATE TABLE dissendo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  dissendanto integer REFERENCES uzanto_hist(id),
  nomede character varying, /*Kampo pri la nomo de la aŭtoro, povas esti "Mark Fettes - Prezidanto de UEA"*/
  dato date,
  temo character varying,
  teksto character varying
);

/*La tabelo kiu diras al kiu iu dissendo estas sendita.*/
CREATE TABLE ref_dissendo_anokategorioj_hist (
  id integer PRIMARY KEY,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idDissendo integer REFERENCES dissendo_hist(id),
  idAnokategorio integer REFERENCES anokategorio_hist(id)
);

/*dissendoj povas enhavi enketojn, tiu kaze la demanderon aperas en tiu ĉi
 * tabelo.*/
/*datumoj el ueadb:dissendo_enketoj*/
CREATE TABLE dissendo_demandero_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idDissendo integer REFERENCES dissendo_hist(id),
  demNum integer,  /*pozicio de la demandero*/
  demTeksto  character varying
);

CREATE TABLE dissendo_respondoj_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idUzantoAuxAsocio integer REFERENCES uzantoAuxAsocio_hist(id), /*La respondanto*/
  idDissendo integer REFERENCES dissendo_hist(id),
  idDissendoDemandero integer REFERENCES dissendo_demandero_hist(id),
);

/*datumoj el ueadb:gazkom*/
CREATE TABLE gazkom_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  num integer,
  numero integer,
  dato date,
  titolo character varying, 
  subtitolo character varying, /* el gazkom:ttit*/
  htmlTeksto character varying,
  bazTeksto character varying
);

CREATE TABLE teko_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  titolo character varying,
  elnomo character varying, /*nomo de la pdf dosiero*/  
  kodnomo character varying, /*ekzemplo: "eo_okt06"*/
  jaro integer, 
  absnum character varying,
  vido boolean
);

/***** LIGITA AL LA UK (aŭ aliaj kongresoj)*****/

CREATE TABLE antauxDumPostKongreso_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id)
);



CREATE TABLE kongreso_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUrbo integer REFERENCES urbo_hist(id),
    jaro date,
    numero integer,
    komencdato date,
    findato date
);

/*nova tablo*/
CREATE TABLE uk_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idUrbo integer REFERENCES urbo_hist(id),
    temo character varying
);

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
 
 */
CREATE TABLE k_loko_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKongreso integer REFERENCES kongreso_hist(id),
    nomo character varying,
    priskribo character varying
);

/*datumoj el uea:programo*/
CREATE TABLE k_Programo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKongreso integer REFERENCES kongreso_hist(id),
    komenctempo date,
    fintempo date,
    evento character varying,
    loko integer REFERENCES k_loko_hist(id)
);

/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE k_aligxinto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    kongresaNumero integer,
    idUzanto integer REFERENCES uzanto_hist(id) NULL, /*povas esti uzanto aŭ ne*/ 
    id_kongreso integer REFERENCES kongreso_hist(id),
    personanomo character varying,
    familianomo character varying,
    personanomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    familianomoIdentigilo character varying, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
    adreso character varying,
    posxtkodo character varying,
    loĝurbo integer REFERENCES urbo_hist(id),
    nacialando integer REFERENCES lando_hist(id),
    naskigxtago character varying,
    mortdato character varying NULL,
    notoj character varying,
    profesio character varying,
    retposxto character varying,
    telhejmo character varying,
    teloficejo character varying,
    telportebla character varying,
    tttpagxo character varying,
    abc character varying /*estis abc */
);

/*datumoj el uea:hoteloj 
 Mi ne komprenas la signifon de ordo, ordig kaj rango el la pasinta tablo
uea:hoteloj.
 */
CREATE TABLE k_hotelo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKongresoAuxAntauxPost integer REFERENCES antauxDumPostKongreso_hist(id),
    ordig integer, /*ordo de apero sur la retejo aŭ kongresa libro*/
    rango integer, /*kvalito, kvanto da steloj*/
    adreso character varying,
    foreco character varying,
    priskribo character varying,
    retejo character varying,
    retadreso character varying,
    telefono character varying,
    fakso character varying,
    notoj character varying
);

/*Ĉu estas grava se la sistemo por reservo de hotelo ne povas enhavi la datumon de la pasintaj tempoj?*/

/*nova tablo.
Ĝi permesos al administranto krei ĉambrtipon laŭ bezono.
 */
CREATE TABLE k_h_cxambrotipo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    litKvanto integer,
    personKvanto integer,
    nomo character varying
);

CREATE TABLE k_hotelo_cxambrotipo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    kHotelo integer REFERENCES k_hotelo_hist(id),
    kHCxambrotipo integer REFERENCES k_h_cxambrotipo_hist(id),
    prezo integer,
    kvanto integer 
);

/*Permesas al iu aligxinto mendi hotelon*/
CREATE TABLE k_hotelo_mendo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKAligxinto integer REFERENCES k_aligxinto_hist(id),
    kHoteloCxambrotipo integer REFERENCES k_hotelo_cxambrotipo_hist(id),
    alvendato date,
    forirdato date,
    kvanto integer, /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
    kunkogxantoj character varying /*Simpla teksta kampo, tiel ke plenigita de la uzanto. La sistemo poste tradukas tion per la tablo k_h_kunlogxanto.*/
);

CREATE TABLE ref_k_h_kunlogxanto_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idHMendo integer REFERENCES k_hotelo_mendo_hist(id),
    idKAligxinto integer REFERENCES k_aligxinto_hist(id)
);

/*datumoj el uea:akpk*/
CREATE TABLE k_antauxKajPost_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKongreso integer REFERENCES kongreso_hist(id),
    titolo character varying,
    komencdato date,
    findato date,
    revenLoko character varying,
    priskribo character varying,
    kvanto integer
);

CREATE TABLE ref_k_antauxKAjPost_mendo_hist (
  id integer PRIMARY KEY,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idKAligxinto integer REFERENCES k_aligxinto_hist(id),
  idKAntauxKajPost integer REFERENCES k_antauxKajPost_hist(id)
);

CREATE TABLE k_ekskurso_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idKongresoAuxAntauxPost integer REFERENCES antauxDumPostKongreso_hist(id),
    titolo character varying,
    priskribo character varying,
    dato date,
    kvanto integer
);

CREATE TABLE ref_k_ekskurso_mendo_hist (
  id integer PRIMARY KEY,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idKAligxinto integer REFERENCES k_aligxinto_hist(id),
  idKEkskurso integer REFERENCES k_ekskurso_hist(id)
);

/***** LIGITA AL LA libroservo *****/

/*datumoj el uea:ls*/
CREATE TABLE ls_verkisto_hist ( /*aux auxtoro, aux tradukisto, aux kontribuanto*/
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  familinomo character varying,
  personanomo character varying,
  idMembro integer NULL REFERENCES uzanto_hist(id)
);

CREATE TABLE ls_kategorio_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  nomo character varying,
  priskribo character varying
);

CREATE TABLE ls_subkategorio_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  nomo character varying,
  priskribo character varying
);

CREATE TABLE ls_sxlosilvorto_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  vorto character varying
);

/*Helpos trovi libron laŭ eldonisto kaj havi organizitan eldonistan liston
 Plenigita el ueadb:eldonitade
 */
CREATE TABLE ls_eldonisto_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  nomo character varying
);

/*datumoj el uea:ls*/
CREATE TABLE libroservo_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  kodo character varying(9),
  jaro date,
  prezo integer, /* *cent por havi ĝin en centoj */
  rabatoricevita integer,
  rabatodonata integer,
  fakturtitolo character varying,
  titolo character varying,
  aldonatitolo character varying,
  idAuxtoro integer REFERENCES ls_verkisto_hist(id),
  kontribuantoj character varying, /*TODO: ĉu nova table ls_kontribuantoj kiu ligas intger libroservo kaj ls_verkisto*/
  idKategorio integer REFERENCES ls_kategorio_hist(id),
  idSubkategorio integer REFERENCES ls_subkategorio_hist(id),
  idTradukisto integer REFERENCES ls_verkisto_hist(id),
  lingvajinformoj character varying,
  eldonloko integer REFERENCES urbo_hist(id),
  idEldonisto integer REFERENCES ls_eldonisto_hist(id),
  eldonjaro date,
  imposto integer,
  isbnissn character varying,
  alteco character varying,
  pagxnombro integer,
  acxetprezo integer,  /* *cent por havi ĝin en centoj */
  acxetvaluto integer, /* *cent por havi ĝin en centoj */
  stokvaloro integer, /* *cent por havi ĝin en centoj */
  dato date,
  enirukat character varying, /*TODO: mi ne komprenas tiun kampon*/ 
  mendoloke character varying,
  aldInf character varying,
  laDeRe character varying,
  recEnRe character varying,
  specialajInf character varying,
  katalogaKlar character varying,
  kvanto integer,
  komisiakvanto integer
);




/*datumoj el ueadb:brok */
CREATE TABLE brok_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  titolo character varying,
  idKategorio integer REFERENCES ls_kategorio_hist(id),
  idSubkategorio integer REFERENCES ls_subkategorio_hist(id),
  idTradukisto integer REFERENCES ls_verkisto_hist(id),
  eldonloko integer REFERENCES urbo_hist(id),
  eldonjaro integer,
  eldI character varying, /*povas esti '1a', '2a korektita' ... do bezonas esti 'string'*/
  pagxoj integer,
  prezo integer,
  kvanto integer,
  bind character varying,
  aldone character varying,
  posedanto character varying,
  loko character varying
);

CREATE TABLE brok_periodajxo_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  ueakodo character varying,
  titolo character varying,
  subtitolo character varying,
  bildo character varying,
  notoj character varying
);

/*datumoj el ueadb:brok_periodajhoj */
CREATE TABLE brok_periodajxo_numero_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idPeriodjxoj integer REFERENCES brok_periodajxo_hist(id),
  stato character varying, 
  jaro integer, 
  jaro2 integer null, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numero character varying,
  monato integer, /*de 1 ĝis 12*/
  monato2 integer, /*de 1 ĝis 12, simila la 'jaro2'*/
  notoj character varying,
  prezokategorio character varying null,
  prezo integer null, /*nur uzata se prezokategorio estas 'null'*/
  kvanto integer,
  deponloko character varying,
  enskribitade character varying
);

CREATE TABLE brok_periodajxoj_jarkolekto_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idPeriodjxoj integer REFERENCES brok_periodajxo_hist(id),
  notoj character varying,
  stato character varying, 
  prezokategorio character varying null,
  prezo integer null, /*nur uzata se prezokategorio estas 'null'*/
  jaro integer, 
  jaro2 integer null, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  numeroj character varying,
  kvanto integer,
  deponloko character varying,
  enskribitade character varying
);


CREATE TABLE ref_ls_ls_sxlosilvorto_hist (
  id integer PRIMARY KEY,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  idLs integer REFERENCES libroservo_hist(id),
  idSxlosilvorto integer REFERENCES ls_sxlosilvorto_hist(id)
);

/*datumoj el uea:abonoj*/
CREATE TABLE revua_abono_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  kodo character varying,
  titolo character varying,
  klarigo character varying,
  ofteco integer,
  prezo integer,
  aerposxto integer,
  rete integer,
  difinebla character varying,
  dprez integer
);

/*nova tablo: mi ne trovis kie estas konservita tiun rilaton*/
/*el retdb:abmendo */
CREATE TABLE revua_abonantoj_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idRevuaAbono integer REFERENCES revua_abono_hist(id),
  idUzantoAuxAsocio integer REFERENCES uzantoAuxAsocio_hist(id),
  jaro integer
);


CREATE TABLE brosxuro_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  titolo character varying,
  idLando integer REFERENCES lando_hist(id),
  loko character varying,
  eldonloko character varying,
  jaro integer,
  prezo integer,
  kvanto integer,
  bildo character varying,
  formato character varying,
  pagxo integer,
  stato character varying,
  notoj character varying
);


/*el ueadb:recenzoj*/
CREATE TABLE recenzo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  vnum integer, /*mi ne komprenis la signifon de tiu kampo*/
  kodo character varying,
  dato date,
  recTitolo character varying,
  recAutoro character varying,
  fonto character varying,
  ligilo character varying,
  recenzo character varying,
  nomo character varying, /*mi ne bone komprenas al kiu ĝi celas*/
  rajto boolean
);

/*el ueadb:opinioj*/
CREATE TABLE opinio_hist (
  id integer PRIMARY KEY,
  idDatum integer,
  sxangxdato date,
  sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
  faritaDe integer REFERENCES uzanto(id),

  num integer,
  dato date,
  opinio character varying,
  nomo character varying
);

/*Tiu korespondas al iu aĉeta ago sur la libro servo. varmendo_varoj ligas al ĝi kaj permesas scii kiujn varojn estis aĉetitaj.
 
el retdb:varmendintoj

 */
CREATE TABLE varmendo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idUzanto integer REFERENCES uzantoAuxAsocio_hist(id),
  dato date,
  ricevantFamilinomo character varying null, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantPersononomo character varying null, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  ricevantAdreso character varying,
  ricevantUrbo character varying,
  ricevantPoŝtkdo character varying,
  idRicevantLando integer REFERENCES lando_hist(id),
  ricevantTelkodo character varying,
  ricevantTelhejmo character varying,
  ricevantTeloficejo character varying,
  ricevantFakso character varying,
  ricevatRetadreso character varying,
  idPagmaniero character varying, /*TODO: pripensi bezono havi tiun kampon kun la nova pagsistemo kiu estos proponita.*/
  validigo character varying, 
  notoj character varying,
  rabato integer null /*inter 0 kaj 100, estas rabata procento.*/
  /*la prezo ne aperas kiel kampo, ĝi estas kalkulita el la diversaj varmendo_varoj modifiita de la rabato. */
);

/*
el retdb:varmendo
 */
CREATE TABLE varmendo_varo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idVarmendo integer REFERENCES varmendo_hist(id),
    idLibroservo integer REFERENCES libroservo_hist(id),
    kvanto integer,
    pagsumo integer, /*dum la mendo defaŭlte estas la varprezo, sed administranto povas ŝanĝi ĝin laŭ rabatoj. Tiu prezo estas sumo de la kvanto: se ni aĉetas 3 varoj kiuj kostas 500, ĝi enhavas 1500.*/
    avisumo integer
);

/*Por abonoj al revuoj
el retdb:abmendo
 */
CREATE TABLE varmendo_abono_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

    idVarmendo integer REFERENCES varmendo_hist(id),
    idRevuaAbono integer REFERENCES revua_abono_hist(id),
    prioritataPosxto boolean,
    difino integer, 
    pagsumo integer,
    avi integer
);


/***** LIGITA AL LA spezoj (peranto) *****/

/*el ueadb:spezaro (ili havas tipon 1 kaj kategorio kiel "270;;0;0;0;;0;0;0".*/
CREATE TABLE kongresa_spezraporto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  dato date,
  idPeranto integer REFERENCES peranto_hist(id),
  valuto character varying,
  noto character varying,
  validita boolean, /*akceptita de administranto*/
  printia boolean

);

/*Ero de kongresa spezraporto*/
CREATE TABLE kongresa_spezraportero_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idKongresaSpezraporto integer REFERENCES kongresa_spezraporto_hist(id),
  idUzanto integer NULL REFERENCES uzantoAuxAsocio_hist(id), /*povas esti 'null' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'null.*/
  nomoUzanto character varying NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  kongresaKotizo integer,
  kongresajMendoj integer
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

CREATE TABLE ks_pag_kampo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  priskribo character varying,
  defauxltaValuto integer DEFAULT 0
);

CREATE TABLE ref_kongresa_spezraportero_ks_pag_kampo_hist (
    id integer PRIMARY KEY,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idKongresaSpezraportero integer REFERENCES kongresa_spezraportero_hist(id),
  idKsPagKampo integer REFERENCES ks_pag_kampo_hist(id),
  sumo integer
);

/*el ueadb:spezaro kaj ueadb:spezo (ili havas tipon 0) */
CREATE TABLE gxen_spezraporto_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  dato date,
  idPeranto integer REFERENCES peranto_hist(id),
  valuto character varying,
  noto character varying,
  validita boolean, /*akceptita de administranto*/
  printita boolean
);

CREATE TABLE gxen_spezraporto_kotizo_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idGxenSpezraporto integer REFERENCES gxen_spezraporto_hist(id),
  idUzanto integer NULL REFERENCES uzantoAuxAsocio_hist(id), /*povas esti 'null' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'null.*/
  nomoUzanto character varying NULL, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  idAnokategorio integer REFERENCES anokategorio_hist(id)

);

CREATE TABLE gxen_spezraportero_hist (
    id integer PRIMARY KEY,
    idDatum integer,
    sxangxdato date,
    sxangxtipo character varying, /*Povas esti 'INS', 'UPD', 'DEL' */
    faritaDe integer REFERENCES uzanto(id),

  idGxenSpezraporto integer REFERENCES gxen_spezraporto_hist(id),
  enspezo boolean, /*Se true do enspezo, Se false do elspezo*/
  priskribo character varying,
  sumo integer
);
/***************/


