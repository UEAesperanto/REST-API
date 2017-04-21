
 /***** KERNO PRI MEMBROJ KAJ ASOCIOJ *****/

CREATE TABLE `uzantogrupo` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

/*datumoj el ueadb:landokodo*/
CREATE TABLE `lando` (
  `id` int(11) NOT NULL,
  `nomoloka` longtext,
  `nomoeo` longtext,
  `landkodo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:urboj*/
CREATE TABLE `urbo` (
  `id` int(11) NOT NULL,
  `nomoloka` longtext,
  `nomoeo` longtext,
  `idlando` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `urbo_idlando_fkey` (`idlando`),
  CONSTRAINT `urbo_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*datumoj el ueadb:tuta1
 Mi nomiĝis tiun tabelon "uzanto" ĉar ĝi povas havi linioj pri ne membroj sed
simplaj uzantoj. Estas la tabelo ref_uzantoAuxAsocio_anokategorio kiu permesas
dedukti la membrecon.
 */

CREATE TABLE `uzanto` (
  `id` int(11) NOT NULL,
  `personanomo` longtext,
  `familianomo` longtext,
  `personanomoidentigilo` longtext, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
  `familianomoidentigilo` longtext, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
  `adreso` longtext,
  `posxtkodo` longtext,
  `logxurbo` int(11) DEFAULT NULL,
  `nacialando` int(11) DEFAULT NULL,
  `naskigxtago` date DEFAULT NULL,
  `mortdatekscio` date DEFAULT NULL, /*dato al kiu uea ekscias pri mortdato.*/
  `mortdato` date DEFAULT NULL, /*vera mortdato*/
  `notoj` longtext, 
  `profesio` longtext,
  `retposxto` longtext,
  `telhejmo` longtext,
  `teloficejo` longtext,
  `telportebla` longtext,
  `tttpagxo` longtext,
  `validakonto` tinyint(4) DEFAULT NULL,
  `abc` longtext, /*estis abc */
  PRIMARY KEY (`id`),
  KEY `uzanto_logxurbo_fkey` (`logxurbo`),
  KEY `uzanto_nacialando_fkey` (`nacialando`),
  CONSTRAINT `uzanto_id_fkey` FOREIGN KEY (`id`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `uzanto_logxurbo_fkey` FOREIGN KEY (`logxurbo`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `uzanto_nacialando_fkey` FOREIGN KEY (`nacialando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `adminrajto` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*Permesas havi grupojn da uzantoj kun samaj rajtoj*/
CREATE TABLE `rajtgrupo` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ref_rajtgrupo_uzanto` (
  `idrajtgrupo` int(11) NOT NULL,
  `iduzanto` int(11) NOT NULL,
  PRIMARY KEY (`idrajtgrupo`,`iduzanto`),
  KEY `ref_rajtgrupo_uzanto_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `ref_rajtgrupo_uzanto_idrajtgrupo_fkey` FOREIGN KEY (`idrajtgrupo`) REFERENCES `rajtgrupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_rajtgrupo_uzanto_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE `ref_rajtgrupo_adminrajto` (
  `idrajtgrupo` int(11) NOT NULL,
  `idadminrajto` int(11) NOT NULL,
  PRIMARY KEY (`idrajtgrupo`,`idadminrajto`),
  KEY `ref_rajtgrupo_adminrajto_idadminrajto_fkey` (`idadminrajto`),
  CONSTRAINT `ref_rajtgrupo_adminrajto_idadminrajto_fkey` FOREIGN KEY (`idadminrajto`) REFERENCES `adminrajto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_rajtgrupo_adminrajto_idrajtgrupo_fkey` FOREIGN KEY (`idrajtgrupo`) REFERENCES `rajtgrupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*uzantoj povas havi rajton indivdue (ekstere de grupo)*/
CREATE TABLE `ref_uzanto_adminrajto` (
  `idadminrajto` int(11) NOT NULL,
  `iduzanto` int(11) NOT NULL,
  PRIMARY KEY (`idadminrajto`,`iduzanto`),
  KEY `ref_uzanto_adminrajto_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `ref_uzanto_adminrajto_idadminrajto_fkey` FOREIGN KEY (`idadminrajto`) REFERENCES `adminrajto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_uzanto_adminrajto_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `komitatkategorio` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:membroj, ueadb:asocioj kaj retdb:fakasocioj*/
CREATE TABLE `asocio` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `siglo` longtext,
  `adreso` longtext,
  `fondigxdato` date DEFAULT NULL,
  `posxtkodo` longtext,
  `urbo` int(11) DEFAULT NULL,
  `telhejmo` longtext,
  `landokodo` longtext,
  `retposxto` longtext,
  `delegfako` longtext,
  `tttpagxo` longtext,
  `abc` longtext,
  PRIMARY KEY (`id`),
  KEY `asocio_urbo_fkey` (`urbo`),
  CONSTRAINT `asocio_id_fkey` FOREIGN KEY (`id`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `asocio_urbo_fkey` FOREIGN KEY (`urbo`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:komit*/
CREATE TABLE `komitato` (
  `id` int(11) NOT NULL,
  `iduzanto` int(11) DEFAULT NULL,
  `idkomitatkategorio` int(11) DEFAULT NULL,
  `idasocio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `komitato_idasocio_fkey` (`idasocio`),
  KEY `komitato_idkomitatkategorio_fkey` (`idkomitatkategorio`),
  KEY `komitato_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `komitato_idasocio_fkey` FOREIGN KEY (`idasocio`) REFERENCES `asocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `komitato_idkomitatkategorio_fkey` FOREIGN KEY (`idkomitatkategorio`) REFERENCES `komitatkategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `komitato_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*La peranto povas esti asocio aŭ membro*/
/*datumoj el ueadb:perant*/
CREATE TABLE `peranto` (
  `id` int(11) NOT NULL,
  `idueakodo` int(11) DEFAULT NULL,
  `idlando` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `peranto_idlando_fkey` (`idlando`),
  KEY `peranto_idueakodo_fkey` (`idueakodo`),
  CONSTRAINT `peranto_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `peranto_idueakodo_fkey` FOREIGN KEY (`idueakodo`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el retdb:taskoj*/
CREATE TABLE `tasko` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el retdb:taskoj*/
CREATE TABLE `ref_tasko_uzanto` (
  `idtasko` int(11) NOT NULL,
  `iduzanto` int(11) NOT NULL,
  PRIMARY KEY (`idtasko`,`iduzanto`),
  KEY `ref_tasko_uzanto_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `ref_tasko_uzanto_idtasko_fkey` FOREIGN KEY (`idtasko`) REFERENCES `tasko` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_tasko_uzanto_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el retdb:respondecoj*/
CREATE TABLE `respondeco` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el retdb:respondecoj*/
CREATE TABLE `ref_respondeco_uzanto` (
  `idrespondeco` int(11) NOT NULL,
  `iduzanto` int(11) NOT NULL,
  PRIMARY KEY (`idrespondeco`,`iduzanto`),
  KEY `ref_respondeco_uzanto_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `ref_respondeco_uzanto_idrespondeco_fkey` FOREIGN KEY (`idrespondeco`) REFERENCES `respondeco` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_respondeco_uzanto_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tablo, sed el retdb:fakasocio columno 'kategorio'*/
CREATE TABLE `delegito` (
  `iduzanto` int(11) NOT NULL,
  `idlando` int(11) NOT NULL,
  PRIMARY KEY (`iduzanto`,`idlando`),
  KEY `delegito_idlando_fkey` (`idlando`),
  CONSTRAINT `delegito_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `delegito_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `faktemo` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ref_fakasocio` (
  `idasocio` int(11) NOT NULL,
  `idfaktemo` int(11) NOT NULL,
  PRIMARY KEY (`idasocio`,`idfaktemo`),
  KEY `ref_fakasocio_idfaktemo_fkey` (`idfaktemo`),
  CONSTRAINT `ref_fakasocio_idasocio_fkey` FOREIGN KEY (`idasocio`) REFERENCES `asocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_fakasocio_idfaktemo_fkey` FOREIGN KEY (`idfaktemo`) REFERENCES `faktemo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ref_landasocio` (
  `idasocio` int(11) NOT NULL,
  `idlando` int(11) NOT NULL,
  PRIMARY KEY (`idasocio`,`idlando`),
  KEY `ref_landasocio_idlando_fkey` (`idlando`),
  CONSTRAINT `ref_landasocio_idasocio_fkey` FOREIGN KEY (`idasocio`) REFERENCES `asocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_landasocio_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tablo, enhavas la diversajn membrecajn kategoriojn*/
CREATE TABLE `anokategorio` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `anokategorio_id_fkey` FOREIGN KEY (`id`) REFERENCES `uzantogrupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tablo, povas esti kreita rigardante ueadb:asocioj:konstkat kaj ueadb:membroj:konstkat*/
CREATE TABLE `ref_uzantoauxasocio_anokategorio` (
  `id` int(11) NOT NULL,
  `iduzanto` int(11) DEFAULT NULL,
  `jaro` int(11) DEFAULT NULL,
  `idkategorio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ref_uzantoauxasocio_anokategorio_idkategorio_fkey` (`idkategorio`),
  KEY `ref_uzantoauxasocio_anokategorio_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `ref_uzantoauxasocio_anokategorio_idkategorio_fkey` FOREIGN KEY (`idkategorio`) REFERENCES `anokategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_uzantoauxasocio_anokategorio_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Mi ne vidis tiun tablon en la ekzistantaj datumbazoj, sed ĝi ie devas ekzisti por permesi akiri prezon pro kotizo laŭ lando.
 Ĝi eventuale povus esti tiel farita ke ni konsideru lando kategorio sistemo.
*/
CREATE TABLE `ref_anokategorio_lando` (
  `idanokategorio` int(11) NOT NULL,
  `idlando` int(11) NOT NULL,
  `aligxprezo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idanokategorio`,`idlando`),
  KEY `ref_anokategorio_lando_idlando_fkey` (`idlando`),
  CONSTRAINT `ref_anokategorio_lando_idanokategorio_fkey` FOREIGN KEY (`idanokategorio`) REFERENCES `anokategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_anokategorio_lando_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tablo, permesas fari grupojn de uzantoj laŭ kriterioj kiuj ne rilatas al membreco aŭ kotizo. */
CREATE TABLE `uzantogrupo` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ref_uzantoauxasocio_uzantogrupo` (
  `iduzanto` int(11) NOT NULL,
  `idgrupo` int(11) NOT NULL,
  PRIMARY KEY (`iduzanto`,`idgrupo`),
  KEY `ref_uzantoauxasocio_uzantogrupo_idgrupo_fkey` (`idgrupo`),
  CONSTRAINT `ref_uzantoauxasocio_uzantogrupo_idgrupo_fkey` FOREIGN KEY (`idgrupo`) REFERENCES `uzantogrupo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_uzantoauxasocio_uzantogrupo_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA MONKONTA SISTEMO *****/

/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE `konto` (
  `id` int(11) NOT NULL,
  `posedanto` int(11) DEFAULT NULL,
  `ueaposedanto` longtext,
  PRIMARY KEY (`id`),
  KEY `konto_posedanto_fkey` (`posedanto`),
  CONSTRAINT `konto_posedanto_fkey` FOREIGN KEY (`posedanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Pri la monkonta sistemo, propono, devas esti validita kaj konfirmita.*/
CREATE TABLE `gxiro` (
  `id` int(11) NOT NULL,
  `sumo` int(11) DEFAULT NULL,
  `dato` date DEFAULT NULL,
  `elkonto` int(11) DEFAULT NULL, /*NULL signifus kredito el ekstero (el bankonto de la uzanto, el UEA)*/
  `alkonto` int(11) NOT NULL,
  `priskribo` longtext,
  PRIMARY KEY (`id`),
  KEY `gxiro_alkonto_fkey` (`alkonto`),
  KEY `gxiro_elkonto_fkey` (`elkonto`),
  CONSTRAINT `gxiro_alkonto_fkey` FOREIGN KEY (`alkonto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `gxiro_elkonto_fkey` FOREIGN KEY (`elkonto`) REFERENCES `konto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `gxirpropono` (
  `id` int(11) NOT NULL,
  `idgxiro` int(11) DEFAULT NULL,
  `idel` int(11) DEFAULT NULL,
  `kialo` longtext,
  PRIMARY KEY (`id`),
  KEY `gxirpropono_idel_fkey` (`idel`),
  KEY `gxirpropono_idgxiro_fkey` (`idgxiro`),
  CONSTRAINT `gxirpropono_idel_fkey` FOREIGN KEY (`idel`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `gxirpropono_idgxiro_fkey` FOREIGN KEY (`idgxiro`) REFERENCES `gxiro` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `aprobitagxiro` (
  `id` int(11) NOT NULL,
  `idgxirpropono` int(11) DEFAULT NULL,
  `aprobitade` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aprobitagxiro_aprobitade_fkey` (`aprobitade`),
  KEY `aprobitagxiro_idgxirpropono_fkey` (`idgxirpropono`),
  CONSTRAINT `aprobitagxiro_aprobitade_fkey` FOREIGN KEY (`aprobitade`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `aprobitagxiro_idgxirpropono_fkey` FOREIGN KEY (`idgxirpropono`) REFERENCES `gxirpropono` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA RETEJO *****/

/* Ĉu ne-membroj povas esti retUzantoj?? Mi supozas ke ne */
/*datumoj el retdb:uzantaro*/

CREATE TABLE `retuzanto` (
  `id` int(11) NOT NULL,
  `kromnomo` longtext,
  `pasvorto` longtext,
  PRIMARY KEY (`id`),
  CONSTRAINT `retuzanto_id_fkey` FOREIGN KEY (`id`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA dissenda sistemo *****/
/*dissendo temas pri iu dissendaĵo farita al specifaj anokategorioj.*/
/*datumoj el ueadb:dissendoj*/
CREATE TABLE `dissendo` (
  `id` int(11) NOT NULL,
  `dissendanto` int(11) DEFAULT NULL,
  `nomede` longtext,
  `dato` date DEFAULT NULL,
  `temo` longtext,
  `teksto` longtext,
  PRIMARY KEY (`id`),
  KEY `dissendo_dissendanto_fkey` (`dissendanto`),
  CONSTRAINT `dissendo_dissendanto_fkey` FOREIGN KEY (`dissendanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*La tabelo kiu diras al kiu iu dissendo estas sendita.*/
CREATE TABLE `ref_dissendo_anokategorioj` (
  `iddissendo` int(11) NOT NULL,
  `idanokategorio` int(11) NOT NULL,
  PRIMARY KEY (`iddissendo`,`idanokategorio`),
  KEY `ref_dissendo_anokategorioj_idanokategorio_fkey` (`idanokategorio`),
  CONSTRAINT `ref_dissendo_anokategorioj_idanokategorio_fkey` FOREIGN KEY (`idanokategorio`) REFERENCES `anokategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_dissendo_anokategorioj_iddissendo_fkey` FOREIGN KEY (`iddissendo`) REFERENCES `dissendo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*dissendoj povas enhavi enketojn, tiu kaze la demanderon aperas en tiu ĉi
 * tabelo.*/
/*datumoj el ueadb:dissendo_enketoj*/
CREATE TABLE `dissendo_demandero` (
  `id` int(11) NOT NULL,
  `iddissendo` int(11) DEFAULT NULL,
  `demnum` int(11) DEFAULT NULL, /*pozicio de la demandero*/
  `demteksto` longtext,
  PRIMARY KEY (`id`),
  KEY `dissendo_demandero_iddissendo_fkey` (`iddissendo`),
  CONSTRAINT `dissendo_demandero_iddissendo_fkey` FOREIGN KEY (`iddissendo`) REFERENCES `dissendo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ref_dissendo_respondoj` (
  `iduzantoauxasocio` int(11) NOT NULL, /*la respondanto*/
  `iddissendodemandero` int(11) NOT NULL,
  PRIMARY KEY (`iduzantoauxasocio`,`iddissendodemandero`),
  KEY `ref_dissendo_respondoj_iddissendodemandero_fkey` (`iddissendodemandero`),
  CONSTRAINT `ref_dissendo_respondoj_iddissendodemandero_fkey` FOREIGN KEY (`iddissendodemandero`) REFERENCES `dissendo_demandero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_dissendo_respondoj_iduzantoauxasocio_fkey` FOREIGN KEY (`iduzantoauxasocio`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:gazkom*/
CREATE TABLE `gazkom` (
  `id` int(11) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `dato` date DEFAULT NULL,
  `titolo` longtext,
  `subtitolo` longtext, /* el gazkom:ttit*/
  `htmlteksto` longtext,
  `bazteksto` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `teko` (
  `id` int(11) NOT NULL,
  `titolo` longtext,
  `elnomo` longtext, /*nomo de la pdf dosiero*/
  `kodnomo` longtext, /*ekzemplo: `eo_okt06`*/
  `jaro` int(11) DEFAULT NULL,
  `absnum` longtext,
  `vido` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA UK (aŭ aliaj kongresoj)*****/
CREATE TABLE `antauxdumpostkongreso` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `kongreso` (
  `id` int(11) NOT NULL,
  `idurbo` int(11) DEFAULT NULL,
  `jaro` date DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `komencdato` date DEFAULT NULL,
  `findato` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kongreso_idurbo_fkey` (`idurbo`),
  CONSTRAINT `kongreso_id_fkey` FOREIGN KEY (`id`) REFERENCES `antauxdumpostkongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `kongreso_idurbo_fkey` FOREIGN KEY (`idurbo`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tabelo*/
CREATE TABLE `uk` (
  `id` int(11) NOT NULL,
  `idurbo` int(11) DEFAULT NULL,
  `temo` longtext,
  PRIMARY KEY (`id`),
  KEY `uk_idurbo_fkey` (`idurbo`),
  CONSTRAINT `uk_id_fkey` FOREIGN KEY (`id`) REFERENCES `kongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `uk_idurbo_fkey` FOREIGN KEY (`idurbo`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*nova tablo
 Por la historiaĵo, oni povas uzi uea:programo:loko
*/
CREATE TABLE `k_loko` (
  `id` int(11) NOT NULL,
  `idkongreso` int(11) DEFAULT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`),
  KEY `k_loko_idkongreso_fkey` (`idkongreso`),
  CONSTRAINT `k_loko_idkongreso_fkey` FOREIGN KEY (`idkongreso`) REFERENCES `kongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el uea:programo*/
CREATE TABLE `k_programo` (
  `id` int(11) NOT NULL,
  `idkongreso` int(11) DEFAULT NULL,
  `komenctempo` date DEFAULT NULL,
  `fintempo` date DEFAULT NULL,
  `evento` longtext,
  `loko` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_programo_idkongreso_fkey` (`idkongreso`),
  KEY `k_programo_loko_fkey` (`loko`),
  CONSTRAINT `k_programo_idkongreso_fkey` FOREIGN KEY (`idkongreso`) REFERENCES `kongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_programo_loko_fkey` FOREIGN KEY (`loko`) REFERENCES `k_loko` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:uk_aliĝintoj kaj uea:kongresanoj */
CREATE TABLE `k_aligxinto` (
  `id` int(11) NOT NULL,
  `kongresanumero` int(11) DEFAULT NULL,
  `iduzanto` int(11) DEFAULT NULL, /*povas esti uzanto aŭ ne*/
  `id_kongreso` int(11) DEFAULT NULL,
  `personanomo` longtext,
  `familianomo` longtext,
  `personanomoidentigilo` longtext, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
  `familianomoidentigilo` longtext, /*defaulte malplena, utila por
    eviti pasportan aŭ invitletera eraro, ne videbla devige videbla el uzanta
    interfaco.*/
  `adreso` longtext,
  `posxtkodo` longtext,
  `loĝurbo` int(11) DEFAULT NULL,
  `nacialando` int(11) DEFAULT NULL,
  `naskigxtago` longtext,
  `mortdato` longtext,
  `notoj` longtext,
  `profesio` longtext,
  `retposxto` longtext,
  `telhejmo` longtext,
  `teloficejo` longtext,
  `telportebla` longtext,
  `tttpagxo` longtext,
  `abc` longtext, /*estis abc */
  PRIMARY KEY (`id`),
  KEY `k_aligxinto_id_kongreso_fkey` (`id_kongreso`),
  KEY `k_aligxinto_iduzanto_fkey` (`iduzanto`),
  KEY `k_aligxinto_loĝurbo_fkey` (`loĝurbo`),
  KEY `k_aligxinto_nacialando_fkey` (`nacialando`),
  CONSTRAINT `k_aligxinto_id_kongreso_fkey` FOREIGN KEY (`id_kongreso`) REFERENCES `kongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_aligxinto_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_aligxinto_loĝurbo_fkey` FOREIGN KEY (`loĝurbo`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_aligxinto_nacialando_fkey` FOREIGN KEY (`nacialando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el uea:hoteloj
 Mi ne komprenas la signifon de ordo, ordig kaj rango el la pasinta tablo
uea:hoteloj.
 */

CREATE TABLE `k_hotelo` (
  `id` int(11) NOT NULL,
  `idkongresoauxantauxpost` int(11) DEFAULT NULL,
  `ordig` int(11) DEFAULT NULL,
  `rango` int(11) DEFAULT NULL,
  `adreso` longtext,
  `foreco` longtext,
  `priskribo` longtext,
  `retejo` longtext,
  `retadreso` longtext,
  `telefono` longtext,
  `fakso` longtext,
  `notoj` longtext,
  PRIMARY KEY (`id`),
  KEY `k_hotelo_idkongresoauxantauxpost_fkey` (`idkongresoauxantauxpost`),
  CONSTRAINT `k_hotelo_idkongresoauxantauxpost_fkey` FOREIGN KEY (`idkongresoauxantauxpost`) REFERENCES `antauxdumpostkongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Ĉu estas grava se la sistemo por reservo de hotelo ne povas enhavi la datumon de la pasintaj tempoj?*/

/*nova tablo.
Ĝi permesos al administranto krei ĉambrtipon laŭ bezono.
 */

CREATE TABLE `k_h_cxambrotipo` (
  `id` int(11) NOT NULL,
  `litkvanto` int(11) DEFAULT NULL,
  `personkvanto` int(11) DEFAULT NULL,
  `nomo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `k_hotelo_cxambrotipo` (
  `id` int(11) NOT NULL,
  `khotelo` int(11) DEFAULT NULL,
  `khcxambrotipo` int(11) DEFAULT NULL,
  `prezo` int(11) DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_hotelo_cxambrotipo_khcxambrotipo_fkey` (`khcxambrotipo`),
  KEY `k_hotelo_cxambrotipo_khotelo_fkey` (`khotelo`),
  CONSTRAINT `k_hotelo_cxambrotipo_khcxambrotipo_fkey` FOREIGN KEY (`khcxambrotipo`) REFERENCES `k_h_cxambrotipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_hotelo_cxambrotipo_khotelo_fkey` FOREIGN KEY (`khotelo`) REFERENCES `k_hotelo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Permesas al iu aligxinto mendi hotelon*/

CREATE TABLE `k_hotelo_mendo` (
  `id` int(11) NOT NULL,
  `idkaligxinto` int(11) DEFAULT NULL,
  `khotelocxambrotipo` int(11) DEFAULT NULL,
  `alvendato` date DEFAULT NULL,
  `forirdato` date DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL, /*Ĝenerale devas esti nur 1. Ni ĝenerale volas ke homoj nur
    rezervu por ili mem sed povas esti ekcepta kazo (iu kiu mendas 2-personan
    liton nur por li).*/
  `kunkogxantoj` longtext, /*Simpla teksta kampo, tiel ke plenigita de la uzanto. La sistemo poste tradukas tion per la tablo k_h_kunlogxanto.*/
  PRIMARY KEY (`id`),
  KEY `k_hotelo_mendo_idkaligxinto_fkey` (`idkaligxinto`),
  KEY `k_hotelo_mendo_khotelocxambrotipo_fkey` (`khotelocxambrotipo`),
  CONSTRAINT `k_hotelo_mendo_idkaligxinto_fkey` FOREIGN KEY (`idkaligxinto`) REFERENCES `k_aligxinto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_hotelo_mendo_khotelocxambrotipo_fkey` FOREIGN KEY (`khotelocxambrotipo`) REFERENCES `k_hotelo_cxambrotipo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ref_k_h_kunlogxanto` (
  `idhmendo` int(11) NOT NULL,
  `idkaligxinto` int(11) NOT NULL,
  PRIMARY KEY (`idhmendo`,`idkaligxinto`),
  KEY `ref_k_h_kunlogxanto_idkaligxinto_fkey` (`idkaligxinto`),
  CONSTRAINT `ref_k_h_kunlogxanto_idhmendo_fkey` FOREIGN KEY (`idhmendo`) REFERENCES `k_hotelo_mendo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_k_h_kunlogxanto_idkaligxinto_fkey` FOREIGN KEY (`idkaligxinto`) REFERENCES `k_aligxinto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el uea:akpk*/
CREATE TABLE `k_antauxkajpost` (
  `id` int(11) NOT NULL,
  `idkongreso` int(11) DEFAULT NULL,
  `titolo` longtext,
  `komencdato` date DEFAULT NULL,
  `findato` date DEFAULT NULL,
  `revenloko` longtext,
  `priskribo` longtext,
  `kvanto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_antauxkajpost_idkongreso_fkey` (`idkongreso`),
  CONSTRAINT `k_antauxkajpost_id_fkey` FOREIGN KEY (`id`) REFERENCES `antauxdumpostkongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `k_antauxkajpost_idkongreso_fkey` FOREIGN KEY (`idkongreso`) REFERENCES `kongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `k_ekskurso` (
  `id` int(11) NOT NULL,
  `idkongresoauxantauxpost` int(11) DEFAULT NULL,
  `titolo` longtext,
  `priskribo` longtext,
  `dato` date DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `k_ekskurso_idkongresoauxantauxpost_fkey` (`idkongresoauxantauxpost`),
  CONSTRAINT `k_ekskurso_idkongresoauxantauxpost_fkey` FOREIGN KEY (`idkongresoauxantauxpost`) REFERENCES `antauxdumpostkongreso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ref_k_ekskurso_mendo` (
  `idkaligxinto` int(11) NOT NULL,
  `idkekskurso` int(11) NOT NULL,
  PRIMARY KEY (`idkaligxinto`,`idkekskurso`),
  KEY `ref_k_ekskurso_mendo_idkekskurso_fkey` (`idkekskurso`),
  CONSTRAINT `ref_k_ekskurso_mendo_idkaligxinto_fkey` FOREIGN KEY (`idkaligxinto`) REFERENCES `k_aligxinto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_k_ekskurso_mendo_idkekskurso_fkey` FOREIGN KEY (`idkekskurso`) REFERENCES `k_ekskurso` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA libroservo *****/

/*datumoj el uea:ls*/
CREATE TABLE `ref_k_antauxkajpost_mendo` (
  `idkaligxinto` int(11) NOT NULL,
  `idkantauxkajpost` int(11) NOT NULL,
  PRIMARY KEY (`idkaligxinto`,`idkantauxkajpost`),
  KEY `ref_k_antauxkajpost_mendo_idkantauxkajpost_fkey` (`idkantauxkajpost`),
  CONSTRAINT `ref_k_antauxkajpost_mendo_idkaligxinto_fkey` FOREIGN KEY (`idkaligxinto`) REFERENCES `k_aligxinto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_k_antauxkajpost_mendo_idkantauxkajpost_fkey` FOREIGN KEY (`idkantauxkajpost`) REFERENCES `k_antauxkajpost` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ls_verkisto` ( /*aux auxtoro, aux tradukisto, aux kontribuanto*/
  `id` int(11) NOT NULL,
  `familinomo` longtext,
  `personanomo` longtext,
  `idmembro` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ls_verkisto_idmembro_fkey` (`idmembro`),
  CONSTRAINT `ls_verkisto_idmembro_fkey` FOREIGN KEY (`idmembro`) REFERENCES `uzanto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `ls_kategorio` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ls_subkategorio` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  `priskribo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ls_sxlosilvorto` (
  `id` int(11) NOT NULL,
  `vorto` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*Helpos trovi libron laŭ eldonisto kaj havi organizitan eldonistan liston
 Plenigita el ueadb:eldonitade
 */

CREATE TABLE `ls_eldonisto` (
  `id` int(11) NOT NULL,
  `nomo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el uea:ls*/

CREATE TABLE `libroservo` (
  `id` int(11) NOT NULL,
  `kodo` varchar(9) DEFAULT NULL,
  `jaro` date DEFAULT NULL,
  `prezo` int(11) DEFAULT NULL, /* *cent por havi ĝin en centoj */
  `rabatoricevita` int(11) DEFAULT NULL,
  `rabatodonata` int(11) DEFAULT NULL,
  `fakturtitolo` longtext,
  `titolo` longtext,
  `aldonatitolo` longtext,
  `idauxtoro` int(11) DEFAULT NULL,
  `kontribuantoj` longtext, /*TODO: ĉu nova table ls_kontribuantoj kiu ligas intger libroservo kaj ls_verkisto*/
  `idkategorio` int(11) DEFAULT NULL,
  `idsubkategorio` int(11) DEFAULT NULL,
  `idtradukisto` int(11) DEFAULT NULL,
  `lingvajinformoj` longtext,
  `eldonloko` int(11) DEFAULT NULL,
  `ideldonisto` int(11) DEFAULT NULL,
  `eldonjaro` date DEFAULT NULL,
  `imposto` int(11) DEFAULT NULL,
  `isbnissn` longtext,
  `alteco` longtext,
  `pagxnombro` int(11) DEFAULT NULL,
  `acxetprezo` int(11) DEFAULT NULL, /* *cent por havi ĝin en centoj */
  `acxetvaluto` int(11) DEFAULT NULL,/* *cent por havi ĝin en centoj */
  `stokvaloro` int(11) DEFAULT NULL, /* *cent por havi ĝin en centoj */
  `dato` date DEFAULT NULL,
  `enirukat` longtext, /*TODO: mi ne komprenas tiun kampon*/
  `mendoloke` longtext,
  `aldinf` longtext,
  `ladere` longtext,
  `recenre` longtext,
  `specialajinf` longtext,
  `katalogaklar` longtext,
  `kvanto` int(11) DEFAULT NULL,
  `komisiakvanto` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `libroservo_eldonloko_fkey` (`eldonloko`),
  KEY `libroservo_idauxtoro_fkey` (`idauxtoro`),
  KEY `libroservo_ideldonisto_fkey` (`ideldonisto`),
  KEY `libroservo_idkategorio_fkey` (`idkategorio`),
  KEY `libroservo_idsubkategorio_fkey` (`idsubkategorio`),
  KEY `libroservo_idtradukisto_fkey` (`idtradukisto`),
  CONSTRAINT `libroservo_eldonloko_fkey` FOREIGN KEY (`eldonloko`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `libroservo_idauxtoro_fkey` FOREIGN KEY (`idauxtoro`) REFERENCES `ls_verkisto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `libroservo_ideldonisto_fkey` FOREIGN KEY (`ideldonisto`) REFERENCES `ls_eldonisto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `libroservo_idkategorio_fkey` FOREIGN KEY (`idkategorio`) REFERENCES `ls_kategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `libroservo_idsubkategorio_fkey` FOREIGN KEY (`idsubkategorio`) REFERENCES `ls_subkategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `libroservo_idtradukisto_fkey` FOREIGN KEY (`idtradukisto`) REFERENCES `ls_verkisto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:brok */
CREATE TABLE `brok` (
  `id` int(11) NOT NULL, /*el uea:bvar*/
  `titolo` longtext,
  `idkategorio` int(11) DEFAULT NULL,
  `idsubkategorio` int(11) DEFAULT NULL,
  `idtradukisto` int(11) DEFAULT NULL,
  `eldonloko` int(11) DEFAULT NULL,
  `eldonjaro` int(11) DEFAULT NULL,
  `eldi` longtext, /*povas esti '1a', '2a korektita' ... do bezonas esti 'string'*/
  `pagxoj` int(11) DEFAULT NULL,
  `prezo` int(11) DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL,
  `bind` longtext,
  `aldone` longtext,
  `posedanto` longtext,
  `loko` longtext,
  PRIMARY KEY (`id`),
  KEY `brok_eldonloko_fkey` (`eldonloko`),
  KEY `brok_idkategorio_fkey` (`idkategorio`),
  KEY `brok_idsubkategorio_fkey` (`idsubkategorio`),
  KEY `brok_idtradukisto_fkey` (`idtradukisto`),
  CONSTRAINT `brok_eldonloko_fkey` FOREIGN KEY (`eldonloko`) REFERENCES `urbo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `brok_idkategorio_fkey` FOREIGN KEY (`idkategorio`) REFERENCES `ls_kategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `brok_idsubkategorio_fkey` FOREIGN KEY (`idsubkategorio`) REFERENCES `ls_subkategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `brok_idtradukisto_fkey` FOREIGN KEY (`idtradukisto`) REFERENCES `ls_verkisto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `brok_periodajxo` (
  `id` int(11) NOT NULL,
  `ueakodo` longtext,
  `titolo` longtext,
  `subtitolo` longtext,
  `bildo` longtext,
  `notoj` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*datumoj el ueadb:brok_periodajhoj */

CREATE TABLE `brok_periodajxo_numero` (
  `id` int(11) NOT NULL,
  `idperiodjxoj` int(11) DEFAULT NULL,
  `stato` longtext,
  `jaro` int(11) DEFAULT NULL,
  `jaro2` int(11) DEFAULT NULL, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  `numero` longtext,
  `monato` int(11) DEFAULT NULL, /*de 1 ĝis 12*/
  `monato2` int(11) DEFAULT NULL, /*de 1 ĝis 12, simila la 'jaro2'*/
  `notoj` longtext,
  `prezokategorio` longtext,
  `prezo` int(11) DEFAULT NULL, /*nur uzata se prezokategorio estas 'NULL'*/
  `kvanto` int(11) DEFAULT NULL,
  `deponloko` longtext,
  `enskribitade` longtext,
  PRIMARY KEY (`id`),
  KEY `brok_periodajxo_numero_idperiodjxoj_fkey` (`idperiodjxoj`),
  CONSTRAINT `brok_periodajxo_numero_idperiodjxoj_fkey` FOREIGN KEY (`idperiodjxoj`) REFERENCES `brok_periodajxo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `brok_periodajxoj_jarkolekto` (
  `id` int(11) NOT NULL,
  `idperiodjxoj` int(11) DEFAULT NULL,
  `notoj` longtext,
  `stato` longtext,
  `prezokategorio` longtext,
  `prezo` int(11) DEFAULT NULL, /*nur uzata se prezokategorio estas 'NULL'*/
  `jaro` int(11) DEFAULT NULL,
  `jaro2` int(11) DEFAULT NULL, /*se ĝi estas uzata tio 'jaro' estas komencdato kaj 'jaro2' estas findato.*/
  `numeroj` longtext,
  `kvanto` int(11) DEFAULT NULL,
  `deponloko` longtext,
  `enskribitade` longtext,
  PRIMARY KEY (`id`),
  KEY `brok_periodajxoj_jarkolekto_idperiodjxoj_fkey` (`idperiodjxoj`),
  CONSTRAINT `brok_periodajxoj_jarkolekto_idperiodjxoj_fkey` FOREIGN KEY (`idperiodjxoj`) REFERENCES `brok_periodajxo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ref_ls_ls_sxlosilvorto` (
  `idls` int(11) NOT NULL,
  `idsxlosilvorto` int(11) NOT NULL,
  PRIMARY KEY (`idls`,`idsxlosilvorto`),
  KEY `ref_ls_ls_sxlosilvorto_idsxlosilvorto_fkey` (`idsxlosilvorto`),
  CONSTRAINT `ref_ls_ls_sxlosilvorto_idls_fkey` FOREIGN KEY (`idls`) REFERENCES `libroservo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_ls_ls_sxlosilvorto_idsxlosilvorto_fkey` FOREIGN KEY (`idsxlosilvorto`) REFERENCES `ls_sxlosilvorto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `brosxuro` (
  `id` int(11) NOT NULL,
  `titolo` longtext,
  `idlando` int(11) DEFAULT NULL,
  `loko` longtext,
  `eldonloko` longtext,
  `jaro` int(11) DEFAULT NULL,
  `prezo` int(11) DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL,
  `bildo` longtext,
  `formato` longtext,
  `pagxo` int(11) DEFAULT NULL,
  `stato` longtext,
  `notoj` longtext,
  PRIMARY KEY (`id`),
  KEY `brosxuro_idlando_fkey` (`idlando`),
  CONSTRAINT `brosxuro_idlando_fkey` FOREIGN KEY (`idlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `recenzo` (
  `id` int(11) NOT NULL,
  `vnum` int(11) DEFAULT NULL, /*mi ne komprenis la signifon de tiu kampo*/
  `kodo` longtext,
  `dato` date DEFAULT NULL,
  `rectitolo` longtext,
  `recautoro` longtext,
  `fonto` longtext,
  `ligilo` longtext,
  `recenzo` longtext,
  `nomo` longtext, /*mi ne bone komprenas al kiu ĝi celas*/
  `rajto` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `opinio` (
  `id` int(11) NOT NULL,
  `num` int(11) DEFAULT NULL,
  `dato` date DEFAULT NULL,
  `opinio` longtext,
  `nomo` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Tiu korespondas al iu aĉeta ago sur la libro servo. varmendo_varoj ligas al ĝi kaj permesas scii kiujn varojn estis aĉetitaj.

el retdb:varmendintoj

 */

CREATE TABLE `varmendo` (
  `id` int(11) NOT NULL,
  `iduzanto` int(11) DEFAULT NULL,
  `dato` date DEFAULT NULL,
  `ricevantfamilinomo` longtext, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  `ricevantpersononomo` longtext, /* kaze ke ĝi ne estas tiu de la id_uzanto*/
  `ricevantadreso` longtext,
  `ricevanturbo` longtext,
  `ricevantpoŝtkdo` longtext,
  `idricevantlando` int(11) DEFAULT NULL,
  `ricevanttelkodo` longtext,
  `ricevanttelhejmo` longtext,
  `ricevantteloficejo` longtext,
  `ricevantfakso` longtext,
  `ricevatretadreso` longtext,
  `idpagmaniero` longtext, /*TODO: pripensi bezono havi tiun kampon kun la nova pagsistemo kiu estos proponita.*/
  `validigo` longtext,
  `notoj` longtext,
  `rabato` int(11) DEFAULT NULL, /*inter 0 kaj 100, estas rabata procento.*/
  /*la prezo ne aperas kiel kampo, ĝi estas kalkulita el la diversaj varmendo_varoj modifiita de la rabato. */
  PRIMARY KEY (`id`),
  KEY `varmendo_idricevantlando_fkey` (`idricevantlando`),
  KEY `varmendo_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `varmendo_idricevantlando_fkey` FOREIGN KEY (`idricevantlando`) REFERENCES `lando` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `varmendo_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
el retdb:varmendo
 */
CREATE TABLE `varmendo_varo` (
  `id` int(11) NOT NULL,
  `idvarmendo` int(11) DEFAULT NULL,
  `idlibroservo` int(11) DEFAULT NULL,
  `kvanto` int(11) DEFAULT NULL,
  `pagsumo` int(11) DEFAULT NULL, /*dum la mendo defaŭlte estas la varprezo, sed administranto povas ŝanĝi ĝin laŭ rabatoj. Tiu prezo estas sumo de la kvanto: se ni aĉetas 3 varoj kiuj kostas 500, ĝi enhavas 1500.*/
  `avisumo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `varmendo_varo_idlibroservo_fkey` (`idlibroservo`),
  KEY `varmendo_varo_idvarmendo_fkey` (`idvarmendo`),
  CONSTRAINT `varmendo_varo_idlibroservo_fkey` FOREIGN KEY (`idlibroservo`) REFERENCES `libroservo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `varmendo_varo_idvarmendo_fkey` FOREIGN KEY (`idvarmendo`) REFERENCES `varmendo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/**** PRI LA REVUO ESPERANTO KAJ KONTAKTO ***/

*/*datumoj el uea:abonoj*/
CREATE TABLE `revua_abono` (
  `id` int(11) NOT NULL,
  `kodo` longtext,
  `titolo` longtext,
  `klarigo` longtext,
  `ofteco` int(11) DEFAULT NULL,
  `prezo` int(11) DEFAULT NULL,
  `aerposxto` int(11) DEFAULT NULL,
  `rete` int(11) DEFAULT NULL,
  `difinebla` longtext,
  `dprez` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*nova tablo: mi ne trovis kie estas konservita tiun rilaton*/
/*el retdb:abmendo */

CREATE TABLE `ref_revua_abonantoj` (
  `id` int(11) NOT NULL,
  `idrevuaabono` int(11) DEFAULT NULL,
  `iduzantoauxasocio` int(11) DEFAULT NULL,
  `jaro` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ref_revua_abonantoj_idrevuaabono_fkey` (`idrevuaabono`),
  KEY `ref_revua_abonantoj_iduzantoauxasocio_fkey` (`iduzantoauxasocio`),
  CONSTRAINT `ref_revua_abonantoj_idrevuaabono_fkey` FOREIGN KEY (`idrevuaabono`) REFERENCES `revua_abono` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_revua_abonantoj_iduzantoauxasocio_fkey` FOREIGN KEY (`iduzantoauxasocio`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Por abonoj al revuoj
el retdb:abmendo
 */
CREATE TABLE `varmendo_abono` (
  `id` int(11) NOT NULL,
  `idvarmendo` int(11) DEFAULT NULL,
  `idrevuaabono` int(11) DEFAULT NULL,
  `prioritataposxto` tinyint(4) DEFAULT NULL,
  `difino` int(11) DEFAULT NULL,
  `pagsumo` int(11) DEFAULT NULL,
  `avi` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `varmendo_abono_idrevuaabono_fkey` (`idrevuaabono`),
  KEY `varmendo_abono_idvarmendo_fkey` (`idvarmendo`),
  CONSTRAINT `varmendo_abono_idrevuaabono_fkey` FOREIGN KEY (`idrevuaabono`) REFERENCES `revua_abono` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `varmendo_abono_idvarmendo_fkey` FOREIGN KEY (`idvarmendo`) REFERENCES `varmendo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***** LIGITA AL LA spezoj (peranto) *****/

/*el ueadb:spezaro (ili havas tipon 1 kaj kategorio kiel "270;;0;0;0;;0;0;0".*/
CREATE TABLE `kongresa_spezraporto` (
  `id` int(11) NOT NULL,
  `dato` date DEFAULT NULL,
  `idperanto` int(11) DEFAULT NULL,
  `valuto` longtext,
  `noto` longtext,
  `validita` tinyint(4) DEFAULT NULL, /*akceptita de administranto*/
  `printia` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kongresa_spezraporto_idperanto_fkey` (`idperanto`),
  CONSTRAINT `kongresa_spezraporto_idperanto_fkey` FOREIGN KEY (`idperanto`) REFERENCES `peranto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Ero de kongresa spezraporto*/
CREATE TABLE `kongresa_spezraportero` (
  `id` int(11) NOT NULL,
  `idkongresaspezraporto` int(11) DEFAULT NULL,
  `iduzanto` int(11) DEFAULT NULL, /*povas esti 'NULL' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'NULL.*/
  `nomouzanto` longtext, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  `kongresakotizo` int(11) DEFAULT NULL,
  `kongresajmendoj` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kongresa_spezraportero_idkongresaspezraporto_fkey` (`idkongresaspezraporto`),
  KEY `kongresa_spezraportero_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `kongresa_spezraportero_idkongresaspezraporto_fkey` FOREIGN KEY (`idkongresaspezraporto`) REFERENCES `kongresa_spezraporto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `kongresa_spezraportero_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `ks_pag_kampo` (
  `id` int(11) NOT NULL,
  `priskribo` longtext,
  `defauxltavaluto` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `ref_kongresa_spezraportero_ks_pag_kampo` (
  `idkongresaspezraportero` int(11) NOT NULL,
  `idkspagkampo` int(11) NOT NULL,
  `sumo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idkongresaspezraportero`,`idkspagkampo`),
  KEY `ref_kongresa_spezraportero_ks_pag_kampo_idkspagkampo_fkey` (`idkspagkampo`),
  CONSTRAINT `ref_kongresa_spezraportero_ks_pag__idkongresaspezraportero_fkey` FOREIGN KEY (`idkongresaspezraportero`) REFERENCES `kongresa_spezraportero` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ref_kongresa_spezraportero_ks_pag_kampo_idkspagkampo_fkey` FOREIGN KEY (`idkspagkampo`) REFERENCES `ks_pag_kampo` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*el ueadb:spezaro kaj ueadb:spezo (ili havas tipon 0) */
CREATE TABLE `gxen_spezraporto` (
  `id` int(11) NOT NULL,
  `dato` date DEFAULT NULL,
  `idperanto` int(11) DEFAULT NULL,
  `valuto` longtext,
  `noto` longtext,
  `validita` tinyint(4) DEFAULT NULL, /*akceptita de administranto*/
  `printita` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gxen_spezraporto_idperanto_fkey` (`idperanto`),
  CONSTRAINT `gxen_spezraporto_idperanto_fkey` FOREIGN KEY (`idperanto`) REFERENCES `peranto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `gxen_spezraporto_kotizo` (
  `id` int(11) NOT NULL,
  `idgxenspezraporto` int(11) DEFAULT NULL,
  `iduzanto` int(11) DEFAULT NULL, /*povas esti 'NULL' ĉar ni povas havi spezraporton pri ne uzanto. Tiu kaze nomo_uzanto ne devas esti 'NULL.*/
  `nomouzanto` longtext, /*Null por uea uzanto, alkaze permesas identigi la perata ento.*/
  `idanokategorio` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gxen_spezraporto_kotizo_idanokategorio_fkey` (`idanokategorio`),
  KEY `gxen_spezraporto_kotizo_idgxenspezraporto_fkey` (`idgxenspezraporto`),
  KEY `gxen_spezraporto_kotizo_iduzanto_fkey` (`iduzanto`),
  CONSTRAINT `gxen_spezraporto_kotizo_idanokategorio_fkey` FOREIGN KEY (`idanokategorio`) REFERENCES `anokategorio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `gxen_spezraporto_kotizo_idgxenspezraporto_fkey` FOREIGN KEY (`idgxenspezraporto`) REFERENCES `gxen_spezraporto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `gxen_spezraporto_kotizo_iduzanto_fkey` FOREIGN KEY (`iduzanto`) REFERENCES `uzantoauxasocio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `gxen_spezraportero` (
  `id` int(11) NOT NULL,
  `idgxenspezraporto` int(11) DEFAULT NULL,
  `enspezo` tinyint(4) DEFAULT NULL, /*Se true do enspezo, Se false do elspezo*/
  `priskribo` longtext,
  `sumo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gxen_spezraportero_idgxenspezraporto_fkey` (`idgxenspezraporto`),
  CONSTRAINT `gxen_spezraportero_idgxenspezraporto_fkey` FOREIGN KEY (`idgxenspezraporto`) REFERENCES `gxen_spezraporto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/***************/
