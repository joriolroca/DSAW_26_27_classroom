/* ==========================================================================
   QUÈ SORTIRÀ PER LA CONSOLA? - dades de la pàgina
   Les dades de cada fragment: títol, solució i explicació. pagina.js les fa servir per construir la pàgina.
   Per afegir o canviar un fragment, només cal modificar aquest fitxer (i
   fragments.js, si canvia el codi).
   ========================================================================== */


// ---------- DADES DELS FRAGMENTS ----------
// funcio:     la funció de fragments.js que s'executa i es mostra
// auxiliars:  altres funcions que el fragment fa servir i que també es mostren
// nota:       aclariment que es mostra sobre el codi
// resultat:   línies que surten a la consola, en ordre
// explicacio: paràgrafs de l'explicació. El text entre `accents greus` es
//             mostra com a codi.
const FRAGMENTS = [
  {
    bloc: "Bloc 1. Codi síncron i temporitzadors",
    num: 1,
    titol: "Diversos setTimeout amb temps diferents",
    funcio: fragment1,
    resultat: ["C", "E", "D", "B", "A"],
    explicacio: [
      "Primer s'executa tot el codi síncron: `C` i `E`.",
      "Els tres `setTimeout` s'executen després, per ordre de temps (0, 100 i 300 ms), no per l'ordre en què estan escrits. Un `setTimeout` no atura el programa: deixa la funció programada i el codi continua (apartat 1.3 de la teoria).",
    ],
  },
  {
    num: 2,
    titol: "El fil ocupat",
    funcio: fragment2,
    nota: "`Date.now()` retorna els mil·lisegons actuals. El bucle `while` no fa res: només manté JavaScript ocupat fins que han passat 1500 ms.",
    resultat: ["B", "A"],
    explicacio: [
      "El temporitzador és de 500 ms i el bucle en dura 1500, però `A` surt després de `B`. El navegador compta els 500 ms a temps, però en aquell moment el fil de JavaScript està ocupat amb el bucle. El callback espera a la cua i no s'executa fins que el fil queda lliure, quan el bucle acaba, als 1500 ms aproximadament.",
      "El temps de `setTimeout` és el mínim que s'esperarà, no el moment exacte (apartat 1.4). Si en lloc del bucle hi hagués una petició al servidor que bloquegés el fil, la pàgina quedaria congelada tot aquest temps.",
    ],
  },
  {
    bloc: "Bloc 2. Callbacks",
    num: 3,
    titol: "Passar una funció com a paràmetre",
    funcio: fragment3,
    resultat: ["A", "B", "B", "C"],
    explicacio: [
      "`escriureB` es passa a `executarDuesVegades` sense parèntesis, és a dir, sense executar-la. Dins de `executarDuesVegades` es diu `callback`, i cada `callback()` l'executa: per això `B` surt dues vegades.",
      "Qui decideix quan i quantes vegades s'executa un callback és la funció que el rep, no qui l'escriu. És el que passa amb `addEventListener`: li passem una funció i el navegador la crida cada vegada que hi ha un clic (apartat 2.1).",
    ],
  },
  {
    num: 4,
    titol: "Una funció que rep un callback",
    funcio: fragment4,
    resultat: ["A", "B", "C", "D", "E"],
    explicacio: [
      "`executar` rep una funció com a paràmetre i la crida a la línia `callback()`. En aquell moment s'executa la funció anònima i surt `C`. Després `executar` continua i mostra `D`, i finalment surt `E`.",
      "Passar una funció com a callback no la fa asíncrona: s'executa quan i on la crida la funció que l'ha rebuda, i aquí la crida immediatament. El que fa que un callback s'executi més tard és qui el rep: `setTimeout`, `addEventListener` o `then` el criden quan acaba l'espera (apartat 2.1).",
    ],
  },
  {
    num: 5,
    titol: "Un callback que retorna un valor",
    funcio: fragment5,
    nota: "Si creus que alguna línia provoca un error, escriu-ho a la predicció.",
    resultat: ["NaN", "2", "4", "3", "Uncaught TypeError: callback is not a function"],
    explicacio: [
      "`calcular` crida el callback sense arguments, `callback()`, guarda el que retorna i el mostra.",
      "Primera crida: `sumar` es passa correctament, sense parèntesis. Però `calcular` la crida sense valors: `a` i `b` valen `undefined`, i `undefined + undefined` dona `NaN` (Not a Number). La funció arriba bé, però no rep els números que necessita.",
      "Segona, tercera i quarta crida: les funcions anònimes es passen sense executar. Quan `calcular` les crida, són elles les que criden `sumar` i `restar` amb els seus valors i retornen el resultat: `2`, `4` i `3` (`5 + (-2)`). És la manera de passar un callback que necessita els seus propis paràmetres (apartat 2.2).",
      "Cinquena crida: `restar(2, 2)` porta parèntesis i s'executa a l'instant, abans d'entrar a `calcular`. El que rep `calcular` és el que retorna, `0`, i en fer `callback()` es produeix l'error `callback is not a function`: un número no es pot cridar.",
    ],
  },
  {
    num: 6,
    titol: "Un callback a setTimeout",
    funcio: fragment6,
    auxiliars: [["mostrar", mostrar]],
    resultat: ["A", "B", "D", "C   (al cap d'1 segon)"],
    explicacio: [
      "`mostrar(\"B\")` porta parèntesis: s'executa a l'instant, abans de `D`, i el que rep `setTimeout` és el que retorna la funció, `undefined`. El navegador no executa res als 2 segons.",
      "`() => mostrar(\"C\")` és una funció anònima que es passa sense executar. `setTimeout` la crida al cap d'1 segon i és ella qui crida `mostrar(\"C\")` (apartat 2.2).",
    ],
  },
  {
    bloc: "Bloc 3. Promeses",
    num: 7,
    titol: "Quan s'executa el codi de dins de new Promise?",
    funcio: fragment7,
    resultat: ["A", "B", "D", "C"],
    explicacio: [
      "El codi de dins de `new Promise` s'executa a l'instant, de manera síncrona: per això `B` surt just després d'`A`. És en aquest moment quan la promesa decideix: com que el número és positiu, fa `resolve(\"C\")`, i el `reject` no s'executa.",
      "El que és asíncron és el `then` i el `catch`. Encara que la promesa ja estigui resolta, el `then` s'executa quan acaba el codi síncron, i per això `C` surt després de `D`. El `catch` no s'executa, perquè la promesa no ha fallat.",
      "Si `numero` fos negatiu, la promesa faria `reject` i sortiria `A` / `B` / `D` / `E`: el missatge de l'error arribaria pel `catch`, també després de `D`.",
    ],
  },
  {
    num: 8,
    titol: "La promesa i el seu valor",
    funcio: fragment8,
    nota: "Quan el resultat és una promesa, n'hi ha prou d'escriure l'estat i el valor, per exemple: `fulfilled true`.",
    resultat: ["Promise {<fulfilled>: true}", "true"],
    explicacio: [
      "`esPositiu(5)` retorna una promesa, no el valor `true`. Com que el número és positiu, la promesa ja s'ha resolt: l'estat és `fulfilled` i el valor, `true`. Si el número fos negatiu, l'estat seria `rejected`.",
      "La variable conté sempre la promesa, la \"capsa\". Per obtenir el valor de dins cal `then` (o `await`).",
    ],
  },
  {
    num: 9,
    titol: "Fer servir el valor fora del then",
    funcio: fragment9,
    resultat: ["false", "true"],
    explicacio: [
      "El `console.log` de fora del `then` és codi síncron i s'executa primer, quan la variable encara val `false`. El `then` s'executa després, encara que la promesa ja estigui resolta: canvia la variable i mostra `true`, però el `console.log` de fora ja s'ha fet.",
      "Tot el codi que necessita el valor d'una promesa ha d'anar dins del `then`, o després d'un `await`.",
    ],
  },
  {
    num: 10,
    titol: "Una cadena amb un return oblidat",
    funcio: fragment10,
    resultat: ["true", "B", "undefined"],
    explicacio: [
      "Cada `then` rep el valor que ha retornat el `then` anterior. El primer rep `true` de la promesa i fa `return \"B\"`, i el segon rep `B`.",
      "Al segon `then` falta el `return`: l'expressió `lletra + \"C\"` es calcula, però no es passa a ningú, i el tercer rep `undefined` (apartat 4.4).",
    ],
  },
  {
    num: 11,
    titol: "On salta l'error?",
    funcio: fragment11,
    resultat: ["A true", "C false", "D"],
    explicacio: [
      "`esPositiu(5)` es resol i el primer `then` mostra `A true`. Després retorna `esPositiu(-5)`, una promesa que falla.",
      "Quan una promesa de la cadena falla, se salten tots els `then` que queden (`B` no surt mai) i l'error arriba al `catch`, que en mostra el missatge: `C false`.",
      "`finally` s'executa sempre, tant si la cadena acaba bé com si acaba al `catch`.",
    ],
  },
  {
    bloc: "Bloc 4. async i await",
    num: 12,
    titol: "Què s'atura amb await?",
    funcio: fragment12,
    resultat: ["A", "B", "E", "C true", "D"],
    explicacio: [
      "`processar()` comença a executar-se de manera síncrona i mostra `B`. En arribar a `await`, la funció s'atura i torna el control a qui l'ha cridada: s'executa `E`. Ho fa encara que la promesa ja estigui resolta.",
      "Després, `processar` continua on s'havia quedat i mostra `C true` i `D`. `await` només atura la funció `async` on és, no la resta del programa (apartat 5.2).",
    ],
  },
  {
    num: 13,
    titol: "Un await oblidat",
    funcio: fragment13,
    nota: "Quan el resultat és una promesa, n'hi ha prou d'escriure l'estat i el valor, per exemple: `fulfilled true`.",
    resultat: ["Promise {<fulfilled>: true}", "true"],
    explicacio: [
      "Sense `await`, la constant guarda la promesa, no el valor (apartat 5.5). Amb `await`, guarda el valor: `true`.",
      "És el mateix error que el del fragment 9, però amb `async/await`: si oblides l'`await`, treballes amb la capsa i no amb el que hi ha a dins.",
    ],
  },
  {
    num: 14,
    titol: "Una funció async sempre retorna una promesa",
    funcio: fragment14,
    nota: "Quan el resultat és una promesa, n'hi ha prou d'escriure l'estat i el valor, per exemple: `fulfilled true`.",
    resultat: ["Promise {<fulfilled>: 8}", "8"],
    explicacio: [
      "Una funció `async` sempre retorna una promesa, encara que dins faci un `return` d'un número. El valor de la promesa és el del `return`.",
      "Per obtenir el valor cal `then` o `await` (apartat 5.1).",
    ],
  },
  {
    bloc: "Repte (opcional). Promeses contra temporitzadors",
    num: 15,
    titol: "Un then d'una promesa ja resolta i un setTimeout de 0 ms",
    funcio: fragment15,
    nota: "`Promise.resolve(\"C\")` crea una promesa que ja neix resolta amb el valor `C`.",
    resultat: ["A", "D", "C", "B"],
    explicacio: [
      "Primer surt el codi síncron, `A` i `D`. Però `C` surt abans que `B`, encara que el `setTimeout` s'hagi escrit abans i tingui 0 ms d'espera.",
      "El navegador no té una sola cua, sinó dues. Els callbacks de `then`, `catch` i `finally` i la continuació d'un `await` van a la cua de microtasques, que té prioritat. Els de `setTimeout`, `setInterval` i els esdeveniments van a la cua de tasques normal. Quan acaba el codi síncron, JavaScript buida primer tota la cua de microtasques i després agafa la tasca següent de la cua normal.",
      "Per programar no cal saber-ho: el que importa és que tots dos s'executen després del codi síncron.",
    ],
  },
];

// Funcions auxiliars que es presenten abans d'un fragment, amb un paràgraf
// d'explicació. La clau és el número del fragment davant del qual surten.
const AUXILIARS_BLOC = {
  8: {
    nom: "esPositiu",
    funcio: esPositiu,
    text: "Els fragments 8 a 13 fan servir aquesta funció auxiliar. Si el número és positiu, la promesa es resol amb `true`; si no, falla amb un `Error` que té el missatge `false`. S'assembla a la funció `comprovarNumero` de l'apartat 4.2 de la teoria. Llegeix-la abans de continuar: fa servir l'estructura habitual d'una promesa (`new Promise`, `if`, `resolve` i `reject`).",
  },
};
