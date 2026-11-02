/* ==========================================================================
   ENDEVINA EL FETCH - construcció de la pàgina
   Aquest fitxer no forma part de l'activitat: a partir de les dades de
   dades.js, mostra el codi de cada fragment, el contingut dels fitxers que
   demana, desa les respostes i mostra les solucions.
   ========================================================================== */


// ---------- REFERÈNCIES AL DOM ----------
const contingut = document.querySelector("#contingut");
const textProgres = document.querySelector("#progres");


// ---------- DESAR LES RESPOSTES ----------
// Es desen a localStorage. Si el navegador no ho permet (mode privat...),
// la pàgina funciona igual però no recorda les respostes.
const CLAU = "ra7-a2-";

const llegir = function (id) {
  try {
    return localStorage.getItem(CLAU + id) || "";
  } catch (error) {
    return "";
  }
};

const desar = function (id, valor) {
  try {
    localStorage.setItem(CLAU + id, valor);
  } catch (error) {
    // No es pot desar: no fem res
  }
};


// ---------- CREAR ELEMENTS ----------

// Crea un element amb una classe i un text opcionals
const crear = function (etiqueta, classe, text) {
  const element = document.createElement(etiqueta);
  if (classe) {
    element.className = classe;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

// Omple un element amb un text on el que va entre `accents greus` es
// mostra com a <code>. Les parts senars del split són les de codi.
const afegirText = function (element, text) {
  const parts = text.split("`");
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      element.append(crear("code", null, parts[i]));
    } else {
      element.append(parts[i]);
    }
  }
  return element;
};

// Dona colors a un element <code> amb highlight.js, si s'ha pogut carregar.
// llenguatge: "javascript" o "json".
const pintar = function (codi, llenguatge) {
  if (typeof hljs !== "undefined") {
    codi.classList.add(`language-${llenguatge}`);
    hljs.highlightElement(codi);
  }
};

// Bloc <pre><code> amb un text. Si s'indica un llenguatge ("javascript" o
// "json"), el codi es mostra amb colors.
const crearCodi = function (text, llenguatge) {
  const pre = crear("pre");
  const codi = crear("code", null, text);
  pre.append(codi);
  if (llenguatge) {
    pintar(codi, llenguatge);
  }
  return pre;
};

// Mostra el contingut real d'un fitxer de la carpeta dades/. El fitxer es
// llegeix amb fetch en carregar la pàgina; si no es pot llegir (per exemple,
// perquè la pàgina no s'ha obert amb Live Server), es mostra un avís.
const crearFitxer = function (ruta) {
  const bloc = document.createDocumentFragment();
  bloc.append(afegirText(crear("p", "etiqueta"), `Contingut del fitxer \`${ruta}\``));
  const pre = crearCodi("Carregant...");
  const codi = pre.querySelector("code");
  bloc.append(pre);

  fetch(ruta)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`Error ${resposta.status}`);
      }
      return resposta.text();
    })
    .then((text) => {
      codi.textContent = text.trim();
      pintar(codi, "json");
    })
    .catch(() => {
      codi.textContent = "No s'ha pogut llegir el fitxer. Obre la pàgina amb Live Server.";
    });

  return bloc;
};

// Mostra l'extracte d'una resposta d'una API, escrit a dades.js
const crearResposta = function (resposta) {
  const bloc = document.createDocumentFragment();
  bloc.append(crear("p", "etiqueta", resposta.titol));
  const llenguatge = resposta.llenguatge === "text" ? null : "json";
  bloc.append(crearCodi(resposta.text, llenguatge));
  return bloc;
};

// Codi font d'una funció auxiliar tal com està escrita a fragments.js
const codiFont = (nom, funcio) => `const ${nom} = ${funcio.toString()};`;

// Codi d'un fragment: només el cos de la funció, sense la línia
// "function () {" ni la clau final, i amb un nivell menys de sagnat.
const cosFuncio = function (funcio) {
  const text = funcio.toString();
  const cos = text.slice(text.indexOf("{") + 1, text.lastIndexOf("}"));
  const linies = cos.split("\n");
  // Treu la primera i l'última línia, que són buides
  linies.shift();
  linies.pop();
  return linies.map((linia) => linia.replace(/^  /, "")).join("\n");
};

// Camp de text amb etiqueta, que es desa mentre s'escriu
const crearCamp = function (id, etiqueta, ajuda) {
  const fragmentDoc = document.createDocumentFragment();
  const label = crear("label", null, etiqueta);
  label.htmlFor = CLAU + id;
  const area = crear("textarea");
  area.id = CLAU + id;
  area.value = llegir(id);
  if (ajuda) {
    area.placeholder = ajuda;
  }
  area.addEventListener("input", () => desar(id, area.value));
  fragmentDoc.append(label, area);
  return { nodes: fragmentDoc, area };
};

// Botó que mostra i amaga un bloc de solució. Només s'activa quan el camp
// de la predicció té text.
const crearBotoSolucio = function (campObligatori, solucio, targeta) {
  const boto = crear("button", "secundari", "Mostra la solució");
  boto.type = "button";
  boto.setAttribute("aria-expanded", "false");

  const actualitzar = () => {
    const teText = campObligatori.value.trim() !== "";
    boto.disabled = !teText;
    targeta.classList.toggle("contestat", teText);
    actualitzarProgres();
  };

  campObligatori.addEventListener("input", actualitzar);

  boto.addEventListener("click", () => {
    solucio.hidden = !solucio.hidden;
    boto.textContent = solucio.hidden ? "Mostra la solució" : "Amaga la solució";
    boto.setAttribute("aria-expanded", String(!solucio.hidden));
  });

  return { boto, actualitzar };
};


// ---------- TARGETA D'UN FRAGMENT ----------
const crearFragment = function (dades) {
  const id = `f${dades.num}`;
  const targeta = crear("section", "fragment");
  targeta.id = id;

  targeta.append(crear("h3", null, `Fragment ${dades.num}. ${dades.titol}`));

  if (dades.nota) {
    targeta.append(afegirText(crear("p", "nota"), dades.nota));
  }

  // Què hi ha al fitxer o a la resposta de l'API que demana el fragment
  for (const ruta of dades.fitxers || []) {
    targeta.append(crearFitxer(ruta));
  }
  for (const resposta of dades.respostes || []) {
    targeta.append(crearResposta(resposta));
  }

  // Codi: les funcions auxiliars i després el fragment
  let codi = "";
  for (const [nom, funcio] of dades.auxiliars || []) {
    codi += codiFont(nom, funcio) + "\n\n";
  }
  codi += cosFuncio(dades.funcio);
  targeta.append(crear("p", "etiqueta", "Codi"));
  targeta.append(crearCodi(codi, "javascript"));

  // Camps de resposta
  const prediccio = crearCamp(`${id}-prediccio`, "Predicció: què sortirà a la consola?", "Una línia per missatge, en ordre");
  targeta.append(prediccio.nodes);

  // Solució (amagada)
  const solucio = crear("div", "solucio");
  solucio.hidden = true;
  solucio.append(crear("h4", null, "Resultat a la consola"));
  solucio.append(crearCodi(dades.resultat.join("\n")));
  solucio.append(crear("h4", null, "Per què"));
  for (const paragraf of dades.explicacio) {
    solucio.append(afegirText(crear("p"), paragraf));
  }

  // Botons
  const accions = crear("div", "accions");
  const executar = crear("button", null, "Executa");
  executar.type = "button";
  executar.addEventListener("click", () => {
    console.clear();
    dades.funcio();
  });
  const { boto, actualitzar } = crearBotoSolucio(prediccio.area, solucio, targeta);
  accions.append(executar, boto);
  targeta.append(accions);
  targeta.append(crear("p", "ajuda", "Executa esborra la consola i hi mostra el resultat. Obre-la abans amb F12."));
  targeta.append(solucio);

  actualitzar();
  return targeta;
};


// ---------- PROGRÉS ----------
const actualitzarProgres = function () {
  const fragments = FRAGMENTS.filter((f) => llegir(`f${f.num}-prediccio`).trim() !== "").length;
  textProgres.textContent = `Fragments amb predicció: ${fragments} de ${FRAGMENTS.length}`;
};


// ---------- ESBORRAR ----------

const esborrarTot = function () {
  if (!confirm("Segur que vols esborrar totes les respostes?")) {
    return;
  }
  for (const area of document.querySelectorAll("textarea")) {
    area.value = "";
    desar(area.id.replace(CLAU, ""), "");
    area.dispatchEvent(new Event("input"));
  }
};

document.querySelector("#esborrar").addEventListener("click", esborrarTot);


// ---------- PROGRAMA PRINCIPAL ----------
for (const dades of FRAGMENTS) {
  if (dades.bloc) {
    contingut.append(crear("h2", null, dades.bloc));
  }
  if (dades.textBloc) {
    contingut.append(afegirText(crear("p"), dades.textBloc));
  }
  // Abans del primer fragment que la fa servir es mostra la funció auxiliar,
  // amb el paràgraf que l'explica (tot surt de dades.js)
  const auxiliar = AUXILIARS_BLOC[dades.num];
  if (auxiliar) {
    contingut.append(afegirText(crear("p"), auxiliar.text));
    contingut.append(crearCodi(codiFont(auxiliar.nom, auxiliar.funcio), "javascript"));
  }
  contingut.append(crearFragment(dades));
}


actualitzarProgres();
