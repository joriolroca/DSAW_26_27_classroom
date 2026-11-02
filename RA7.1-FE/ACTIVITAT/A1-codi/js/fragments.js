/* ==========================================================================
   QUÈ SORTIRÀ PER LA CONSOLA?
   Cada fragment és dins d'una funció. La pàgina mostra el contingut de cada
   una (el codi del fragment, sense la funció que l'embolcalla) i l'executa
   amb el botó Executa. També es poden executar des de la consola:
   fragment1(), fragment2()...
   Els fragments mostren lletres a la consola perquè la predicció sigui
   ràpida d'escriure: el que importa és l'ordre.
   No has de modificar aquest fitxer.
   ========================================================================== */


/* --------------------------------------------------------------------------
   BLOC 1. CODI SÍNCRON I TEMPORITZADORS
   -------------------------------------------------------------------------- */

// Fragment 1. Diversos setTimeout amb temps diferents
const fragment1 = function () {
  setTimeout(() => console.log("A"), 300);
  setTimeout(() => console.log("B"), 100);
  console.log("C");
  setTimeout(() => console.log("D"), 0);
  console.log("E");
};


// Fragment 2. El fil ocupat
const fragment2 = function () {
  const inici = Date.now();

  // Temporitzador de 500 ms
  setTimeout(() => console.log("A"), 500);

  // Bucle que manté JavaScript ocupat durant 1500 ms
  while (Date.now() - inici < 1500) {}

  console.log("B");
};


/* --------------------------------------------------------------------------
   BLOC 2. CALLBACKS
   -------------------------------------------------------------------------- */

// Funció auxiliar del fragment 6: mostra a la consola el que rep.
const mostrar = (lletra) => console.log(lletra);


// Fragment 3. Passar una funció com a paràmetre
const fragment3 = function () {
  const escriureB = () => console.log("B");

  const executarDuesVegades = function (callback) {
    callback();
    callback();
  };

  console.log("A");
  executarDuesVegades(escriureB);
  console.log("C");
};


// Fragment 4. Una funció que rep un callback
const fragment4 = function () {
  const executar = function (callback) {
    console.log("B");
    callback();
    console.log("D");
  };

  console.log("A");
  executar(() => console.log("C"));
  console.log("E");
};


// Fragment 5. Un callback que retorna un valor
const fragment5 = function () {
  const sumar = (a, b) => {
    return a + b;
  };

  const restar = (a, b) => {
    return a - b;
  };

  const calcular = function (callback) {
    const resultat = callback();
    console.log(resultat);
  };

  calcular(sumar);
  calcular(() => sumar(1, 1));
  calcular(() => restar(5, 1));
  calcular(() => sumar(1, 4) + restar(1, 3));
  calcular(restar(2, 2));
};


// Fragment 6. Un callback a setTimeout
const fragment6 = function () {
  console.log("A");
  setTimeout(mostrar("B"), 2000);
  setTimeout(() => mostrar("C"), 1000);
  console.log("D");
};


/* --------------------------------------------------------------------------
   BLOC 3. PROMESES
   -------------------------------------------------------------------------- */

// Funció auxiliar dels fragments 8 a 13: si el número és
// positiu, la promesa es resol amb true; si no, falla amb un Error que té
// el missatge "false".
const esPositiu = function (numero) {
  return new Promise((resolve, reject) => {
    if (numero > 0) {
      resolve(true);
    } else {
      reject(new Error("false"));
    }
  });
};


// Fragment 7. Quan s'executa el codi de dins de new Promise?
const fragment7 = function () {
  const numero = 5;

  console.log("A");

  const promesa = new Promise((resolve, reject) => {
    console.log("B");
    if (numero > 0) {
      resolve("C");
    } else {
      reject(new Error("E"));
    }
  });

  promesa
    .then((valor) => console.log(valor))
    .catch((error) => console.log(error.message));

  console.log("D");
};


// Fragment 8. La promesa i el seu valor
const fragment8 = function () {
  const promesa = esPositiu(5);

  console.log(promesa);

  promesa
    .then((resultat) => console.log(resultat));
};


// Fragment 9. Fer servir el valor fora del then
const fragment9 = function () {
  let resultat = false;

  esPositiu(5)
    .then((valor) => {
      resultat = valor;
      console.log(resultat);
    });

  console.log(resultat);
};


// Fragment 10. Una cadena amb un return oblidat
const fragment10 = function () {
  esPositiu(5)
    .then((resultat) => {
      console.log(resultat);
      return "B";
    })
    .then((lletra) => {
      console.log(lletra);
      lletra + "C";
    })
    .then((lletra) => {
      console.log(lletra);
    });
};


// Fragment 11. On salta l'error?
const fragment11 = function () {
  esPositiu(5)
    .then((resultat) => {
      console.log("A", resultat);
      return esPositiu(-5);
    })
    .then((resultat) => {
      console.log("B", resultat);
    })
    .catch((error) => {
      console.log("C", error.message);
    })
    .finally(() => {
      console.log("D");
    });
};


/* --------------------------------------------------------------------------
   BLOC 4. ASYNC / AWAIT
   -------------------------------------------------------------------------- */

// Fragment 12. Què s'atura amb await?
const fragment12 = function () {
  console.log("A");

  const processar = async function () {
    console.log("B");
    const resultat = await esPositiu(5);
    console.log("C", resultat);
    console.log("D");
  };

  processar();
  console.log("E");
};


// Fragment 13. Un await oblidat
const fragment13 = function () {
  const provar = async function () {
    const senseAwait = esPositiu(5);
    const ambAwait = await esPositiu(5);

    console.log(senseAwait);
    console.log(ambAwait);
  };

  provar();
};


// Fragment 14. Una funció async sempre retorna una promesa
const fragment14 = function () {
  const doble = async function (numero) {
    return numero * 2;
  };

  const resultat = doble(4);
  console.log(resultat);
  resultat
    .then((valor) => console.log(valor));
};


/* --------------------------------------------------------------------------
   REPTE (opcional). PROMESES CONTRA TEMPORITZADORS
   -------------------------------------------------------------------------- */

// Fragment 15. Un then d'una promesa ja resolta i un setTimeout de 0 ms
const fragment15 = function () {
  console.log("A");
  setTimeout(() => console.log("B"), 0);
  Promise.resolve("C")
    .then((valor) => console.log(valor));
  console.log("D");
};
