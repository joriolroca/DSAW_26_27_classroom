/* ==========================================================================
   ENDEVINA EL FETCH - dades de la pàgina
   Les dades de cada fragment: títol, solució i explicació. pagina.js les fa
   servir per construir la pàgina.
   Per afegir o canviar un fragment, només cal modificar aquest fitxer (i
   fragments.js, si canvia el codi).
   ========================================================================== */


// ---------- DADES DELS FRAGMENTS ----------
// bloc:       títol del bloc que comença en aquest fragment
// textBloc:   paràgraf que es mostra sota el títol del bloc
// funcio:     la funció de fragments.js que s'executa i es mostra
// nota:       aclariment que es mostra sobre el codi
// fitxers:    fitxers que demana el fragment. La pàgina en llegeix i en
//             mostra el contingut real.
// respostes:  extractes de les respostes d'una API, escrits a mà perquè les
//             respostes reals són molt llargues
// resultat:   línies que surten a la consola, en ordre
// explicacio: paràgrafs de l'explicació. El text entre `accents greus` es
//             mostra com a codi.

// Notes que es repeteixen en diversos fragments
const NOTA_PROMESA = "Quan el resultat és una promesa, n'hi ha prou d'escriure'n l'estat, per exemple `pending` o `fulfilled`.";
const NOTA_404 = "Quan una petició rep un 404, el navegador hi afegeix pel seu compte una línia vermella (per exemple, `GET .../pokemon/noexisteix 404 (Not Found)`). No la fa el codi: no cal que l'escriguis a la predicció.";
const NOTA_XARXA = "Quan no es troba el servidor, el navegador hi afegeix pel seu compte una línia vermella (a Chrome, per exemple, `GET https://pokeapi.invalid/... net::ERR_NAME_NOT_RESOLVED`). No la fa el codi: no cal que l'escriguis a la predicció.";

// Extractes de les respostes de PokéAPI
const PIKACHU = {
  titol: "Extracte de la resposta de https://pokeapi.co/api/v2/pokemon/pikachu",
  text: '{\n  "id": 25,\n  "name": "pikachu",\n  "height": 4,\n  "weight": 60,\n  ...\n}',
};
const BULBASAUR = {
  titol: "Extracte de la resposta de https://pokeapi.co/api/v2/pokemon/bulbasaur",
  text: '{\n  "id": 1,\n  "name": "bulbasaur",\n  ...\n}',
};
const NO_EXISTEIX = {
  titol: "Resposta de https://pokeapi.co/api/v2/pokemon/noexisteix",
  text: "Estat: 404 Not Found\nCos: Not Found",
  llenguatge: "text",
};

const FRAGMENTS = [
  {
    bloc: "Bloc 1. Llegir un fitxer JSON",
    textBloc: "Els fragments d'aquest bloc demanen fitxers de la carpeta `dades/`, que són al mateix servidor que la pàgina. A cada fragment es mostra el contingut del fitxer que demana.",
    num: 1,
    titol: "Què retorna fetch?",
    funcio: fragment1,
    fitxers: ["dades/lletra.json"],
    nota: NOTA_PROMESA,
    resultat: ["Promise {<pending>}"],
    explicacio: [
      "`fetch` no retorna les dades, sinó una promesa. La petició s'acaba d'enviar i el servidor encara no ha respost: l'estat és `pending` (apartat 7.1 de la teoria).",
      "A l'A1, `esPositiu` cridava `resolve` a l'instant, dins de la mateixa `new Promise`, i la promesa ja estava resolta en fer el `console.log`. Aquí qui resol la promesa és el navegador quan arriba la resposta, i això no pot passar abans de la línia següent.",
      "Si a Chrome despleges la promesa uns segons després, el detall mostra `fulfilled`: és l'estat del moment en què la despleges, no del moment del `console.log`.",
    ],
  },
  {
    num: 2,
    titol: "Els dos await",
    funcio: fragment2,
    fitxers: ["dades/lletra.json"],
    nota: "Quan el resultat és un objecte, escriu-lo tal com el mostraria la consola, per exemple `{lletra: 'A'}`.",
    resultat: ["{lletra: 'Z'}", "Z"],
    explicacio: [
      "La petició té dos moments asíncrons i cada un necessita el seu `await`: primer arriba la resposta (`fetch`) i després es llegeix el cos (`json()`) (apartat 7.2).",
      "`json()` converteix el text del fitxer en un objecte de JavaScript. Per això el primer `console.log` mostra l'objecte sencer i el segon, la propietat `lletra`.",
    ],
  },
  {
    num: 3,
    titol: "Un JSON amb una llista",
    funcio: fragment3,
    fitxers: ["dades/lletres.json"],
    resultat: ["3", "X", "XYZ"],
    explicacio: [
      "El fitxer conté un objecte amb la propietat `lletres`, que és un array. Després de `json()`, es treballa amb aquest array com amb qualsevol altre: `length`, posicions i `join` (apartat 8.1).",
      "La majoria d'API retornen les llistes d'aquesta manera: un objecte amb una propietat que conté l'array de resultats. Ho veuràs al repte del final.",
    ],
  },
  {
    bloc: "Bloc 2. Consultar un endpoint",
    textBloc: "Els fragments d'aquest bloc fan peticions a PokéAPI (`https://pokeapi.co/api/v2/`), una API pública que no necessita registre. Necessiten connexió a internet. Cada URL que demana un recurs és un endpoint: `pokemon/pikachu` retorna les dades de Pikachu. Les respostes són molt llargues: a cada fragment se'n mostra un extracte amb les propietats que fa servir el codi.",
    num: 4,
    titol: "La resposta",
    funcio: fragment4,
    respostes: [PIKACHU],
    resultat: ["true", "200"],
    explicacio: [
      "`await fetch(...)` espera la resposta i guarda un objecte `Response`. Encara no conté les dades del pokémon, sinó la informació de la resposta HTTP.",
      "Pikachu existeix: el servidor respon amb l'estat `200`, i com que és entre 200 i 299, `ok` val `true` (apartat 7.3).",
    ],
  },
  {
    num: 5,
    titol: "Els dos await amb dades reals",
    funcio: fragment5,
    respostes: [PIKACHU],
    resultat: ["pikachu", "25"],
    explicacio: [
      "És el mateix que el fragment 2, però amb una API real: un `await` per a la resposta i un altre per llegir el cos amb `json()` (apartat 7.2).",
      "Després de `json()`, `pokemon` és un objecte normal i se'n poden llegir les propietats. L'API en retorna moltes més (`height`, `weight`, `types`...); el codi només fa servir les que necessita.",
    ],
  },
  {
    num: 6,
    titol: "Un await oblidat",
    funcio: fragment6,
    respostes: [PIKACHU],
    nota: NOTA_PROMESA,
    resultat: ["Promise {<pending>}", "undefined"],
    explicacio: [
      "`json()` també retorna una promesa. Sense `await`, la constant `pokemon` guarda la promesa, que encara està llegint el cos: `pending`.",
      "Una promesa no té la propietat `name`, i per això surt `undefined`. És l'error del fragment 13 de l'A1, ara amb `fetch` (apartat 5.5).",
    ],
  },
  {
    num: 7,
    titol: "La pàgina no s'atura",
    funcio: fragment7,
    respostes: [PIKACHU],
    resultat: ["A", "B", "C", "pikachu"],
    explicacio: [
      "`consultar()` comença de manera síncrona i mostra `B`. En arribar al primer `await` s'atura i torna el control: s'executa `C`.",
      "Quan arriba la resposta i s'ha llegit el cos, la funció continua i mostra `pikachu`. Mentre s'espera el servidor, la pàgina continua funcionant: és el que permet actualitzar només una part de la pàgina sense que l'usuari hagi d'esperar (apartat 6.1).",
    ],
  },
  {
    num: 8,
    titol: "Un recurs que no existeix",
    funcio: fragment8,
    respostes: [NO_EXISTEIX],
    nota: NOTA_404,
    resultat: ["false", "404"],
    explicacio: [
      "No hi ha cap pokémon que es digui `noexisteix`, però el servidor sí que existeix: respon amb un `404 Not Found`. Per a `fetch` això és una resposta correcta, i la promesa es resol. No arriba al `catch` i `A` no surt.",
      "Un error HTTP no és un error de JavaScript: s'ha de comprovar `ok` o `status` (apartat 7.4).",
    ],
  },
  {
    num: 9,
    titol: "Comprovar ok",
    funcio: fragment9,
    respostes: [NO_EXISTEIX],
    nota: NOTA_404,
    resultat: ["Error 404"],
    explicacio: [
      "És la pràctica habitual: si `ok` és `false`, es llança un error amb `throw`. L'execució salta directament al `catch`, que en mostra el missatge, i `A` no surt (apartat 7.4).",
      "Així, tant els errors de xarxa (quan el servidor no respon, com al fragment següent) com els errors HTTP (quan respon amb un error) acaben al mateix `catch`.",
    ],
  },
  {
    num: 10,
    titol: "Un servidor que no existeix",
    funcio: fragment10,
    respostes: [{
      titol: "Resposta de https://pokeapi.invalid/api/v2/pokemon/pikachu",
      text: "Cap. El domini pokeapi.invalid no existeix:\nla petició no arriba a cap servidor.",
      llenguatge: "text",
    }],
    nota: NOTA_XARXA,
    resultat: ["A", "C TypeError", "D"],
    explicacio: [
      "Ara no és l'endpoint el que no existeix, sinó el servidor: el domini `pokeapi.invalid` no existeix. Els dominis acabats en `.invalid` estan reservats i no existeixen mai, de manera que aquesta petició sempre falla igual.",
      "Com que no hi ha cap servidor que respongui, no arriba cap resposta: és un error de xarxa, i la promesa de `fetch` falla (apartat 7.4). Per això `B` no surt: l'execució salta de l'`await` directament al `catch`, que mostra `C TypeError`. Després del `try...catch`, la funció continua i mostra `D`.",
      "Aquí es veu la importància del `catch`. Sense ell, ningú no capturaria l'error: la consola mostraria `Uncaught (in promise) TypeError`, la funció s'aturaria i `D` no sortiria. En una pàgina real, l'usuari es quedaria esperant sense cap missatge. Com que el servidor pot fallar o la connexió pot caure en qualsevol moment, tota petició ha de tenir el seu `catch`.",
      "Compara-ho amb el fragment 8: allà el servidor existeix i respon amb un 404, i la promesa es resol. Un error HTTP només arriba al `catch` si el provoquem amb `throw` (fragment 9); un error de xarxa hi arriba sol.",
      "El fragment mostra `error.name` i no `error.message` perquè el missatge canvia segons el navegador: `Failed to fetch` a Chrome i Edge, `NetworkError when attempting to fetch resource.` a Firefox i `Load failed` a Safari. El tipus d'error, `TypeError`, és el mateix a tots.",
    ],
  },
  {
    num: 11,
    titol: "El patró complet: ok, status i finally",
    funcio: fragment11,
    respostes: [PIKACHU],
    resultat: ["A", "B", "F", "D true 200", "E"],
    explicacio: [
      "És el patró complet d'una petició a una API. Cada part del codi escriu una lletra, i així es veu quina part s'executa i quan.",
      "Primer surt `A`. En cridar `consultar()`, la funció comença de manera síncrona i el `try` mostra `B`. En arribar a l'`await` s'atura i torna el control: s'executa la línia de després de la crida, que mostra `F`. La pàgina no espera el servidor (apartat 6.1).",
      "Quan arriba la resposta, `consultar` continua. Pikachu existeix: `ok` val `true` i l'estat és `200`, de manera que l'`if` no fa `throw` i `C` no surt. El `try` mostra `D true 200`. Com que no hi ha cap error, el `catch` no s'executa. El `finally` s'executa sempre i mostra `E` (apartats 5.3 i 7.4).",
      "Si es demanés `pokemon/noexisteix`, sortiria `A` / `B` / `F` / `C 404` / `E`: el `throw` portaria l'execució al `catch` i `D` no sortiria, com al fragment 9. Si no hi hagués connexió, `fetch` fallaria abans de rebre cap resposta, i el `catch` mostraria el missatge de l'error de xarxa, com al fragment 10.",
    ],
  },
  {
    num: 12,
    titol: "Una variable fora de la funció",
    funcio: fragment12,
    respostes: [PIKACHU],
    resultat: ["A desconegut", "B desconegut", "G desconegut", "C desconegut", "E pikachu", "F pikachu"],
    explicacio: [
      "La variable `nom` es declara fora de la funció amb el valor `desconegut`. Cada `console.log` en mostra el valor, i així es veu en quin moment rep el nom del pokémon.",
      "Surt `A desconegut`. En cridar `consultar()`, la funció comença de manera síncrona i el `try` mostra `B desconegut`. En arribar a l'`await` del `fetch` s'atura i torna el control: la línia de després de la crida mostra `G desconegut`. La resposta encara no ha arribat.",
      "Quan arriba la resposta, `consultar` continua i mostra `C desconegut`: ja hi ha resposta, però encara no se n'ha llegit el cos. Després de llegir-lo amb `json()`, s'assigna el nom a la variable i surt `E pikachu`. El `finally` mostra `F pikachu`.",
      "Només a partir de la línia `E` la variable val `pikachu`. Per això el codi que necessita les dades s'ha d'escriure dins de la funció, després de l'`await`: si s'escriu a continuació de la crida, com la línia `G`, s'executa abans que arribin. És l'error del fragment 9 de l'A1, ara amb una petició real.",
    ],
  },
  {
    num: 13,
    titol: "Cridar la funció dues vegades",
    funcio: fragment13,
    respostes: [PIKACHU, BULBASAUR],
    resultat: ["A", "B", "C pikachu", "H", "E 25", "F pikachu", "C bulbasaur", "E 1", "F bulbasaur", "G"],
    explicacio: [
      "`consultar` rep el nom del pokémon com a paràmetre, de manera que la mateixa funció serveix per a qualsevol pokémon. `provar` la crida dues vegades, una per a Pikachu i una altra per a Bulbasaur.",
      "Surt `A`. En cridar `provar()`, la funció comença i mostra `B`, i crida `consultar(\"pikachu\")`, que mostra `C pikachu`. En arribar a l'`await` del `fetch`, `consultar` s'atura; `provar`, que l'espera amb `await`, també. El control torna a la línia de després de `provar()`, que mostra `H`.",
      "Quan arriba la resposta de Pikachu, `consultar` continua: `E 25` i `F pikachu`. Com que ha acabat, `provar` continua i crida `consultar(\"bulbasaur\")`: `C bulbasaur`, `E 1` i `F bulbasaur`. Finalment, `provar` mostra `G` (apartat 5.2).",
      "Cada crida porta `await` al davant: la consulta de Bulbasaur no comença fins que acaba la de Pikachu. Si es cridés `consultar` dues vegades sense `await`, les dues peticions començarien alhora i les respostes podrien arribar en qualsevol ordre. Quan una petició ha d'esperar l'anterior, cal fer servir `await`.",
    ],
  },
  {
    num: 14,
    titol: "El mateix amb then",
    funcio: fragment14,
    respostes: [PIKACHU],
    resultat: ["A", "E", "C pikachu", "D"],
    explicacio: [
      "És el patró complet del fragment 11 escrit amb `then` (apartat 7.4). El primer `then` rep la resposta, comprova `ok` i retorna `resposta.json()`; el segon rep les dades. El `catch` i el `finally` fan la mateixa feina que amb `try...catch...finally` (apartat 5.4).",
      "El codi síncron s'executa primer: `A` i, a continuació, `E`, que és l'última línia. Quan arriben les dades surt `C pikachu`: com que la resposta és correcta, el `throw` no s'executa i `B` no surt. El `catch` tampoc no s'executa, i el `finally` mostra `D` al final.",
      "Amb `then` les lletres no surten en l'ordre del codi, igual que amb `async/await`: el que hi ha dins dels `then` s'executa quan arriba la resposta.",
    ],
  },
  {
    bloc: "Repte (opcional). Una llista i les dades de cada element",
    num: 15,
    titol: "Una llista i les dades de cada element",
    funcio: fragment15,
    respostes: [{
      titol: "Extracte de la resposta de https://pokeapi.co/api/v2/pokemon?limit=2&offset=0",
      text: '{\n  "count": ...,\n  "results": [\n    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },\n    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }\n  ],\n  ...\n}',
    }, {
      titol: "Extracte de les respostes de https://pokeapi.co/api/v2/pokemon/1/ i /2/",
      text: '/pokemon/1/   { "id": 1, "name": "bulbasaur", ... }\n/pokemon/2/   { "id": 2, "name": "ivysaur", ... }',
      llenguatge: "text",
    }],
    resultat: ["A bulbasaur 1", "B ivysaur 2", "C"],
    explicacio: [
      "És una situació molt habitual quan es treballa amb una API: primer es demana una llista i, després, les dades de cada element. Cada tasca és en una funció, i cada funció fa la petició, comprova `ok` i retorna les dades.",
      "`consultarLlista` construeix els paràmetres `limit=2&offset=0` amb `URLSearchParams`: es volen 2 elements a partir del primer (apartat 7.6). Retorna `dades.results`, l'array de la llista. Cada element no porta totes les dades del pokémon, sinó el nom i la `url` del seu endpoint, que acaba amb el seu `id`: `.../pokemon/1/`.",
      "`consultarDades` rep aquesta URL i retorna les dades completes del pokémon. `provar` espera la llista i, després, les dades de cada pokémon, una petició darrere l'altra: no es poden demanar els pokémon fins que no ha arribat la llista. Surten `A bulbasaur 1` i `B ivysaur 2`, i el `finally` mostra `C`.",
      "Les dues funcions llancen l'error amb `throw`, però no tenen `catch`: si una petició falla, l'error arriba al `catch` de `provar`, que és qui les crida amb `await`.",
    ],
  },
];

// Aquesta activitat no té funcions auxiliars que s'hagin de presentar abans
// d'un fragment.
const AUXILIARS_BLOC = {};
