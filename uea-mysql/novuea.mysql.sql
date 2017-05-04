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


 /***** KERNO PRI MEMBROJ KAJ ASOCIOJ *****/
CREATE TABLE uzantoAuxAsocio (
    id int(11) PRIMARY KEY,
    ueakodo varchar(255),
    kromnomo varchar(255), /*por reteja uzado: datumoj el retdb:uzantaro*/
    pasvorto text  /*devus iĝi sha1 (laŭ transirebleco) datumoj el retdb:uzantaro*/
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

/*datumoj el ueadb:komit*/
CREATE TABLE komitato (
    id int(11) PRIMARY KEY,
    idUzanto int(11) REFERENCES uzanto(id),
    idAsocio int(11) NULL REFERENCES asocio(id),
    idKomitatkategorio int(11) REFERENCES komitatkategorio(id)
);

CREATE TABLE estarano (
    id int(11) PRIMARY KEY,
    idUzanto int(11) REFERENCES uzanto(id),
    rolo varchar(255),
    jaro date
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
CREATE TABLE ref_tasko_uzantoAuxAsocio (
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
CREATE TABLE ref_respondeco_uzantoAuxAsocio (
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

/*nova tablo, permesas fari grupojn de uzantoj laŭ kriterioj kiuj ne rilatas al membreco aŭ kotizo. */
CREATE TABLE uzantogrupo (
    id int(11) PRIMARY KEY,
    nomo varchar(255),
    priskribo varchar(255)
);

/*nova tablo, enhavas la diversajn membrecajn kategoriojn*/
CREATE TABLE anokategorio (
    id int(11) PRIMARY KEY REFERENCES uzantogrupo
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

CREATE TABLE ref_uzantoAuxAsocio_uzantogrupo(
    idUzanto int(11) REFERENCES uzantoAuxAsocio(id),
    idGrupo int(11) REFERENCES uzantogrupo(id),
    PRIMARY KEY (idUzanto, idGrupo)
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
CREATE TABLE ref_dissendo_uzantogrupo (
  idDissendo int(11) REFERENCES dissendo(id),
  idUzantoGrupo int(11) REFERENCES uzantogrupo(id),
  PRIMARY KEY(idDissendo, idUzantoGrupo)
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

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
*/
CREATE TABLE k_programejo(
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
    loko int(11) REFERENCES k_programejo(id)
);

/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE k_aligxinto (
    id int(11) PRIMARY KEY,
    kongresaNumero int(11),
    idUzanto int(11) REFERENCES uzanto(id), /*povas esti uzanto aŭ ne*/
    id_kongreso int(11) REFERENCES kongreso(id)
);

/*datumoj el uea:hoteloj
 Mi ne komprenas la signifon de ordo, ordig kaj rango el la pasinta tablo
uea:hoteloj.
 */
CREATE TABLE k_logxejo (
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

CREATE TABLE k_logxejo_cxambrotipo (
    id int(11) PRIMARY KEY,
    kHotelo int(11) REFERENCES k_logxejo(id),
    kHCxambrotipo int(11) REFERENCES k_h_cxambrotipo(id),
    prezo int(11),
    kvanto int(11)
);

/*Permesas al iu aligxinto mendi logxejon*/
CREATE TABLE k_logxejo_mendo (
    id int(11) PRIMARY KEY,
    idKAligxinto int(11) REFERENCES k_aligxinto(id),
    kHoteloCxambrotipo int(11) REFERENCES k_logxejo_cxambrotipo(id),
    alvendato date,
    forirdato date,
    kvanto int(11), /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
    kunkogxantoj varchar(255) /*Simpla teksta kampo, tiel ke plenigita de la uzanto. La sistemo poste tradukas tion per la tablo k_h_kunlogxanto.*/
);

CREATE TABLE ref_k_h_kunlogxanto (
    idHMendo int(11) REFERENCES k_logxejo_mendo(id),
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
