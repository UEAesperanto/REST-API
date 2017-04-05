# Priskribo de la strukturo de la Datumbazo de UEA

## pri bazaj uzantoj

la bazaj uzantoj povas esti aŭ 'fizikaj homoj' aŭ asocioj.
la informoj de fizikaj homoj venas el la tabelo 'uzanto'.
la informoj de la asocioj venas el la tabelo 'asocio'.
ĉar, pluraj taskoj (ekzemple peranto) povas esti sen distinge farita de iu asocio aŭ individuo, la "primary key" de la tabeloj 'uzanto' aŭ 'asocio' estas "foreign key" de la tabelo 'uzantoauxasocio' kiu permesas same referenci ilin.


## pri rajtoj

rajtoj povas esti dinamike difinitaj en la tabelo 'adminrajto' kaj poste povas
esti donitaj al uzantoj tra la ligila tabelo 'ref_rajtgrupo_uzanto' aŭ tra uzantgrupoj tra "rajtgrupo" kaj "ref_rajtgrupo_uzanto"

### La tipo de rajtoj kiujn ni havas estas:
  - spezfolia_skribado
  - spezfolia_legado
  - uk_skribado
  - uk_legado
  - gk_skribado
  - gk_legado
  - gxir_skribado
  - gxir_legado
  ....

Ĝenerale, kiam oni kreas iun servon oni devas defini kiu rajtas ĝin administri (skribado) kaj vidi ĝian staton (legado).

## Pri uzantkategorioj
  ### Komitatoj :
  Ni havas plurajn komitatajn kategoriojn:
  - KOM.A - komitatano A
  - KOM.B - komitatano B
  - KOM.C - komitatano C
  - observanto
  La datumbazo permesas facile aldoni aŭ ŝanĝi la kategoriojn.

### estaro:
Estraro enhavas ligilojn al la uzantoj kiuj estas estrarano de UEA

### peranto:
Peranto estas uzantoj (aŭ asocioj) kiuj helpas al aliaj aliĝi al UEA/UK kaj kiuj respondecas pri monaj interŝanĝoj inter la perataj kaj UEA. 

## tasko: 
La taskoj povas esti **“volontulo”**, **“oficisto”** aŭ diversaj. Vi ne devas ĉion koni sed permesi al administrantoj krei taskojn kaj ligi uzantoj al ili.

## respondeco:
Similas al tasko, ekzemple “iku”, “internacia ekzameno”.

## anokategorio:
La anokategorioj estas la venontaj:
 - MA: membro-abonanto
 - MA(T): membro-abonanto kun Kontakto
 - MG: membro kun Gvidlibro
 - MJ: membro kun jarlibro
 - MJ(T): membro kun jarlibro kaj Kontakto
 - DM: dumviva membro
 - DMJ: dumviva membro kun JL (sen "la Revuo Esperanto")
 - DMT: dumviva membro en TEJO-aĝo
 - DMJ(T): dumviva membro en TEJO-aĝo kun JL
 - DP: dumviva patrono de UEA
 - HM: honora membro
 - HPK: honora patrono

Simile, administranto facile devas povi aldoni ŝanĝi ilin.

La tabelo "ref_uzantoAuxAsocio_anokategorio" permesas scii por ĉiuj jaroj kiu estis membro laŭ kiu kategorio.
La tabelo "ref_anokategorio_lando" permesas scii kiu estas la aliĝprezo al unu kategorio por unu lando.

### uzantogrupo
La lasta afero pri uzantoj estas ke oni povas voli fari grupon laŭ diverŝaj kriterioj kaj ŝerĉi laŭ ili. Tuo uzantogrupo tabelo permesas tion fari.


## Pri Monkonta sistemo
Ĝi estas la monkonta sistemo de la membroj. Ĝi estas sufice simpla. Estas unu tabelo "konto" kiu permesas koni la diversajn kontoj. Al kontoj, oni ligas ĝiro. Defaŭte konto estas je 0€ kaj la ĝiroj permesas krediti aŭ debeti ĝin. Ĉiuj ĝiroj povas esti farita el iu "konto" aŭ el null (ni tiam enmetas monon en la sistem). Same ĝi povas esti farita al iu konto se alKonto referencas alia konto aŭ foriri se ĝi alKonto estas null.
La tabelo gxiro ne estas sole uzita, sed ĉiam estas ligita al iu ĝxirpropono farita de iu uzanto kun kialo. La solaj aplikataj ĝiroj estas ligita al la tabelo "aprobitagxiro" kiu konseras ligilon al la aprobinto.

## Pri retUzanto
Tiu tabelo estas ĉi tie por historiaj kialoj. Povas esti uzata aŭ ne.

## Pri dissenda sistemo
La retejo de UEA devas permesi dissendi retmesaĝojn al membro de la asocio.
