[![Esperanto](https://img.shields.io/badge/Esperanto-jes-green.svg)](https://eo.wikipedia.org/wiki/Esperanto)
[![HTTPS](https://img.shields.io/badge/HTTPS-jes-green.svg)](https://letsencrypt.org/)
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/UEAesperanto/REST-API)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE)

# Datumbazo kaj REST-API de la Universala Esperanto-Asocio (UEA)

Ĉiuj kodoj kaj ĉiuj rajtoj ligitaj al ili ĉi tie apartenas al la Universala Esperanto-Asocio (UEA), 2017.
Por pliaj detaloj pri kiel ĝi funkcias, vidu la [vikion](https://github.com/RibeiroAna/datumbazoUEA/wiki) de tiu ĉi ujo.

## Dependecoj

Por faciligi la instaladon, oni uzas la teknologion [Docker](https://www.docker.com/). Do la unua paŝo estas instali Docker en via komputilo kaj komencigi ĝin. Instruoj anglingve pri kiel fari tion estas [en tiu ligilo](https://www.docker.com/community-edition)

## Instalado

Kiam vi certigus ke Docker estas boninstalita, aliru al la dosierujo per Terminal (en Vindozo, prompt) kie vi elŝutis tiun ĉi kodo kaj tajpu:

````
docker-compose up --build -d
````

 **Atentu** ke ĝi verŝajne ne bone funkcios se en la dosierujo kiun vi enmetis la kodon estus bezonata havi superuzantaj permesoj (sudo), vi devas ebligi ke tio estu uzita sen superuzantaj privilegioj.

 Por certigi ke ĉio okazis bone, tajpu `docker ps` kaj devus aperi ion kiel la jeno:

````
CREATED                       STATUS                  PORTS                              NAMES
10 minutes ago              Up 10 minutes       0.0.0.0:3000->3000/tcp   uea-api
10 minutes ago              Up 10 minutes       0.0.0.0:3306->3306/tcp  uea-datumbazo
````

Tio estas ĉio, vi jam povos aliri API je `http://localhost:3000` kaj sekvi nian [dokumentadon](/datumbazoUEA/wiki) por lerni kiel uzi ĝin.

## Testoj

Por ekzekuti la aŭtomatajn testojn, tajpu:

`docker-compose -f docker/test/docker-test.yaml up --build -d`

Por vidi la testojn, tajpu:

`docker logs -f uea-api`

## Agordado

Dependante je kiel via datumbazo estas agordita, povas esti ke la REST-API ne plene funkcios, do necesas agordi tion en la arĥivo `config.js`.

## Malinstalado

Por malinstali, simple tajpu:

`docker-compose down`

Kaj forviŝu la arĥivojn de la komputilo.

## Kromaj Docker komandoj kiuj povas esti utilaj

* `docker logs -f uea-api`: Montras la konzolon de la API;
* `docker exec -it uea-datumbazo bash` sekvita de `mysql -uroot -p"$MYSQL_ROOT_PASSWORD" uea`: donas aliron al la shell de la datumbazo;


## Aŭtoroj

La aŭtoroj de la kodoj estas la jenaj:
- Ana Maria da Costa Ribeiro [@RibeiroAna](https://github.com/RibeiroAna/)
- Victor Hugo Fernandes de Sousa [@VictorHundo](https://github.com/VictorHundo/)
- Jefferson Carlos Benedito [@jeffersontuc](https://github.com/jeffersontuc)
- Pierre Vittet [@Piervit](https://github.com/Piervit/)
