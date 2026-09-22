
> **DSAW**  **RA2** - **ACTIVITAT 0: INTRODUCCIÓ JAVASCRIPT**
>
> **Mòdul**: Client (0612)


# Sintaxi de JavaScript 


## Fitxa de l'activitat

| | |
| :--- | :--- |
| **Mòdul** | 0612. Desenvolupament web en entorn client |
| **Resultat d'aprenentatge** | RA2. Escriu sentències simples, aplicant la sintaxi del llenguatge i verificant la seva execució sobre navegadors web |
| **Tipus** | Activitat d'aprenentatge, no avaluable |
| **Modalitat** | Individual |


## Objectius

- Comprovar el tipus de dada d'un valor i les conversions entre tipus (criteri 2.4).
- Distingir els operadors `==` i `===` i saber per què només se n'ha de fer servir un (criteri 2.2).
- Reconèixer els valors *truthy* i *falsy* i les trampes que comporten en les condicions (criteris 2.2 i 2.5).
- Saber comprovar si un valor és un número i distingir `isNaN()` de `Number.isNaN()` (criteri 2.4).
- Escriure blocs de decisió i bucles (criteris 2.5 i 2.6).
- Utilitzar l'operador ternari i saber quan és preferible un `if`/`else` (criteris 2.2 i 2.5).
- Reconèixer les diferències dels strings respecte a Java i construir textos amb *template strings* (criteri 2.2).
- Fer servir la consola com a entorn de proves (criteri 2.8).


---

## Índex

1. [Variables i tipus](#exercici-1-variables-i-tipus)
2. [Conversions](#exercici-2-conversions)
3. [Comparació: `==` i `===`](#exercici-3-comparació--i-)
4. [Valors *truthy* i *falsy*](#exercici-4-valors-truthy-i-falsy)
5. [Valors *truthy* i *falsy* dins d'una condició](#exercici-5-valors-truthy-i-falsy-dins-duna-condició)
6. [Saber si un valor és un número](#exercici-6-saber-si-un-valor-és-un-número)
7. [Un valor escrit per l'usuari](#exercici-7-un-valor-escrit-per-lusuari)
8. [Decisions](#exercici-8-decisions)
9. [Operador ternari](#exercici-9-operador-ternari)
10. [Strings i *template strings*](#exercici-10-strings-i-template-strings)
11. [Bucles](#exercici-11-bucles)
12. [Números aleatoris](#exercici-12-números-aleatoris)


---

## Exercici 1. Variables i tipus

Escriu a la consola:

```js
const nom = "Berta";
let edat = 17;
let matriculat = true;
let nota;
```

Comprova el tipus de cadascuna amb `typeof`. Després, respon:

1. Què retorna `typeof nota`? Per què, si no li has assignat cap valor?
2. Intenta escriure `nom = "Joan";`. Quin error surt i què vol dir?
3. Intenta escriure `edat = "disset";`. Dona error? Per què amb `edat` sí que es pot i amb `nom` no?

<details>
<summary><strong>Solució</strong></summary>

```js
typeof nom;         // "string"
typeof edat;        // "number"
typeof matriculat;  // "boolean"
typeof nota;        // "undefined"
```

1. `undefined` és el valor que rep automàticament una variable declarada sense assignació. No és el mateix que `null`, que és una absència de valor posada expressament pel programador.
2. `TypeError: Assignment to constant variable`. Una variable declarada amb `const` no es pot reassignar.
3. No dona error. JavaScript no és tipat: una variable declarada amb `let` pot canviar de tipus durant l'execució. És còmode i, alhora, és l'origen de molts errors que en Java el compilador hauria aturat.

</details>

---

## Exercici 2. Conversions

Prediu el resultat **abans** d'executar cada línia. Apunta la teva predicció, executa-la i compara.

```js
"7" + 1
"7" - 1
7 + "1"
Number("7") + 1
Number("")
Number("  ")
Number("hola")
Number(true)
Number(null)
Number(undefined)
parseInt("21 anys")
parseInt("21.9")
parseFloat("21.9 anys")
Number("21 anys")
String(42)
Boolean("")
```

Respon:

1. Per què `"7" + 1` i `"7" - 1` donen resultats tan diferents?
2. Quina diferència hi ha entre `Number()` i `parseInt()` quan el text conté lletres?
3. Si un formulari et retorna el text `"21 anys"` i vols quedar-te amb el número, quina de les dues funcions faries servir?

<details>
<summary><strong>Solució</strong></summary>

```js
"7" + 1              // "71"   el + concatena si un operand és text
"7" - 1              // 6      el - no té sentit amb textos: converteix
7 + "1"              // "71"
Number("7") + 1      // 8
Number("")           // 0      la cadena buida es converteix en zero
Number("  ")         // 0      els espais també
Number("hola")       // NaN
Number(true)         // 1
Number(null)         // 0
Number(undefined)    // NaN
parseInt("21 anys")  // 21     llegeix fins al primer caràcter no numèric
parseInt("21.9")     // 21     trunca, no arrodoneix
parseFloat("21.9 anys") // 21.9
Number("21 anys")    // NaN    exigeix que tot el text sigui un número
String(42)           // "42"
Boolean("")          // false
```

1. **La regla:** l'operador `+` té dos significats, suma i concatenació, i si algun dels operands és text guanya la concatenació. La resta d'operadors aritmètics només tenen un significat, i per això converteixen el text a número abans d'operar.
2. `Number()` és estricta: si el text conté qualsevol caràcter que no formi part del número, retorna `NaN`. `parseInt()` i `parseFloat()` són tolerants: llegeixen des del principi i s'aturen en el primer caràcter que no encaixa.
3. `parseInt("21 anys")`, que retorna `21`. Ara bé, aquesta tolerància és perillosa en una validació: `parseInt("7 gats")` dona `7` i el programa continuaria com si l'usuari hagués escrit un número correcte. Per validar és millor `Number()`, precisament perquè és estricta.

</details>

---

## Exercici 3. Comparació: `==` i `===`

Prediu el resultat de cada comparació i comprova-ho:

```js
5 == "5"
5 === "5"
0 == ""
0 === ""
0 == false
0 === false
"0" == false
null == undefined
null === undefined
NaN == NaN
NaN === NaN
[] == false
```

Respon:

1. Quina feina fa `==` que `===` no fa?
2. A la llista hi ha **un sol cas** en què `==` i `===` donen el mateix resultat. Quin és i per què?

<details>
<summary><strong>Solució</strong></summary>

```js
5 == "5"            // true   converteix el text a número i compara
5 === "5"           // false  string no és number
0 == ""             // true   Number("") val 0
0 === ""            // false
0 == false          // true   Number(false) val 0
0 === false         // false
"0" == false        // true   tots dos es converteixen a 0
null == undefined   // true   cas especial definit per l'estàndard
null === undefined  // false  són dos tipus diferents
NaN == NaN          // false
NaN === NaN         // false
[] == false         // true   un array buit es converteix en 0
```

1. `==` **converteix** els operands a un tipus comú abans de comparar-los. `===` no converteix res: si els tipus són diferents, la resposta és directament `false`.
2. L'únic cas és `NaN`: tant `NaN == NaN` com `NaN === NaN` donen `false`. `NaN` no és igual a cap valor, **ni tan sols a si mateix**, i per això cap dels dos operadors serveix per detectar-lo. L'única manera de comprovar-lo és `Number.isNaN(valor)`.

</details>

---

## Exercici 4. Valors *truthy* i *falsy*

Tot valor de JavaScript es pot convertir a `true` o a `false`. Prediu el resultat i comprova'l:

```js
Boolean(0)
Boolean(-1)
Boolean("")
Boolean(" ")
Boolean("0")
Boolean("false")
Boolean(null)
Boolean(undefined)
Boolean(NaN)
Boolean([])
Boolean({})
```

Respon:

1. Escriu la llista completa dels valors *falsy*. Quants n'hi ha?
2. Per què `Boolean("0")` i `Boolean("false")` donen `true`, si semblen un zero i un fals?

<details>
<summary><strong>Solució</strong></summary>

```js
Boolean(0)          // false
Boolean(-1)         // true   qualsevol número diferent de zero és truthy
Boolean("")         // false
Boolean(" ")        // true   un espai és contingut
Boolean("0")        // true
Boolean("false")    // true
Boolean(null)       // false
Boolean(undefined)  // false
Boolean(NaN)        // false
Boolean([])         // true
Boolean({})         // true
```

1. Són vuit: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined` i `NaN`. Tota la resta és *truthy*.
2. Perquè són **cadenes de text**, no el número zero ni el booleà fals. El que decideix no és el que sembla el contingut, sinó el fet que siguin textos amb algun caràcter. L'única cadena *falsy* és la buida.

</details>

---

## Exercici 5. Valors *truthy* i *falsy* dins d'una condició

A l'exercici anterior has convertit valors a booleà amb `Boolean()`. Dins d'un `if` passa exactament el mateix, però de manera implícita: la condició es converteix a `true` o `false` sense que ho escriguis.

Per a cada fragment, indica quin missatge es mostrarà i per què. Apunta la resposta **abans** d'executar-lo i després comprova-la a la consola.

### Bloc A. Valors directes

```js
// a)
let punts = 0;
if (punts) {
  console.log("Tens punts");
} else {
  console.log("No tens punts");
}

// b)
const codiPostal = "0";
if (codiPostal) {
  console.log("Codi introduït");
} else {
  console.log("Falta el codi");
}

// c)
const paraula = "";
if (paraula) {
  console.log(`La paraula és ${paraula}`);
} else {
  console.log("No hi ha paraula");
}

// d)
let usuariConnectat;
if (usuariConnectat) {
  console.log("Sessió iniciada");
} else {
  console.log("Cap usuari connectat");
}

// e)
const temperatura = -5;
if (temperatura) {
  console.log(`Fa ${temperatura} graus`);
} else {
  console.log("No hi ha lectura de temperatura");
}

// f)
const modeFosc = "false";
if (modeFosc) {
  console.log("El mode fosc està activat");
} else {
  console.log("El mode fosc està desactivat");
}
```

### Bloc B. Resultats de funcions i conversions

```js
// g)
const edatIntroduida = Number("abc");
if (edatIntroduida) {
  console.log(`Tens ${edatIntroduida} anys`);
} else {
  console.log("Edat no vàlida");
}

// h)
const preferencies = {};
if (preferencies) {
  console.log("Hi ha preferències desades");
} else {
  console.log("No hi ha preferències");
}

// i)
const carret = [];
if (carret) {
  console.log("El carret té productes");
} else {
  console.log("El carret està buit");
}

// j) Quan surti el quadre de diàleg, prem Cancel·la
const respostaNom = prompt("Com et dius?");
if (respostaNom) {
  console.log(`Hola, ${respostaNom}`);
} else {
  console.log("No has respost");
}

// k)
function obtenirDescompte() {
  // no hi ha return
}
const descompte = obtenirDescompte();
if (descompte) {
  console.log(`Descompte del ${descompte}%`);
} else {
  console.log("Sense descompte");
}

// l)
const nomUsuari = "   ";
if (nomUsuari.trim()) {
  console.log("Nom correcte");
} else {
  console.log("El nom només té espais");
}
```

### Bloc C. Casos trampa

```js
// m)
const posicioJ = "JavaScript".indexOf("J");
if (posicioJ) {
  console.log("El text conté la lletra J");
} else {
  console.log("El text no conté la lletra J");
}

// n)
const posicioZ = "JavaScript".indexOf("z");
if (posicioZ) {
  console.log("El text conté la lletra z");
} else {
  console.log("El text no conté la lletra z");
}

// o) Simula un camp de formulari que l'usuari ha deixat buit
const valorCamp = "";
const quantitat = Number(valorCamp);
if (quantitat) {
  console.log(`Has demanat ${quantitat} unitats`);
} else {
  console.log("Quantitat zero o no vàlida");
}

// p)
const saldo = 0.1 + 0.2 - 0.3;
if (saldo) {
  console.log("Encara hi ha saldo pendent");
} else {
  console.log("Compte saldat");
}
```

<details>
<summary><strong>Solució</strong></summary>

| Cas | Missatge | Per què |
| :---: | :--- | :--- |
| a | No tens punts | `0` és *falsy* |
| b | Codi introduït | `"0"` és un text no buit, i per tant *truthy* |
| c | No hi ha paraula | `""` és *falsy* |
| d | Cap usuari connectat | Una variable sense valor és `undefined`, que és *falsy* |
| e | Fa -5 graus | Qualsevol número diferent de 0 és *truthy*, també els negatius |
| f | El mode fosc està activat | `"false"` és un text no buit, i per tant *truthy* |
| g | Edat no vàlida | `Number("abc")` és `NaN`, que és *falsy* |
| h | Hi ha preferències desades | Tots els objectes són *truthy*, encara que siguin buits |
| i | El carret té productes | Tots els arrays són *truthy*, encara que siguin buits |
| j | No has respost | En cancel·lar, `prompt()` retorna `null`, que és *falsy* |
| k | Sense descompte | Una funció sense `return` retorna `undefined` |
| l | El nom només té espais | `"   ".trim()` és `""`, que és *falsy* |
| m | El text no conté la lletra J | `indexOf` retorna `0` (la primera posició), i `0` és *falsy* |
| n | El text conté la lletra z | `indexOf` retorna `-1` quan no troba el text, i `-1` és *truthy* |
| o | Quantitat zero o no vàlida | `Number("")` és `0`, no `NaN` |
| p | Encara hi ha saldo pendent | `0.1 + 0.2 - 0.3` val `5.55e-17`, no exactament `0` |

Com s'haurien d'escriure les condicions dels casos trampa:

```js
// b) Si el que es vol saber és si el camp s'ha omplert, el codi ja és correcte.
//    Si es vol comprovar que és un número diferent de zero, cal convertir-lo:
if (Number(codiPostal)) { }

// f) Comparar el text de manera explícita
if (modeFosc === "true") { }

// i) Comprovar la longitud
if (carret.length > 0) { }

// m) i n) Comparar amb -1
if (posicioJ !== -1) { }
if (posicioZ !== -1) { }

// p) Arrodonir abans de comparar (per exemple, a cèntims)
if (Math.round(saldo * 100) !== 0) { }
```

En els casos m) i n), `indexOf()` retorna la posició on comença el text buscat, o `-1` si no el troba. La posició `0` és *falsy* i `-1` és *truthy*, de manera que la condició s'equivoca just en els dos casos límit: quan la lletra és la primera i quan no hi és. El mètode `includes()` retorna directament un booleà:

```js
"JavaScript".includes("J");   // true
"JavaScript".includes("z");   // false
```

> **Recorda:** comprovar si un valor és *truthy* o *falsy* serveix per saber si una dada existeix. Quan el `0`, el text buit o el `-1` tenen un significat propi, cal escriure la comparació de manera explícita.

</details>

---

## Exercici 6. Saber si un valor és un número


Prediu el resultat i comprova'l:

```js
isNaN("hola")
isNaN("42")
isNaN("")
isNaN(null)
isNaN(undefined)
Number.isNaN("hola")
Number.isNaN("")
Number.isNaN(NaN)
Number.isNaN(Number("hola"))
Number.isInteger(5.0)
Number.isInteger(5.5)
Number.isInteger("5")
Number.isFinite("42")
isFinite("42")
typeof NaN
```

Respon:

1. Escriu `isNumber` a la consola, **sense parèntesis**. Què retorna? Què en conclous?
2. Explica en una frase la diferència entre `isNaN()` i `Number.isNaN()`.
3. Per què `Number.isNaN("hola")` retorna `false`, si `"hola"` no és cap número?
4. Per què `isNaN("")` retorna `false`? Quin problema et pot causar això en validar un formulari?
5. Crea una funció `esNumeroValid(text)` que, combinant `Number()` i `Number.isNaN()`, determini si un string es pot convertir en un número vàlid, enter o decimal. Prova-la amb els valors `"42"`, `"abc"`, `"3.14"` i `""`, mostrant el resultat de cada prova per consola. Si el camp buit no dona el resultat esperat, corregeix la funció.
6. Escriu una funció `esNumeroValidEnter(text)` que retorni `true` només si el text conté un número **enter**. Reutilitza la funció `esNumeroValid` de l'apartat anterior. Prova-la amb `"7"`, `"7.5"`, `""`, `"   "`, `"hola"`, `"7px"` i `"-3"`.

<details>
<summary><strong>Solució</strong></summary>

```js
isNaN("hola")               // true   Number("hola") és NaN
isNaN("42")                 // false  Number("42") és 42
isNaN("")                   // false  Number("") és 0. Compte!
isNaN(null)                 // false  Number(null) és 0. Compte!
isNaN(undefined)            // true   Number(undefined) és NaN
Number.isNaN("hola")        // false  "hola" és un text, no el valor NaN
Number.isNaN("")            // false
Number.isNaN(NaN)           // true
Number.isNaN(Number("hola"))// true   aquí sí: primer convertim
Number.isInteger(5.0)       // true   5.0 i 5 són el mateix número
Number.isInteger(5.5)       // false
Number.isInteger("5")       // false  és una cadena
Number.isFinite("42")       // false  no converteix
isFinite("42")              // true   la versió antiga sí que converteix
typeof NaN                  // "number"
```

1. Surt l'error `ReferenceError: isNumber is not defined`. **En JavaScript no existeix cap funció `isNumber()`**: és un nom que ve d'altres llenguatges i de llibreries externes com Lodash. Escriure el nom d'una funció sense parèntesis és una manera ràpida de comprovar a la consola si existeix.
2. `isNaN()` **converteix** el valor a número i respon si el resultat és `NaN`. `Number.isNaN()` no converteix res i respon només si el valor **ja és** exactament `NaN`.
3. Perquè `"hola"` no és el valor `NaN`: és una cadena de text. `Number.isNaN()` no es pregunta si el valor es podria convertir en número, sinó si el valor és, literalment, `NaN`. Per obtenir el `true` que esperaves cal convertir primer: `Number.isNaN(Number("hola"))`.
4. Perquè `isNaN()` converteix la cadena buida en `0`, i `0` sí que és un número. En una validació, això vol dir que un camp buit passaria el control com si l'usuari hi hagués escrit un zero. Per això la cadena buida sempre s'ha de comprovar a part.

5. Una primera versió, combinant `Number()` i `Number.isNaN()`:

   ```js
   function esNumeroValid(text) {
     const numero = Number(text);      // 1. converteix el text a número (o a NaN si no pot)
     return !Number.isNaN(numero);     // 2. és vàlid si el resultat NO és NaN
   }

   console.log(esNumeroValid("42"));    // true
   console.log(esNumeroValid("abc"));   // false
   console.log(esNumeroValid("3.14"));  // true
   console.log(esNumeroValid(""));      // true  (incorrecte)
   ```

   L'ordre és important: primer es converteix i després es comprova. `Number.isNaN()` no converteix res i només retorna `true` si el valor que rep ja és exactament `NaN` (és el que s'ha vist a la pregunta 3). Per això, aplicada directament al text, no serveix.

   El cas de la cadena buida dona `true` perquè `Number("")` val `0`, i `0` és un número (és el problema de la pregunta 4). Passa el mateix amb un text que només tingui espais. Per això cal descartar-los abans de convertir:

   ```js
   function esNumeroValid(text) {
     if (text.trim() === "") {
       return false;                   // camp buit o només amb espais
     }
     const numero = Number(text);
     return !Number.isNaN(numero);
   }

   console.log(esNumeroValid("42"));    // true
   console.log(esNumeroValid("abc"));   // false
   console.log(esNumeroValid("3.14"));  // true
   console.log(esNumeroValid(""));      // false
   ```

6. ```js
   function esNumeroValidEnter(text) {
     // Es reaprofita la funció anterior: descarta el camp buit,
     // els espais i els textos que no són números ("hola", "7px").
     if (!esNumeroValid(text)) {
       return false;
     }

     // Només queda comprovar que no tingui decimals.
     const numero = Number(text);
     return Number.isInteger(numero);
   }
   ```

   | Entrada | Resultat | Per què |
   | :--- | :---: | :--- |
   | `"7"` | `true` | Enter correcte |
   | `"-3"` | `true` | Els negatius també són enters |
   | `"7.5"` | `false` | És un número vàlid, però `Number.isInteger(7.5)` és fals |
   | `""` | `false` | `esNumeroValid` el descarta: camp buit |
   | `"   "` | `false` | `esNumeroValid` el descarta: només espais |
   | `"hola"` | `false` | `esNumeroValid` el descarta: `Number("hola")` és `NaN` |
   | `"7px"` | `false` | `esNumeroValid` el descarta: `Number("7px")` és `NaN` |

   > **Recorda:** dividir una validació en funcions petites permet reutilitzar-les. `esNumeroValid` resol el problema general, i `esNumeroValidEnter` només hi afegeix la condició que falta.

</details>

---

## Exercici 7. Un valor escrit per l'usuari

`prompt()` demana un valor a l'usuari i el retorna. Executa:

```js
const resposta = prompt("Escriu un número");
console.log(resposta, typeof resposta);
```

Escriu-hi `25`. Respon:

1. De quin tipus és `resposta`?
2. Què dona `resposta + 10`? I `Number(resposta) + 10`?
3. Escriu una condició que comprovi si el valor introduït és un número enter entre 1 i 20. Prova-la amb `25`, amb `7.5`, amb `hola` i amb el camp buit.

<details>
<summary><strong>Solució</strong></summary>

1. `string`. Tot el que retorna `prompt()` és text.
2. `resposta + 10` dona `"2510"`; `Number(resposta) + 10` dona `35`.

3. Es reaprofita la funció `esNumeroValidEnter` de l'exercici 6, i només cal afegir-hi el rang:

```js
const numero = Number(resposta);

if (esNumeroValidEnter(resposta) && numero >= 1 && numero <= 20) {
  console.log("Valor correcte");
} else {
  console.log("Valor incorrecte");
}
```

Explicació de la condició, en l'ordre en què s'avalua:

- `esNumeroValidEnter(resposta)` descarta el camp buit, els espais, els textos que no són números i els decimals.
- `numero >= 1 && numero <= 20` només s'avalua si la primera part és certa, i comprova el rang amb els dos límits inclosos.

| Entrada | Resultat | Condició que falla |
| :--- | :--- | :--- |
| `25` | Valor incorrecte | `numero <= 20` |
| `7.5` | Valor incorrecte | `esNumeroValidEnter`: no és enter |
| `hola` | Valor incorrecte | `esNumeroValidEnter`: no és un número |
| (buit) | Valor incorrecte | `esNumeroValidEnter`: camp buit |

> **Compte:** si l'usuari prem Cancel·la, `prompt()` retorna `null`, i dins de `esNumeroValid` la instrucció `text.trim()` provoca un `TypeError`. Per cobrir aquest cas, afegeix `resposta !== null &&` al principi de la condició.

</details>

---

## Exercici 8. Decisions

Escriu una funció que, donada una nota numèrica, retorni la qualificació corresponent. Fes-ho amb `if`/`else if`/`else`.

| Nota | Qualificació |
| :--- | :--- |
| menys de 5 | Suspès |
| de 5 a 6,9 | Aprovat |
| de 7 a 8,9 | Notable |
| 9 o més | Excel·lent |

Prova-la amb 4, 5, 6.9, 7, 9 i 10. Comprova especialment els valors dels límits.

<details>
<summary><strong>Solució</strong></summary>

```js
function qualificacio(nota) {
  if (nota < 5) {
    return "Suspès";
  } else if (nota < 7) {
    return "Aprovat";
  } else if (nota < 9) {
    return "Notable";
  } else {
    return "Excel·lent";
  }
}
```

> **Nota:** en una cadena `else if`, cada condició només s'avalua si totes les anteriors han estat falses. Per això no cal escriure `nota >= 5 && nota < 7`: si s'arriba a la segona condició, ja sabem que la nota és 5 o més.

| Nota | Resultat | Condició que es compleix |
| :---: | :--- | :--- |
| 4 | Suspès | `nota < 5` |
| 5 | Aprovat | `nota < 7` (5 ja no és menor que 5) |
| 6.9 | Aprovat | `nota < 7` |
| 7 | Notable | `nota < 9` |
| 9 | Excel·lent | cap: s'executa l'`else` |
| 10 | Excel·lent | cap: s'executa l'`else` |

Els valors límit (5, 7 i 9) són els que confirmen si s'ha fet servir `<` o `<=` correctament.

</details>

---

## Exercici 9. Operador ternari

L'operador ternari (`condició ? valorSiCert : valorSiFals`) tria entre dos valors segons una condició. És l'alternativa curta a un `if`/`else` quan el que es vol és obtenir un valor.

### Part 1. Quin resultat dona el ternari?

Per a cada fragment, indica què es mostrarà per consola i per què. Apunta la resposta **abans** d'executar-lo.

```js
// a)
const edatVotant = 20;
console.log(edatVotant >= 18 ? "Pots votar" : "Encara no pots votar");

// b)
const puntsPartida = 0;
console.log(puntsPartida ? `Tens ${puntsPartida} punts` : "Encara no tens punts");

// c)
const nomJugador = "";
console.log(`Hola, ${nomJugador ? nomJugador : "Anònim"}`);

// d)
const estoc = 0;
console.log("Estat del producte: " + (estoc > 0 ? "disponible" : "esgotat"));

// e) Prova-ho amb intentsRestants = 3 i després amb intentsRestants = 1
let intentsRestants = 3;
console.log(`Et ${intentsRestants === 1 ? "queda" : "queden"} ${intentsRestants} ${intentsRestants === 1 ? "intent" : "intents"}`);

// f)
const edatText = "18";
console.log(edatText === 18 ? "Té 18 anys" : "No té 18 anys");

// g)
const notaFinal = 6.5;
console.log(notaFinal >= 9 ? "Excel·lent" : notaFinal >= 7 ? "Notable" : notaFinal >= 5 ? "Aprovat" : "Suspès");

// h) Trampa
console.log("Resultat: " + 5 > 3 ? "sí" : "no");
```

### Part 2. De `if` a ternari

Executa primer aquestes declaracions:

```js
const hiHaConnexio = true;
const esSoci = true;
const preu = 50;
const secret = 12;
const intent = 15;
```

Reescriu cada bloc `if`/`else` amb un operador ternari. El comportament ha de ser el mateix. Comprova-ho a la consola canviant els valors de les declaracions anteriors.

```js
// a)
let missatgeEstat;
if (hiHaConnexio) {
  missatgeEstat = "En línia";
} else {
  missatgeEstat = "Sense connexió";
}

// b)
let preuFinal;
if (esSoci) {
  preuFinal = preu * 0.9;
} else {
  preuFinal = preu;
}

// c) Joc "Encerta el número"
let pista;
if (intent === secret) {
  pista = "L'has encertat!";
} else if (intent > secret) {
  pista = "El número secret és més petit";
} else {
  pista = "El número secret és més gran";
}
```

<details>
<summary><strong>Solució</strong></summary>

**Part 1**

| Cas | Resultat | Per què |
| :---: | :--- | :--- |
| a | Pots votar | `20 >= 18` és `true` |
| b | Encara no tens punts | `0` és *falsy*. Aquí és el que es vol, però cal ser-ne conscient |
| c | Hola, Anònim | `""` és *falsy* |
| d | Estat del producte: esgotat | Els parèntesis fan que el ternari s'avaluï abans de concatenar |
| e | Et queden 3 intents / Et queda 1 intent | Un ternari dins d'un *template string* adapta el text al singular o al plural |
| f | No té 18 anys | `===` no converteix tipus, i `"18"` és un string |
| g | Aprovat | Els ternaris encadenats s'avaluen d'esquerra a dreta: la primera condició certa és `6.5 >= 5` |
| h | no | Primer es concatena: `"Resultat: " + 5` dona `"Resultat: 5"`. Després es compara `"Resultat: 5" > 3`, que és `false` perquè el text es converteix a `NaN`. El ternari només rep aquest `false` |

Correcció del cas h):

```js
console.log("Resultat: " + (5 > 3 ? "sí" : "no"));   // Resultat: sí
```

> **Compte:** quan un ternari forma part d'una expressió més llarga, com una concatenació o una operació aritmètica, posa'l sempre entre parèntesis.

**Part 2**

```js
// a)
const missatgeEstat = hiHaConnexio ? "En línia" : "Sense connexió";

// b)
const preuFinal = esSoci ? preu * 0.9 : preu;

// c) Ternari encadenat: funciona, però amb tres casos és el límit de llegibilitat
const pista =
  intent === secret ? "L'has encertat!"
  : intent > secret ? "El número secret és més petit"
  : "El número secret és més gran";
```

> **Nota:** amb el ternari la variable es pot declarar amb `const`, perquè el valor s'assigna en una sola instrucció. Amb `if`/`else` cal fer servir `let`.

> **Recorda:** el ternari serveix per triar entre dos valors, no per executar blocs d'instruccions. Si alguna branca ha de modificar variables, cridar funcions o canviar la pàgina, o si hi ha més de tres casos, fes servir `if`/`else`.

</details>

---

## Exercici 10. Strings i *template strings*

Els strings de JavaScript s'assemblen als de Java, però tenen diferències que provoquen errors si s'escriu el codi per costum.

### Part 1. El que canvia respecte a Java

Prediu el resultat de cada línia i comprova'l:

```js
const llenguatge = "JavaScript";

typeof "a"
llenguatge.length
llenguatge.length()
llenguatge[0]
llenguatge[llenguatge.length - 1]
llenguatge[20]
llenguatge.slice(0, 4)
llenguatge.slice(-6)
llenguatge.includes("Script")
llenguatge === "JavaScript"
llenguatge === "javascript"
"3" + 4 + 5
3 + 4 + "5"
```

### Part 2. *Template strings*

Executa primer aquestes declaracions:

```js
const jugadora = "Berta";
const intentsFets = 3;
const maximIntents = 10;
const numeroProvat = 15;
```

Prediu el resultat de cada línia:

```js
`Intent ${intentsFets} de ${maximIntents}`
`Et queden ${maximIntents - intentsFets} intents`
`${numeroProvat} és ${numeroProvat > 12 ? "massa gran" : "massa petit"}`
`${jugadora.toUpperCase()} té ${jugadora.length} lletres`
"El doble de 7 és ${7 * 2}"
```

### Part 3. Escriu-ho tu

Escriu una funció `crearMissatge(intent, secret, intentsRestants)` que retorni **un sol template string** amb aquest format:

```
Has provat el 15: el número secret és més petit. Et queden 7 intents.
Has provat el 4: el número secret és més gran. Et queda 1 intent.
```

- Si `intent` és igual a `secret`, ha de retornar `L'has encertat amb el 12!`.
- Ha de dir «queda» o «queden» i «intent» o «intents» segons el nombre d'intents que quedin.

<details>
<summary><strong>Solució</strong></summary>

**Part 1**

```js
typeof "a"                          // "string"   no hi ha tipus char: una lletra també és un string
llenguatge.length                   // 10         és una propietat, sense parèntesis
llenguatge.length()                 // TypeError: llenguatge.length is not a function
llenguatge[0]                       // "J"        s'hi accedeix com en un array
llenguatge[llenguatge.length - 1]   // "t"        l'últim caràcter
llenguatge[20]                      // undefined  fora de rang no hi ha error
llenguatge.slice(0, 4)              // "Java"     del 0 al 4, sense incloure el 4
llenguatge.slice(-6)                // "Script"   els índexs negatius compten des del final
llenguatge.includes("Script")       // true
llenguatge === "JavaScript"         // true
llenguatge === "javascript"         // false      distingeix majúscules i minúscules
"3" + 4 + 5                         // "345"
3 + 4 + "5"                         // "75"
```

1. Dona `TypeError`, perquè a JavaScript `length` és una **propietat** i no un mètode. `llenguatge.length` ja és el número, i afegir-hi parèntesis vol dir intentar executar un número com si fos una funció.
2. Retorna `undefined`, sense cap error. Si el programa no ho comprova, aquest `undefined` pot acabar escrit a la pàgina.
3. Les operacions s'avaluen d'esquerra a dreta. En el primer cas, `"3" + 4` ja és el text `"34"`, i a partir d'aquí tot es concatena. En el segon, `3 + 4` és una suma (`7`) i després es concatena amb `"5"`.
4. Sí. A JavaScript els strings són valors primitius, i `===` compara el contingut, no la referència. És l'equivalent de `.equals()` de Java. Per comparar sense tenir en compte les majúscules: `llenguatge.toLowerCase() === "javascript"`.

**Part 2**

```js
`Intent ${intentsFets} de ${maximIntents}`                                  // "Intent 3 de 10"
`Et queden ${maximIntents - intentsFets} intents`                           // "Et queden 7 intents"
`${numeroProvat} és ${numeroProvat > 12 ? "massa gran" : "massa petit"}`    // "15 és massa gran"
`${jugadora.toUpperCase()} té ${jugadora.length} lletres`                   // "BERTA té 5 lletres"
"El doble de 7 és ${7 * 2}"                                                 // "El doble de 7 és ${7 * 2}"
```

Dins de `${ }` hi pot anar qualsevol expressió: una operació, un ternari o la crida a un mètode. L'última línia no substitueix res perquè fa servir cometes dobles: la interpolació només funciona amb l'accent obert.

> **Compte:** el caràcter del *template string* és l'accent obert (`` ` ``), no la cometa simple (`'`). En un teclat català o espanyol s'escriu amb la tecla de l'accent obert i després un espai.

**Part 3**

```js
function crearMissatge(intent, secret, intentsRestants) {
  if (intent === secret) {
    return `L'has encertat amb el ${secret}!`;
  }

  const pista = intent > secret ? "més petit" : "més gran";
  const verb = intentsRestants === 1 ? "queda" : "queden";
  const paraula = intentsRestants === 1 ? "intent" : "intents";

  return `Has provat el ${intent}: el número secret és ${pista}. Et ${verb} ${intentsRestants} ${paraula}.`;
}

console.log(crearMissatge(15, 12, 7));   // Has provat el 15: el número secret és més petit. Et queden 7 intents.
console.log(crearMissatge(4, 12, 1));    // Has provat el 4: el número secret és més gran. Et queda 1 intent.
console.log(crearMissatge(12, 12, 5));   // L'has encertat amb el 12!
```

Els ternaris es guarden primer en variables amb nom (`pista`, `verb`, `paraula`) perquè el template string quedi llegible. També es podrien posar directament dins de `${ }`, però el text final seria molt difícil de llegir.

</details>

---

## Exercici 11. Bucles

1. Escriu un bucle `for` que mostri els números parells de l'1 al 100.
2. Escriu un bucle que sumi els números de l'1 al 100 i mostri el resultat.
3. Donat el següent array, recorre'l amb un `for` i construeix un únic text amb els elements separats per comes, **sense coma final**:

```js
const numeros = [12, 7, 19, 3];
// Resultat esperat: "12, 7, 19, 3"
```


<details>
<summary><strong>Solució</strong></summary>

```js
// 1. Números parells de l'1 al 100
for (let i = 2; i <= 100; i += 2) {
  console.log(i);
}

// Alternativa: recórrer tots els números i filtrar amb el residu
for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
```

El primer bucle comença pel primer parell (2) i avança de dos en dos, de manera que fa 50 iteracions. El segon en fa 100 i descarta els senars amb `i % 2 === 0`: el residu de dividir per 2 és 0 només en els parells. Totes dues solucions són correctes; la primera és més eficient.

```js
// 2. Suma dels números de l'1 al 100
let suma = 0;                  // acumulador: s'inicialitza a 0 fora del bucle
for (let i = 1; i <= 100; i++) {
  suma = suma + i;             // o bé suma += i
}
console.log(suma);             // 5050
```

La variable `suma` s'ha de declarar fora del bucle. Si es declarés a dins, es tornaria a crear a 0 a cada iteració i, a més, no existiria fora del bloc per mostrar-la.

```js
// 3. Elements separats per comes, sense coma final
const numeros = [12, 7, 19, 3];
let text = "";
for (let i = 0; i < numeros.length; i++) {
  text = text + numeros[i];
  if (i < numeros.length - 1) {   // no és l'últim element
    text = text + ", ";
  }
}
console.log(text);   // "12, 7, 19, 3"
```

La coma s'afegeix després de cada element excepte l'últim, que és el que té l'índex `numeros.length - 1`. Els índexs d'un array van de `0` a `length - 1`, i per això la condició del bucle és `i < numeros.length` i no `<=`.

> **Nota:** el mètode `numeros.join(", ")` fa exactament això en una sola instrucció. Els mètodes dels arrays es treballen a l'RA4; aquí l'objectiu és practicar el bucle.

</details>

---

## Exercici 12. Números aleatoris

1. Executa `Math.random()` cinc vegades. Quin rang de valors retorna?
2. Escriu una instrucció que generi un enter aleatori entre 1 i 20, tots dos inclosos.
3. Posa-la dins d'un bucle que l'executi 20 vegades i comprova a la consola que mai no surt ni el 0 ni el 21.

<details>
<summary><strong>Solució</strong></summary>

1. Retorna un número decimal més gran o igual que 0 i més petit que 1: pot sortir el `0`, però mai l'`1`. Cada execució dona un valor diferent.

2. ```js
   Math.floor(Math.random() * 20) + 1;
   ```

   La fórmula es construeix pas a pas:

   | Expressió | Rang de valors |
   | :--- | :--- |
   | `Math.random()` | de 0 a 0,999... |
   | `Math.random() * 20` | de 0 a 19,999... |
   | `Math.floor(Math.random() * 20)` | enters de 0 a 19 |
   | `Math.floor(Math.random() * 20) + 1` | enters de 1 a 20 |

   `Math.floor()` arrodoneix sempre cap avall, de manera que 19,999 es converteix en 19. Com que `Math.random()` mai arriba a 1, el producte mai arriba a 20, i després de sumar-hi 1 el màxim és exactament 20.

3. ```js
   for (let i = 0; i < 20; i++) {
     console.log(Math.floor(Math.random() * 20) + 1);
   }
   ```

</details>

---
