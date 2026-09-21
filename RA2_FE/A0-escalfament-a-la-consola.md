
> **DSAW**  **RA2** - **ACTIVITAT 0: ESCALFAMENT A LA CONSOLA**
>
> **Mòdul**: Client (0612)


# Escalfament: sintaxi de JavaScript a la consola


## Fitxa de l'activitat

| | |
| :--- | :--- |
| **Mòdul** | 0612. Desenvolupament web en entorn client |
| **Resultat d'aprenentatge** | RA2. Escriu sentències simples, aplicant la sintaxi del llenguatge i verificant la seva execució sobre navegadors web |
| **Tipus** | Activitat d'aprenentatge, no avaluable |
| **Modalitat** | Individual |
| **Temps estimat** | 60 minuts (exercicis 1 a 5 i, després, 6 a 10) |
| **Dificultat** | Molt bàsica |
| **Nom i cognoms** | |


## Per què aquesta activitat

L'activitat següent (`A1-encerta-el-numero.md`) demana dues coses alhora: escriure JavaScript correcte i fer que aquest codi modifiqui una pàgina web. Si alguna cosa no funciona i encara no domines la sintaxi, no sabràs si l'error és teu o de com has connectat el codi amb la pàgina.

Aquí es treballa **només la sintaxi**, sense tocar cap pàgina. Tot es fa a la consola del navegador, que respon immediatament a cada instrucció.

> **Recorda:** la consola s'obre amb **F12** (o Ctrl+Maj+I) i la pestanya **Console**. Cada línia s'executa en prémer Intro. Per escriure diverses línies sense executar-les, prem Maj+Intro.

> **Compte:** en els exercicis de predicció, apunta la teva resposta **abans** d'executar la línia. L'objectiu no és saber el resultat, és descobrir en quins casos la teva intuïció falla, perquè són exactament els casos que et faran perdre temps a l'activitat següent.


## Objectius

- Comprovar el tipus de dada d'un valor i les conversions entre tipus (criteri 2.4).
- Distingir els operadors `==` i `===` i saber per què només se n'ha de fer servir un (criteri 2.2).
- Reconèixer els valors *truthy* i *falsy* i les trampes que comporten en les condicions (criteris 2.2 i 2.5).
- Saber comprovar si un valor és un número i distingir `isNaN()` de `Number.isNaN()` (criteri 2.4).
- Escriure blocs de decisió i bucles (criteris 2.5 i 2.6).
- Fer servir la consola com a entorn de proves (criteri 2.8).


---

## Índex

1. [Variables i tipus](#exercici-1-variables-i-tipus)
2. [Conversions](#exercici-2-conversions)
3. [Comparació: `==` i `===`](#exercici-3-comparació--i-)
4. [Valors *truthy* i *falsy*](#exercici-4-valors-truthy-i-falsy)
5. [Saber si un valor és un número](#exercici-5-saber-si-un-valor-és-un-número)
6. [Un valor escrit per l'usuari](#exercici-6-un-valor-escrit-per-lusuari)
7. [Decisions](#exercici-7-decisions)
8. [Bucles](#exercici-8-bucles)
9. [Números aleatoris](#exercici-9-números-aleatoris)
10. [Depuració](#exercici-10-depuració)

[Solució](#solució) · [Annex: criteris d'avaluació](#annex-criteris-davaluació)


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
3. Intenta escriure `edat = "disset";`. Dóna error? Per què amb `edat` sí que es pot i amb `nom` no?

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

1. Escriu en una frase la regla que explica per què `"7" + 1` i `"7" - 1` donen resultats tan diferents.
2. Quina diferència hi ha entre `Number()` i `parseInt()` quan el text conté lletres?
3. Si un formulari et retorna el text `"21 anys"` i vols quedar-te amb el número, quina de les dues funcions faries servir?

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
3. Tens una variable `edat` que ve d'un formulari. Escriu la condició que comprovi si val exactament el **número** 18, de manera que el **text** `"18"` no la compleixi.
4. Quina de les dues comparacions següents és més fàcil d'entendre per a algú que llegeixi el teu codi d'aquí a sis mesos, i per què?

```js
if (valor == 0) { }
if (valor === 0) { }
```

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
3. Aquest codi vol saludar l'usuari només si ha escrit el seu nom:

```js
const nom = prompt("Com et dius?");

if (nom) {
  console.log("Hola, " + nom);
} else {
  console.log("No has escrit res");
}
```

Prova'l quatre vegades: escrivint `Berta`, deixant el camp buit, escrivint **tres espais** i prement **Cancel·la**. En quin dels quatre casos no es comporta com esperaries? Com ho arreglaries?

4. Tens un comptador que val `0`. Per què `if (comptador)` no serveix per saber si la variable existeix? Escriu una condició millor.

---

## Exercici 5. Saber si un valor és un número

Aquest és el punt que genera més confusió del llenguatge, i el necessitaràs a l'activitat següent per validar el número que escriu el jugador.

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
5. Escriu una funció `esNumeroValid(text)` que rebi un text i retorni `true` només si conté un número **enter**. Prova-la amb `"7"`, `"7.5"`, `""`, `"   "`, `"hola"`, `"7px"` i `"-3"`.

> **Nota:** aquesta funció és, en essència, la validació que hauràs d'escriure a l'activitat següent. Val la pena que la deixis ben resolta aquí.

---

## Exercici 6. Un valor escrit per l'usuari

`prompt()` demana un valor a l'usuari i el retorna. Executa:

```js
const resposta = prompt("Escriu un número");
console.log(resposta, typeof resposta);
```

Escriu-hi `25`. Respon:

1. De quin tipus és `resposta`?
2. Què dóna `resposta + 10`? I `Number(resposta) + 10`?
3. Escriu una condició que comprovi si el valor introduït és un número enter entre 1 i 20. Prova-la amb `25`, amb `7.5`, amb `hola` i amb el camp buit.

> **Nota:** `prompt()` és l'equivalent ràpid del `Scanner` de Java. A l'activitat següent el valor no vindrà d'un `prompt()`, sinó d'un camp de formulari, però el problema serà exactament el mateix: arriba com a text.

---

## Exercici 7. Decisions

Escriu una funció que, donada una nota numèrica, retorni la qualificació corresponent. Fes-ho amb `if`/`else if`/`else`.

| Nota | Qualificació |
| :--- | :--- |
| menys de 5 | Suspens |
| de 5 a 6,9 | Aprovat |
| de 7 a 8,9 | Notable |
| 9 o més | Excel·lent |

Prova-la amb 4, 5, 6.9, 7, 9 i 10. Comprova especialment els valors dels límits.

---

## Exercici 8. Bucles

1. Escriu un bucle `for` que mostri els números del 10 a l'1, en ordre descendent.
2. Escriu un bucle que sumi els números de l'1 al 100 i mostri el resultat.
3. Donat aquest array, recorre'l amb un `for` i construeix un únic text amb els elements separats per comes, **sense coma final**:

```js
const numeros = [12, 7, 19, 3];
// Resultat esperat: "12, 7, 19, 3"
```

> **Compte:** l'exercici 3 és exactament el bucle que necessitaràs a l'activitat següent per mostrar l'historial de números provats.

---

## Exercici 9. Números aleatoris

1. Executa `Math.random()` cinc vegades. Quin rang de valors retorna?
2. Escriu una instrucció que generi un enter aleatori entre 1 i 20, tots dos inclosos.
3. Posa-la dins d'un bucle que l'executi 20 vegades i comprova a la consola que mai no surt ni el 0 ni el 21.

---

## Exercici 10. Depuració

Aquest codi hauria de mostrar els números parells del 2 al 10, però no funciona. Troba els **tres** errors:

```js
for (let i = 2; i = 10; i + 2) {
  console.log(numero);
}
```

> **Compte:** abans d'executar-lo, llegeix-lo. Un dels errors fa que el bucle no s'aturi mai i el navegador es quedi penjat.

---

## Criteris de correcció

| Aspecte | Assolit | En procés | No assolit |
| :--- | :--- | :--- | :--- |
| **Tipus i conversions** | Prediu correctament la majoria de línies de l'exercici 2 i sap explicar-les | Encerta els resultats però no sap justificar-los | No distingeix `"7"` de `7` |
| **Comparació** | Explica què fa `==` i per què s'ha de fer servir `===` | Sap que cal `===` però no sap dir per què | Els fa servir indistintament |
| **Truthy i falsy** | Enumera els valors *falsy* i detecta el cas dels tres espais | Enumera els valors però no detecta la trampa | Creu que `"0"` és *falsy* |
| **Comprovar un número** | La funció de l'exercici 5.5 respon bé als set casos i sap explicar la diferència entre les dues funcions | La funció falla en un o dos casos | Fa servir `Number.isNaN()` directament sobre el text |
| **Validació d'un valor** | La condició de l'exercici 6.3 rebutja els quatre casos incorrectes | Rebutja alguns casos | La condició no funciona |
| **Decisions** | L'exercici 7 respon bé també als valors límit | Falla en algun límit | La cadena de condicions és incorrecta |
| **Bucles** | Els tres bucles funcionen, inclòs el text sense coma final | Els dos primers funcionen | Cap bucle correcte |
| **Depuració** | Troba els tres errors de l'exercici 10 | En troba un o dos | No identifica cap error |

---

## Solució

### Exercici 1

```js
typeof nom;         // "string"
typeof edat;        // "number"
typeof matriculat;  // "boolean"
typeof nota;        // "undefined"
```

1. `undefined` és el valor que rep automàticament una variable declarada sense assignació. No és el mateix que `null`, que és una absència de valor posada expressament pel programador.
2. `TypeError: Assignment to constant variable`. Una variable declarada amb `const` no es pot reassignar.
3. No dóna error. JavaScript no és tipat: una variable declarada amb `let` pot canviar de tipus durant l'execució. És còmode i, alhora, és l'origen de molts errors que en Java el compilador hauria aturat.

### Exercici 2

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
3. `parseInt("21 anys")`, que retorna `21`. Ara bé, aquesta tolerància és perillosa en una validació: `parseInt("7 gats")` dóna `7` i el programa continuaria com si l'usuari hagués escrit un número correcte. Per validar és millor `Number()`, precisament perquè és estricta.

### Exercici 3

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
3. ```js
   if (edat === 18) { }
   ```
   Amb `==`, el text `"18"` també compliria la condició.
4. La segona. `valor === 0` diu exactament què comprova: que el valor sigui el número zero. `valor == 0` és certa també amb `""`, amb `false` i amb `[]`, de manera que qui la llegeixi no pot saber quina d'aquestes situacions volia cobrir qui la va escriure.

### Exercici 4

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
3. El cas dels **tres espais**. `"   "` és una cadena amb contingut i, per tant, *truthy*: el programa saluda l'usuari amb un nom que no existeix. Els altres tres casos funcionen: el camp buit retorna `""` i el botó Cancel·la retorna `null`, i tots dos són *falsy*. La solució és eliminar els espais abans de comprovar:

```js
if (nom !== null && nom.trim() !== "") {
  console.log("Hola, " + nom);
}
```

4. Perquè `0` és un valor *falsy*: la condició seria falsa encara que la variable existeixi i tingui un valor perfectament legítim. És l'error clàssic dels comptadors. Si el que vols saber és si la variable té valor:

```js
if (comptador !== undefined) { }
```

### Exercici 5

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

1. Retorna `undefined`. **En JavaScript no existeix cap funció `isNumber()`**: és un nom que ve d'altres llenguatges i de llibreries externes com Lodash. Si la crides amb parèntesis, obtens `ReferenceError`.
2. `isNaN()` **converteix** el valor a número i respon si el resultat és `NaN`. `Number.isNaN()` no converteix res i respon només si el valor **ja és** exactament `NaN`.
3. Perquè `"hola"` no és el valor `NaN`: és una cadena de text. `Number.isNaN()` no es pregunta si el valor es podria convertir en número, sinó si el valor és, literalment, `NaN`. Per obtenir el `true` que esperaves cal convertir primer: `Number.isNaN(Number("hola"))`.
4. Perquè `isNaN()` converteix la cadena buida en `0`, i `0` sí que és un número. En una validació, això vol dir que un camp buit passaria el control com si l'usuari hi hagués escrit un zero. Per això la cadena buida sempre s'ha de comprovar a part.

5. ```js
   function esNumeroValid(text) {
     // El camp buit (o només amb espais) es descarta primer, perquè
     // Number("") val 0 i passaria la resta de comprovacions.
     if (text.trim() === "") {
       return false;
     }

     const numero = Number(text);

     // Number() és estricta: "7px" i "hola" donen NaN.
     // Number.isInteger() descarta els decimals com 7.5.
     return !Number.isNaN(numero) && Number.isInteger(numero);
   }
   ```

   | Entrada | Resultat | Per què |
   | :--- | :---: | :--- |
   | `"7"` | `true` | Enter correcte |
   | `"-3"` | `true` | Els negatius també són enters |
   | `"7.5"` | `false` | `Number.isInteger(7.5)` és fals |
   | `""` | `false` | Camp buit |
   | `"   "` | `false` | Només espais |
   | `"hola"` | `false` | `Number("hola")` és `NaN` |
   | `"7px"` | `false` | `Number("7px")` és `NaN` |

### Exercici 6

1. `string`. Tot el que retorna `prompt()` és text.
2. `resposta + 10` dóna `"2510"`; `Number(resposta) + 10` dóna `35`.

```js
const numero = Number(resposta);

if (
  resposta.trim() !== "" &&
  !Number.isNaN(numero) &&
  Number.isInteger(numero) &&
  numero >= 1 &&
  numero <= 20
) {
  console.log("Valor correcte");
} else {
  console.log("Valor incorrecte");
}
```

És la mateixa comprovació de l'exercici 5, amb el rang afegit.

### Exercici 7

```js
function qualificacio(nota) {
  if (nota < 5) {
    return "Suspens";
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

### Exercici 8

```js
// 1
for (let i = 10; i > 0; i--) {
  console.log(i);
}

// 2
let suma = 0;
for (let i = 1; i <= 100; i++) {
  suma = suma + i;
}
console.log(suma);   // 5050

// 3
const numeros = [12, 7, 19, 3];
let text = "";
for (let i = 0; i < numeros.length; i++) {
  text = text + numeros[i];
  if (i < numeros.length - 1) {
    text = text + ", ";
  }
}
console.log(text);   // "12, 7, 19, 3"
```

### Exercici 9

```js
// 2
Math.floor(Math.random() * 20 + 1);

// 3
for (let i = 0; i < 20; i++) {
  console.log(Math.floor(Math.random() * 20 + 1));
}
```

`Math.random()` retorna un decimal entre 0 inclòs i 1 exclòs. Com que mai no arriba a 1, el producte mai no arriba a 20, i per tant `Math.floor()` mai no dóna 20 abans de sumar-hi l'1.

### Exercici 10

```js
// Incorrecte
for (let i = 2; i = 10; i + 2) {
  console.log(numero);
}
```

Els tres errors:

1. `i = 10` és una **assignació**, no una comparació. La condició hauria de ser `i <= 10`. Tal com està, la condició sempre val 10, que és un valor *truthy*, i el bucle no s'atura mai.
2. `i + 2` **calcula** un valor però no el guarda enlloc, de manera que `i` no canvia mai. Hauria de ser `i = i + 2` o `i += 2`.
3. `numero` no existeix: la variable del bucle es diu `i`. Amb el mode estricte això provoca un `ReferenceError`.

```js
// Correcte
for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}
```

> **Compte:** si executes el codi incorrecte, el navegador es quedarà penjat. Tanca la pestanya per aturar-lo.

---


