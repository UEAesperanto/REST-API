[![Esperanto](https://img.shields.io/badge/Esperanto-jes-green.svg)](https://eo.wikipedia.org/wiki/Esperanto)

# Datumbazo kaj REST-API de la Universala Esperanto-Asocio (UEA)

Ĉiuj kodoj kaj ĉiuj rajtoj ligitaj al ili ĉi tie apartenas al la Universala Esperanto-Asocio (UEA), 2017.
Por pliaj detaloj pri kiel ĝi funkcias, vidu la [vikion](https://github.com/RibeiroAna/datumbazoUEA/wiki) de tiu ĉi ujo.

## Dependecoj 

Por faciligi la instaladon, oni uzas la teknologion [Docker](https://www.docker.com/). Do la unua paŝo estas instali Docker en via komputilo kaj komencigi ĝin. Instruoj anglingve pri kiel fari tion estas [en tiu ligilo](https://www.docker.com/community-edition)

## Instalado

Kiam vi certigus ke Docker estas boninstalita, aliru al la dosierujo per Terminal (en Vindozo, prompt) kie vi elŝutis tiun ĉi kodo kaj tajpu:

 `docker-compose up --build -d`

 **Atentu** ke ĝi verŝajne ne bone funkcios se en la dosierujo kiun vi enmetis la kodon estus bezonata havi superuzantaj permesoj (sudo), vi devas ebligi ke tio estu uzita sen superuzantaj privilegioj.

 Por certigi ke ĉio okazis bone, tajpu `docker ps` kaj devus aperi la jenon:

````
CREATED                       STATUS                   PORTS                                NAMES
10 minutes ago              Up 10 minutes       0.0.0.0:3000->3000/tcp   datumbazouea_api_1
10 minutes ago              Up 10 minutes       0.0.0.0:3306->3306/tcp   datumbazouea_mysql_1

````

Tio estas ĉio, vi jam povos aliri API je `http://localhost:3000` kaj sekvi nian [dokumentadon](https://github.com/RibeiroAna/datumbazoUEA/wiki) por lerni kiel uzi ĝin.

## Testoj

Por lanĉi la aŭtomatajn testojn, tajpu:

`docker-compose -f ./uea-test/docker-compose-test.yaml up --build -d`

## Agordado

Dependante je kiel via datumbazo estas agordita, povas esti ke la REST-API ne plene funkcios, do necesas agordi tion en la arĥivo `datumbazoUEA/uea-api/config.js`.

## Malinstalado

Por malinstali, simple tajpu:

`docker-compose down`

Kaj forviŝu la arĥivojn de la komputilo.

## Kromaj Docker komandoj kiuj povas esti utilaj

* `docker logs -f datumbazouea_api_1`: Montras la konzolo de la API kiu estas en `localhost:3000`;
* `docker exec -it datumbazouea_mysql_1 bash` sekvita de `mysql -uroot -p"$MYSQL_ROOT_PASSWORD" uea`: donas aliron al la shell de la datumbazo;


## Aǔtoroj

La aŭtoroj de la kodoj estas la jenaj:
- Ana Maria da Costa Ribeiro [@RibeiroAna](https://github.com/RibeiroAna/)
- Victor Hugo Fernandes de Sousa [@VictorHundo](https://github.com/VictorHundo/)
- Pierre Vittet [@Piervit](https://github.com/Piervit/)
