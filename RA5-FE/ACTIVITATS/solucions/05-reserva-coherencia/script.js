const form = document.querySelector("#form-reserva");
const resum = document.querySelector("#resum-errors");
const resultat = document.querySelector("#resultat");
const camps = form.querySelectorAll("input, select");   // tots els camps, en l'ordre del formulari

const entrada = document.querySelector("#entrada");
const sortida = document.querySelector("#sortida");
const habitacio = document.querySelector("#habitacio");
const adults = document.querySelector("#adults");
const nens = document.querySelector("#nens");
const codi = document.querySelector("#codi");

const MAX_NITS = 14;

// Expressions regulars: una per cada camp amb format
const regles = {
  nom:       { regex: /^[\p{L} ]{3,40}$/u,      missatge: "Només lletres i espais, entre 3 i 40 caràcters" },
  email:     { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, missatge: "El format del correu no és correcte" },
  telefon:   { regex: /^[6-9]\d{8}$/,           missatge: "9 dígits que comencin per 6, 7, 8 o 9" },
  habitacio: { regex: /^(individual|doble|familiar)$/, missatge: "Cal triar una habitació" },
  adults:    { regex: /^[1-4]$/,                missatge: "Els adults han de ser un número del 1 al 4" },
  nens:      { regex: /^[0-3]$/,                missatge: "Els nens han de ser un número del 0 al 3" },
  codi:      { regex: /^HOTEL-\d{4}$/,          missatge: "El format és HOTEL- seguit de 4 números (ex. HOTEL-2026)" }
};
const DATA = /^\d{4}-\d{2}-\d{2}$/;      // format de les dates: aaaa-mm-dd


// ===== DATES =====
// Data d'avui en format aaaa-mm-dd (així es poden comparar com a text)
function avui() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

// Nits entre l'entrada i la sortida (0 si alguna data no és correcta)
function nits() {
  if (!DATA.test(entrada.value) || !DATA.test(sortida.value)) return 0;
  return Math.round((new Date(sortida.value) - new Date(entrada.value)) / 86400000);
}


// ===== VALIDAR UN CAMP: retorna el missatge d'error, o "" si és correcte =====
function validarCamp(camp) {
  const valor = camp.value.trim();

  // El codi de descompte és opcional: buit és correcte
  if (camp.id === "codi" && valor === "") return "";

  if (valor === "") {
    return camp.id === "habitacio" ? "Cal triar una habitació" : "Aquest camp és obligatori";
  }

  // Dates: format amb regex i, després, coherència
  if (camp.id === "entrada") {
    if (!DATA.test(valor)) return "La data no és correcta";
    if (valor < avui()) return "La data d'entrada no pot ser anterior a avui";
    return "";
  }
  if (camp.id === "sortida") {
    if (!DATA.test(valor)) return "La data no és correcta";
    if (DATA.test(entrada.value) && valor <= entrada.value) return "La sortida ha de ser posterior a l'entrada";
    if (nits() > MAX_NITS) return "L'estada màxima és de " + MAX_NITS + " nits";
    return "";
  }

  // La resta de camps: expressió regular
  if (!regles[camp.id].regex.test(valor)) return regles[camp.id].missatge;

  // Coherència: adults + nens no poden passar de la capacitat de l'habitació
  if ((camp.id === "adults" || camp.id === "nens") && habitacio.value !== "" &&
      regles.adults.regex.test(adults.value.trim()) && regles.nens.regex.test(nens.value.trim())) {
    const capacitat = Number(habitacio.selectedOptions[0].dataset.capacitat);
    const total = Number(adults.value) + Number(nens.value);
    if (total > capacitat) return "Aquesta habitació només admet " + capacitat + " persona(es) (n'has indicat " + total + ")";
  }
  return "";
}


// ===== PINTAR UN CAMP: verd amb «✔ Correcte», vermell amb el missatge =====
function comprovar(camp) {
  const missatge = validarCamp(camp);
  const error = document.querySelector("#error-" + camp.id);

  if (missatge !== "") {
    error.textContent = missatge;
    error.classList.remove("ok");
    camp.classList.remove("valid");
    camp.classList.add("invalid");
    camp.setAttribute("aria-invalid", "true");
  } else if (camp.value.trim() === "") {          // codi opcional i buit: no es pinta res
    error.textContent = "";
    error.classList.remove("ok");
    camp.classList.remove("valid", "invalid");
    camp.removeAttribute("aria-invalid");
  } else {
    error.textContent = "✔ Correcte";
    error.classList.add("ok");
    camp.classList.remove("invalid");
    camp.classList.add("valid");
    camp.setAttribute("aria-invalid", "false");
  }
  return missatge;
}


// ===== LLISTA D'ERRORS, A SOBRE DEL FORMULARI =====
function pintarResum(errors) {
  resum.innerHTML = "";
  if (errors.length === 0) {
    resum.classList.remove("visible");
    return;
  }
  const titol = document.createElement("strong");
  titol.textContent = errors.length === 1 ? "Hi ha 1 error al formulari:" : "Hi ha " + errors.length + " errors al formulari:";
  const llista = document.createElement("ul");
  errors.forEach((e) => {
    const li = document.createElement("li");
    const enllac = document.createElement("a");
    enllac.href = "#" + e.camp.id;
    enllac.textContent = e.missatge;
    enllac.addEventListener("click", (event) => {   // el clic porta el focus al camp, sense canviar la URL
      event.preventDefault();
      e.camp.focus();
    });
    li.append(enllac);
    llista.append(li);
  });
  resum.append(titol, llista);
  resum.classList.add("visible");
}


// ===== ESDEVENIMENTS =====
const dependents = [habitacio, adults, nens];     // es validen junts (coherència)

camps.forEach((camp) => {
  // blur (en sortir) i change (en canviar): validen el camp. "tocat" recorda que ja hi ha passat
  camp.addEventListener("blur", () => { camp.dataset.tocat = "1"; comprovar(camp); });
  camp.addEventListener("change", () => {
    camp.dataset.tocat = "1";
    comprovar(camp);
    dependents.forEach((c) => { if (dependents.includes(camp) && c.dataset.tocat) comprovar(c); });
    if (camp === sortida && entrada.dataset.tocat) comprovar(entrada);
    if (camp === entrada && sortida.dataset.tocat) comprovar(sortida);
  });
  // input (mentre s'escriu): si el camp ja té error, es torna a validar
  camp.addEventListener("input", () => {
    if (camp.classList.contains("invalid")) comprovar(camp);
  });
});


// ===== ENVIAMENT =====
form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  const errors = [];
  camps.forEach((camp) => {
    camp.dataset.tocat = "1";
    const missatge = comprovar(camp);
    if (missatge !== "") {
      const nomCamp = form.querySelector('label[for="' + camp.id + '"]').textContent.trim();
      errors.push({ camp: camp, missatge: nomCamp + ": " + missatge });
    }
  });

  pintarResum(errors);                           // la llista surt a sobre del formulari
  if (errors.length > 0) {
    errors[0].camp.focus();                      // focus al primer camp erroni
    return;
  }

  const n = nits();
  resultat.textContent = "Reserva confirmada per a " + form.elements.nom.value.trim() + ": del " + entrada.value + " al " + sortida.value +
    ", " + n + " nit" + (n > 1 ? "s" : "") + ".";
  form.reset();
  camps.forEach((camp) => {
    delete camp.dataset.tocat;
    camp.classList.remove("valid", "invalid");
    camp.removeAttribute("aria-invalid");
    const error = document.querySelector("#error-" + camp.id);
    error.textContent = "";
    error.classList.remove("ok");
  });
});
