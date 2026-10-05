const form = document.querySelector("#form-alta");
const resultat = document.querySelector("#resultat");

// Cada camp amb el seu element d'error
const nom = document.querySelector("#nom");
const errorNom = document.querySelector("#error-nom");
const email = document.querySelector("#email");
const errorEmail = document.querySelector("#error-email");
const edat = document.querySelector("#edat");
const errorEdat = document.querySelector("#error-edat");
const genere = document.querySelector("#genere");
const errorGenere = document.querySelector("#error-genere");
const normes = document.querySelector("#normes");
const errorNormes = document.querySelector("#error-normes");


// ===== NOM =====
// Comprova el nom i el pinta de verd o de vermell. Retorna true si és correcte.
function validarNom() {
  if (nom.checkValidity()) {
    errorNom.textContent = "✔ Correcte";
    errorNom.classList.add("ok");
    nom.classList.remove("invalid");
    nom.classList.add("valid");
    return true;
  }
  if (nom.validity.valueMissing) {
    errorNom.textContent = "El nom és obligatori";
  } else if (nom.validity.patternMismatch) {
    errorNom.textContent = "Només lletres i espais (de 2 a 30)";
  }
  errorNom.classList.remove("ok");
  nom.classList.remove("valid");
  nom.classList.add("invalid");
  return false;
}

// ===== CORREU =====
function validarEmail() {
  if (email.checkValidity()) {
    errorEmail.textContent = "✔ Correcte";
    errorEmail.classList.add("ok");
    email.classList.remove("invalid");
    email.classList.add("valid");
    return true;
  }
  if (email.validity.valueMissing) {
    errorEmail.textContent = "El correu és obligatori";
  } else if (email.validity.typeMismatch) {
    errorEmail.textContent = "El correu no té un format correcte";
  }
  errorEmail.classList.remove("ok");
  email.classList.remove("valid");
  email.classList.add("invalid");
  return false;
}

// ===== EDAT =====
function validarEdat() {
  if (edat.checkValidity()) {
    errorEdat.textContent = "✔ Correcte";
    errorEdat.classList.add("ok");
    edat.classList.remove("invalid");
    edat.classList.add("valid");
    return true;
  }
  if (edat.validity.valueMissing) {
    errorEdat.textContent = "L'edat és obligatòria";
  } else if (edat.validity.rangeUnderflow) {
    errorEdat.textContent = "L'edat mínima és 14";
  } else if (edat.validity.rangeOverflow) {
    errorEdat.textContent = "L'edat màxima és 99";
  } else if (edat.validity.stepMismatch) {
    errorEdat.textContent = "L'edat ha de ser un número enter";
  }
  errorEdat.classList.remove("ok");
  edat.classList.remove("valid");
  edat.classList.add("invalid");
  return false;
}

// ===== GÈNERE =====
function validarGenere() {
  if (genere.checkValidity()) {
    errorGenere.textContent = "✔ Correcte";
    errorGenere.classList.add("ok");
    genere.classList.remove("invalid");
    genere.classList.add("valid");
    return true;
  }
  errorGenere.textContent = "Cal triar un gènere";
  errorGenere.classList.remove("ok");
  genere.classList.remove("valid");
  genere.classList.add("invalid");
  return false;
}

// ===== NORMES =====
function validarNormes() {
  if (normes.checkValidity()) {
    errorNormes.textContent = "✔ Correcte";
    errorNormes.classList.add("ok");
    normes.classList.remove("invalid");
    normes.classList.add("valid");
    return true;
  }
  errorNormes.textContent = "Has d'acceptar les normes";
  errorNormes.classList.remove("ok");
  normes.classList.remove("valid");
  normes.classList.add("invalid");
  return false;
}


// ===== ESDEVENIMENT CHANGE: es valida cada camp quan l'usuari en canvia el valor =====
nom.addEventListener("change", validarNom);
email.addEventListener("change", validarEmail);
edat.addEventListener("change", validarEdat);
genere.addEventListener("change", validarGenere);
normes.addEventListener("change", validarNormes);


// ===== ENVIAMENT DEL FORMULARI =====
form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  // Es validen tots els camps (l'usuari pot no haver canviat cap)
  const nomOk = validarNom();
  const emailOk = validarEmail();
  const edatOk = validarEdat();
  const genereOk = validarGenere();
  const normesOk = validarNormes();

  // Focus al primer camp que falla
  if (!nomOk) { nom.focus(); return; }
  if (!emailOk) { email.focus(); return; }
  if (!edatOk) { edat.focus(); return; }
  if (!genereOk) { genere.focus(); return; }
  if (!normesOk) { normes.focus(); return; }

  // Tot correcte
  resultat.textContent = `✔ Benvingut/da al club, ${nom.value.trim()}!`;
  form.reset();

  // Treure els colors i els missatges
  nom.classList.remove("valid");
  errorNom.textContent = "";
  errorNom.classList.remove("ok");
  email.classList.remove("valid");
  errorEmail.textContent = "";
  errorEmail.classList.remove("ok");
  edat.classList.remove("valid");
  errorEdat.textContent = "";
  errorEdat.classList.remove("ok");
  genere.classList.remove("valid");
  errorGenere.textContent = "";
  errorGenere.classList.remove("ok");
  normes.classList.remove("valid");
  errorNormes.textContent = "";
  errorNormes.classList.remove("ok");
});
