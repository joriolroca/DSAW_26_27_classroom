
> **DSAW**  **RA2** - **FUNCIONS EN JAVASCRIPT**
>
> **Mòdul**: Client (0612)
>
> **Estat**: **Revisat** 


# Funcions en JavaScript: declaració, expressió i funció fletxa


## Què aprendràs

En acabar aquesta unitat has de ser capaç de:

- Reconèixer què canvia en les funcions de JavaScript respecte als llenguatges amb tipus estàtics que ja coneixes.
- Escriure una mateixa funció de les tres maneres del llenguatge: **function declaration**, **function expression** i **arrow function**.
- Entendre el **hoisting** de funcions i saber quines es poden cridar abans de ser definides.
- Passar una funció com a argument a una altra funció (**callback**) i evitar l'error de cridar-la en lloc de passar-la.
- Identificar l'àmbit de les variables dins i fora d'una funció.
- Triar la forma adequada en cada situació, i comentar i provar les funcions que escrius.


---

## Índex

1. [Les funcions a JavaScript](#1-les-funcions-a-javascript)
2. [Function declaration](#2-function-declaration)
3. [Function expression](#3-function-expression)
4. [Arrow function](#4-arrow-function)
5. [Funcions i àmbit de les variables](#5-funcions-i-àmbit-de-les-variables)
6. [Comparativa i quina triar](#6-comparativa-i-quina-triar)
7. [Comentar i provar funcions](#7-comentar-i-provar-funcions)


---

## 1. Les funcions a JavaScript 

### 1.1 Sense tipus als paràmetres ni al retorn

A JavaScript no s'indica cap tipus.



```js
// JavaScript: ni el paràmetre ni el retorn tenen tipus declarat
function calcularEdat(dataNaixement) {
  return 2026 - dataNaixement;
}

console.log(calcularEdat(1990));     // 36
```

Com que no hi ha tipus, la funció accepta qualsevol valor, i és el llenguatge qui intenta convertir-lo quan fa l'operació.

```js
console.log(calcularEdat("1990"));   // 36: el string es converteix a number
console.log(calcularEdat("hola"));   // NaN: la conversió no és possible
console.log(calcularEdat(true));     // 2025: true es converteix en 1
```

> **Compte:** JavaScript no avisarà mai que una funció ha rebut un tipus inesperat. Si la funció depèn del tipus, cal convertir i comprovar el valor dins de la funció.

```js
function calcularEdat(dataNaixement) {
  const any = Number(dataNaixement);   // conversió explícita

  if (Number.isNaN(any)) {
    return null;                       // valor que indica "no s'ha pogut calcular"
  }
  return 2026 - any;
}

console.log(calcularEdat("1990"));     // 36
console.log(calcularEdat("hola"));     // null
```

Una funció sense `return`, o amb un `return` sense valor, retorna `undefined`.

```js
function saludar(nom) {
  console.log(`Hola, ${nom}`);         // mostra el text per consola, però no retorna res
}

const resultat = saludar("Carles");    // resultat no tindrà cap valor
console.log(resultat);                 // undefined ja que la funció no retorna res
```

### 1.2 Arguments que falten o que sobren

A JavaScript una funció es pot cridar amb un nombre d'arguments diferent del nombre de paràmetres, i no es produeix cap error.

- Els paràmetres que no reben argument valen `undefined`.
- Els arguments que sobren s'ignoren.

```js
function sumar(a, b) {
  return a + b;
}

console.log(sumar(2, 3));        // 5
console.log(sumar(2));           // NaN: b val undefined, i 2 + undefined és NaN
console.log(sumar(2, 3, 10));    // 5: el tercer argument s'ignora
```

### 1.3 Paràmetres per defecte

Per evitar el `undefined` d'un argument que falta, es pot assignar un valor per defecte al paràmetre.

```js
function sumar(a, b = 0) {
  return a + b;
}

console.log(sumar(2));           // 2: b pren el valor per defecte
console.log(sumar(2, 3));        // 5
```


### 1.4 Sense sobrecàrrega

En altres llenguatges es poden definir diverses funcions amb el mateix nom i paràmetres diferents (**sobrecàrrega**). A JavaScript no: si es defineixen dues funcions amb el mateix nom, la segona substitueix la primera.

### 1.5 Les funcions són valors

A JavaScript una funció és un valor, igual que un número o un string. Això vol dir que es pot guardar en una variable, passar com a argument a una altra funció o retornar des d'una funció. Aquesta idea és la base de les formes que es veuen als apartats 3 i 4.

```js
function saludar() {
  return "Hola!";
}

console.log(typeof saludar);   // "function"
console.log(saludar);          // mostra la funció, no l'executa
console.log(saludar());        // "Hola!": amb parèntesis, s'executa

const copia = saludar;         // guardem la funció en una altra variable
console.log(copia());          // "Hola!"
```

> **Recorda:** el nom de la funció sense parèntesis (`saludar`) és la funció en si. Amb parèntesis (`saludar()`) és el resultat d'executar-la.


---

## 2. Function declaration

Una **function declaration** (declaració de funció) es defineix amb la paraula clau `function` seguida d'un nom. És la forma més semblant a la que ja coneixes.

```js
function nomFuncio(parametre1, parametre2) {
  // instruccions
  return valor;
}
```

Característiques:

- La funció sempre té nom.
- Es pot cridar abans del punt del codi on està definida.

```js
const CURRENT_YEAR = 2026;

// Es crida abans de la definició i funciona
console.log(calcularEdat(1990));   // 36

function calcularEdat(dataNaixement) {
  return CURRENT_YEAR - dataNaixement;
}

console.log(calcularEdat(2005));   // 21
```

---

## 3. Function expression

Una **function expression** (expressió de funció) és una funció que es guarda en una variable. Normalment la funció no té nom propi: és una **funció anònima**, i s'identifica pel nom de la variable.

```js
const nomFuncio = function (parametre1, parametre2) {
  // instruccions
  return valor;
};   // porta punt i coma: és una assignació
```

```js
const CURRENT_YEAR = 2026;

const calcularEdat = function (dataNaixement) {
  return CURRENT_YEAR - dataNaixement;
};

console.log(calcularEdat(1990));   // 36: es crida igual que una declaració
```

Característiques:

- La funció es guarda en una variable. Es declara amb `const` perquè no s'hagi de reassignar.
- No es pot cridar abans de la línia on es defineix.

```js
console.log(calcularEdat(1990));
// ReferenceError: Cannot access 'calcularEdat' before initialization

const calcularEdat = function (dataNaixement) {
  return CURRENT_YEAR - dataNaixement;
};
```

Aquest comportament obliga a definir les funcions abans d'utilitzar-les, i fa que el codi es llegeixi en ordre, de dalt a baix.

---

## 4. Arrow function

L'**arrow function** (funció fletxa) és una forma compacta d'escriure una function expression. Es guarda en una variable, és anònima i substitueix la paraula `function` per una fletxa `=>` darrere dels paràmetres.

### 4.1 Sintaxi

```js
const nomFuncio = (parametre1, parametre2) => {
  // instruccions
  return valor;
};
```

La mateixa funció de l'apartat anterior, escrita com a arrow function:

```js
const calcularEdat = (dataNaixement) => {
  const edat = CURRENT_YEAR - dataNaixement;
  return edat;
};

console.log(calcularEdat(1990));   // 36: es crida igual que les altres
```

Com la function expression, no es pot cridar abans de ser definida.

### 4.2 Simplificació progressiva

La sintaxi es pot escurçar quan la funció és senzilla. Els passos següents parteixen de la mateixa funció i la van simplificant.

```js
// 1. Cos de bloc amb return explícit
const doble = (n) => {
  return n * 2;
};

// 2. Si el cos és una única expressió, se suprimeixen les claus i el return.
//    El valor de l'expressió es retorna automàticament (retorn implícit).
const doble2 = (n) => n * 2;

// 3. Amb un sol paràmetre, els parèntesis són opcionals
const doble3 = n => n * 2;

console.log(doble(5), doble2(5), doble3(5));   // 10 10 10
```

Els parèntesis són obligatoris quan hi ha zero paràmetres o més d'un:

```js
const saludar = () => console.log("Hola món");   // sense paràmetres
const sumar = (a, b) => a + b;                   // dos paràmetres

saludar();                    // Hola món
console.log(sumar(2, 3));     // 5
```

Quan el cos té més d'una instrucció, cal tornar a les claus i al `return` explícit:

```js
const classificarNota = (nota) => {
  if (nota >= 9) return "Excel·lent";
  if (nota >= 7) return "Notable";
  if (nota >= 5) return "Aprovat";
  return "Suspès";
};

console.log(classificarNota(7.5));   // Notable
```










| Forma | Es pot cridar abans de definir-la | Què passa si es fa |
| :--- | :---: | :--- |
| Function declaration | Sí | S'executa amb normalitat |
| Function expression amb `const` o `let` | No | `ReferenceError` (zona morta temporal) |
| Arrow function amb `const` o `let` | No | `ReferenceError` (zona morta temporal) |
| Function expression o arrow amb `var` | No | `TypeError`: la variable val `undefined`, que no és una funció |


---

## 5. Funcions i àmbit de les variables

Al document de sintaxi s'han vist els tres àmbits: global, de funció i de bloc. Aquest apartat en concreta les regles quan hi ha funcions.

Els paràmetres i les variables declarades dins d'una funció són **locals**: només existeixen mentre la funció s'executa.

```js
function calcularPreuFinal(preu) {
  const IVA = 0.21;                 // variable local
  return preu * (1 + IVA);          // preu també és local
}

console.log(calcularPreuFinal(100));   // 121
console.log(IVA);                      // ReferenceError: IVA is not defined
console.log(preu);                     // ReferenceError: preu is not defined
```

Una funció pot llegir les variables de l'àmbit on s'ha definit, per exemple les globals.

```js
const IVA = 0.21;                   // variable global

function calcularPreuFinal(preu) {
  return preu * (1 + IVA);          // llegeix la variable global
}

console.log(calcularPreuFinal(100));   // 121
```

Si una variable local té el mateix nom que una global, dins de la funció s'utilitza la local.

```js
const missatge = "global";

function mostrar() {
  const missatge = "local";         // amaga la variable global
  console.log(missatge);            // "local"
}

mostrar();
console.log(missatge);              // "global": la global no ha canviat
```

Una funció també pot modificar una variable global declarada amb `let`, però això fa el codi més difícil de seguir: el resultat de la funció depèn d'un valor que es pot canviar des de qualsevol punt del fitxer.

```js
// MALAMENT: la funció modifica una variable global
let punts = 0;

function sumarPunts(quantitat) {
  punts = punts + quantitat;
}

sumarPunts(5);
console.log(punts);   // 5
```

```js
// BÉ: la funció rep el que necessita i retorna el resultat
function sumarPunts(puntsActuals, quantitat) {
  return puntsActuals + quantitat;
}

let punts = 0;
punts = sumarPunts(punts, 5);
console.log(punts);   // 5
```


```js
function crearMissatge(nom) {
  const salutacio = "Hola";                  // variable de la funció externa

  const formatar = () => `${salutacio}, ${nom}!`;   // la interna la pot llegir

  return formatar();
}

console.log(crearMissatge("Joan"));   // Hola, Joan!
```


---

## 6. Comparativa i quina triar

La mateixa funció escrita de les tres maneres:

```js
// Function declaration
function calcularEdat(dataNaixement) {
  return CURRENT_YEAR - dataNaixement;
}

// Function expression
const calcularEdat2 = function (dataNaixement) {
  return CURRENT_YEAR - dataNaixement;
};

// Arrow function
const calcularEdat3 = (dataNaixement) => CURRENT_YEAR - dataNaixement;

// Les tres es criden igual i donen el mateix resultat
console.log(calcularEdat(1990), calcularEdat2(1990), calcularEdat3(1990));   // 36 36 36
```

| | Function declaration | Function expression | Arrow function |
| :--- | :--- | :--- | :--- |
| **Sintaxi** | `function nom() {}` | `const nom = function () {};` | `const nom = () => {};` |
| **Nom** | Propi | El de la variable | El de la variable |
| **Es pot cridar abans de definir-la** | Sí | No | No |
| **Retorn implícit** | No | No | Sí, si el cos és una expressió |
| **`this` propi** | Sí | Sí | No (es treballa a l'RA4) |
| **Ús habitual** | Funcions principals del programa | Funcions guardades en una variable | Callbacks i funcions curtes |

A la pràctica, la function expression i l'arrow function tenen el mateix comportament en els casos d'aquesta unitat. La tria entre formes és sobretot una qüestió de llegibilitat i de coherència dins del projecte.

> **Recorda:** el més important és ser coherent. Dins d'un mateix fitxer, no barregis formes diferents per a funcions que fan el mateix tipus de tasca.


---

## 7. Comentar i provar funcions

### 7.1 Noms descriptius

Una funció fa una acció, i el seu nom ha de començar amb un verb seguit del que fa. Si el nom és clar, molts comentaris deixen de ser necessaris.

| Incorrecte | Correcte | Motiu |
| :--- | :--- | :--- |
| `dades()` | `obtenirDadesUsuari()` | Indica l'acció |
| `calc(x)` | `calcularEdat(dataNaixement)` | El nom i el paràmetre expliquen què es calcula |
| `check(n)` | `esMajorEdat(dataNaixement)` | Les funcions que retornen un booleà comencen per `es`, `te` o `pot` |
| `fer()` | `iniciarPartida()` | Un nom genèric no diu res de la tasca |

Cada funció ha de fer una única tasca. Si per explicar què fa cal dir "i", probablement cal dividir-la en dues.

### 7.2 Comentaris JSDoc

**JSDoc** és un format estàndard de comentaris per documentar funcions. Es col·loca just a sobre de la funció, entre `/**` i `*/`, i descriu què fa, quins paràmetres rep i què retorna.

```js
/**
 * Calcula l'edat d'una persona a partir del seu any de naixement.
 *
 * @param {number} dataNaixement - Any de naixement amb quatre xifres.
 * @returns {number|null} L'edat en anys, o null si l'any no és vàlid.
 */
function calcularEdat(dataNaixement) {
  const any = Number(dataNaixement);
  if (Number.isNaN(any)) {
    return null;
  }
  return CURRENT_YEAR - any;
}
```

| Etiqueta | Funció |
| :--- | :--- |
| `@param {tipus} nom - descripció` | Descriu un paràmetre i el tipus esperat |
| `@returns {tipus} descripció` | Descriu el valor retornat |

Encara que JavaScript no tingui tipus, Visual Studio Code llegeix els comentaris JSDoc i mostra aquesta informació quan es passa el ratolí per sobre d'una crida a la funció.






