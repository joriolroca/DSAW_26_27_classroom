const form = document.querySelector("#form-registre");
const resultat = document.querySelector("#resultat");

// Cada camp amb el seu element d'error
const usuari = document.querySelector("#usuari");
const errorUsuari = document.querySelector("#error-usuari");
const email = document.querySelector("#email");
const errorEmail = document.querySelector("#error-email");
const password = document.querySelector("#password");
const errorPassword = document.querySelector("#error-password");
const password2 = document.querySelector("#password2");
const errorPassword2 = document.querySelector("#error-password2");
const condicions = document.querySelector("#condicions");
const errorCondicions = document.querySelector("#error-condicions");


// ===== NOM D'USUARI =====
// Comprova el nom d'usuari i el pinta de verd o de vermell. Retorna true si és correcte.
// Combina condicionals (buit i llargada, amb length) i una expressió regular (els caràcters permesos).
function validarUsuari() {
  const valor = usuari.value;
  let missatge = "";

  if (valor.trim() === "") {
    missatge = "El nom d'usuari és obligatori";
  } else if (valor.length < 3) {
    missatge = "Ha de tenir 3 caràcters com a mínim";
  } else if (valor.length > 15) {
    missatge = "Ha de tenir 15 caràcters com a màxim";
  } else if (!/^\w+$/.test(valor)) {         // expressió regular: només lletres, números i _
    missatge = "Només lletres (sense accents), números i _";
  }

  if (missatge === "") {
    errorUsuari.textContent = "✔ Correcte";
    errorUsuari.classList.add("ok");
    usuari.classList.remove("invalid");
    usuari.classList.add("valid");
    return true;
  }
  errorUsuari.textContent = missatge;
  errorUsuari.classList.remove("ok");
  usuari.classList.remove("valid");
  usuari.classList.add("invalid");
  return false;
}

// ===== CORREU =====
function validarEmail() {
  const correu = email.value.trim();
  let missatge = "";

  if (correu === "") {
    missatge = "El correu és obligatori";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correu)) {   // expressió regular: text@text.text, sense espais
    missatge = "El format del correu no és correcte (nom@exemple.cat)";
  }

  if (missatge === "") {
    errorEmail.textContent = "✔ Correcte";
    errorEmail.classList.add("ok");
    email.classList.remove("invalid");
    email.classList.add("valid");
    return true;
  }
  errorEmail.textContent = missatge;
  errorEmail.classList.remove("ok");
  email.classList.remove("valid");
  email.classList.add("invalid");
  return false;
}

// ===== CONTRASENYA =====
function validarPassword() {
  const valor = password.value;
  let missatge = "";

  if (valor === "") {
    missatge = "La contrasenya és obligatòria";
  } else if (valor.length < 8) {
    missatge = "Ha de tenir 8 caràcters com a mínim";
  } else if (!/\d/.test(valor)) {             // expressió regular: conté algun dígit
    missatge = "Ha de contenir almenys un número";
  }

  if (missatge === "") {
    errorPassword.textContent = "✔ Correcte";
    errorPassword.classList.add("ok");
    password.classList.remove("invalid");
    password.classList.add("valid");
    return true;
  }
  errorPassword.textContent = missatge;
  errorPassword.classList.remove("ok");
  password.classList.remove("valid");
  password.classList.add("invalid");
  return false;
}

// ===== REPETIR CONTRASENYA =====
function validarPassword2() {
  let missatge = "";

  if (password2.value === "") {
    missatge = "Repeteix la contrasenya";
  } else if (password2.value !== password.value) {
    missatge = "Les contrasenyes no coincideixen";
  }

  if (missatge === "") {
    errorPassword2.textContent = "✔ Correcte";
    errorPassword2.classList.add("ok");
    password2.classList.remove("invalid");
    password2.classList.add("valid");
    return true;
  }
  errorPassword2.textContent = missatge;
  errorPassword2.classList.remove("ok");
  password2.classList.remove("valid");
  password2.classList.add("invalid");
  return false;
}

// ===== CONDICIONS =====
function validarCondicions() {
  if (condicions.checked) {
    errorCondicions.textContent = "✔ Correcte";
    errorCondicions.classList.add("ok");
    condicions.classList.remove("invalid");
    condicions.classList.add("valid");
    return true;
  }
  errorCondicions.textContent = "Has d'acceptar les condicions";
  errorCondicions.classList.remove("ok");
  condicions.classList.remove("valid");
  condicions.classList.add("invalid");
  return false;
}


// Quan es canvia la contrasenya, la repetició (si ja té valor) s'ha de tornar a comprovar amb la contrasenya nova
function validarPasswordIRepeticio() {
  validarPassword();
  if (password2.value !== "") validarPassword2();
}


// ===== ESDEVENIMENTS: es valida cada camp amb "blur" (en sortir-ne) i amb "change" (en canviar-lo) =====
usuari.addEventListener("blur", validarUsuari);
usuari.addEventListener("change", validarUsuari);

email.addEventListener("blur", validarEmail);
email.addEventListener("change", validarEmail);

password.addEventListener("blur", validarPasswordIRepeticio);
password.addEventListener("change", validarPasswordIRepeticio);

password2.addEventListener("blur", validarPassword2);
password2.addEventListener("change", validarPassword2);

condicions.addEventListener("blur", validarCondicions);
condicions.addEventListener("change", validarCondicions);


// ===== ENVIAMENT DEL FORMULARI =====
form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  // Es validen tots els camps (l'usuari pot no haver passat per cap)
  const usuariOk = validarUsuari();
  const emailOk = validarEmail();
  const passwordOk = validarPassword();
  const password2Ok = validarPassword2();
  const condicionsOk = validarCondicions();

  // Focus al primer camp que falla
  if (!usuariOk) { usuari.focus(); return; }
  if (!emailOk) { email.focus(); return; }
  if (!passwordOk) { password.focus(); return; }
  if (!password2Ok) { password2.focus(); return; }
  if (!condicionsOk) { condicions.focus(); return; }

  // Tot correcte
  resultat.textContent = `Compte creat. Benvingut/da, ${usuari.value.trim()}.`;
  form.reset();

  // Treure els colors i els missatges
  usuari.classList.remove("valid");
  errorUsuari.textContent = "";
  errorUsuari.classList.remove("ok");
  email.classList.remove("valid");
  errorEmail.textContent = "";
  errorEmail.classList.remove("ok");
  password.classList.remove("valid");
  errorPassword.textContent = "";
  errorPassword.classList.remove("ok");
  password2.classList.remove("valid");
  errorPassword2.textContent = "";
  errorPassword2.classList.remove("ok");
  condicions.classList.remove("valid");
  errorCondicions.textContent = "";
  errorCondicions.classList.remove("ok");
});
