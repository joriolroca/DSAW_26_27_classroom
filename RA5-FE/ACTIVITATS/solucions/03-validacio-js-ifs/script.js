// ===== ELEMENTS PRINCIPALS =====
const form = document.querySelector("#form-registre");
const resultat = document.querySelector("#resultat");
// Tots els camps del formulari (inputs), en un array perquè es puguin recórrer amb forEach / filter.
const camps = [...form.querySelectorAll("input")];

const CARACTERS_PERMESOS = "abcdefghijklmnopqrstuvwxyz0123456789_";
const XIFRES = "0123456789";


// ===== FUNCIONS AUXILIARS (comproven un text caràcter a caràcter) =====
// Cert si TOTS els caràcters del text són lletres (sense accents), números o _
function nomesCaractersPermesos(text) {
  for (const caracter of text.toLowerCase()) {
    if (!CARACTERS_PERMESOS.includes(caracter)) return false;
  }
  return true;
}

// Cert si el text conté AL MENYS un número
function teUnNumero(text) {
  for (const caracter of text) {
    if (XIFRES.includes(caracter)) return true;
  }
  return false;
}


// ===== 1. VALIDAR UN CAMP =====
// Retorna el missatge d'error del camp o "" si és correcte. Només ifs i mètodes de text.
function validarCamp(camp) {
  const valor = camp.value;

  if (camp.id === "usuari") {
    if (valor.trim() === "") return "El nom d'usuari és obligatori";
    if (valor.length < 3) return "Ha de tenir 3 caràcters com a mínim";
    if (valor.length > 15) return "Ha de tenir 15 caràcters com a màxim";
    if (!nomesCaractersPermesos(valor)) return "Només lletres (sense accents), números i _";
  }

  if (camp.id === "email") {
    const correu = valor.trim();
    if (correu === "") return "El correu és obligatori";
    const posicioArroba = correu.indexOf("@");
    if (posicioArroba < 1 || posicioArroba !== correu.lastIndexOf("@")) {
      return "El correu ha de tenir una sola @ i text abans";
    }
    const domini = correu.slice(posicioArroba + 1);   // el que hi ha després de l'@
    if (correu.includes(" ") || !domini.includes(".") || domini.startsWith(".") || domini.endsWith(".")) {
      return "El domini ha de ser del tipus exemple.cat";
    }
  }

  if (camp.id === "password") {
    if (valor === "") return "La contrasenya és obligatòria";
    if (valor.length < 8) return "Ha de tenir 8 caràcters com a mínim";
    if (!teUnNumero(valor)) return "Ha de contenir almenys un número";
  }

  if (camp.id === "password2") {
    if (valor === "") return "Repeteix la contrasenya";
    if (valor !== form.elements.password.value) return "Les contrasenyes no coincideixen";
  }

  if (camp.id === "condicions") {
    if (!camp.checked) return "Has d'acceptar les condicions";
  }

  return "";
}


// ===== 2. MOSTRAR L'ESTAT D'UN CAMP =====
function mostrarError(camp, missatge) {
  const error = document.querySelector("#error-" + camp.id);
  error.textContent = missatge;
  error.classList.remove("ok");
  camp.classList.add("invalid");
  camp.classList.remove("valid");
  camp.setAttribute("aria-invalid", "true");
}

function mostrarCorrecte(camp) {
  const error = document.querySelector("#error-" + camp.id);
  error.textContent = "✔ Correcte";
  error.classList.add("ok");
  camp.classList.remove("invalid");
  camp.classList.add("valid");
  camp.setAttribute("aria-invalid", "false");
}

function netejarError(camp) {
  const error = document.querySelector("#error-" + camp.id);
  error.textContent = "";
  error.classList.remove("ok");
  camp.classList.remove("invalid", "valid");
  camp.removeAttribute("aria-invalid");
}

// Valida un camp i en mostra el resultat. Retorna el missatge ("" si és correcte).
function comprovar(camp) {
  const missatge = validarCamp(camp);
  if (missatge) mostrarError(camp, missatge);
  else mostrarCorrecte(camp);
  return missatge;
}


// ===== 3. ESDEVENIMENTS PER CAMP (estratègia combinada) =====
camps.forEach((camp) => {
  // En sortir del camp (a la casella, en canviar-la)
  const quan = camp.type === "checkbox" ? "change" : "blur";
  camp.addEventListener(quan, () => comprovar(camp));

  // Mentre s'escriu: només es torna a validar si ja té error, perquè desaparegui en corregir-lo
  camp.addEventListener("input", () => {
    if (camp.classList.contains("invalid")) comprovar(camp);
    // Si canvia la contrasenya, la repetició s'ha de tornar a comprovar
    if (camp.id === "password" && form.elements.password2.value !== "") comprovar(form.elements.password2);
  });
});


// ===== 4. ENVIAMENT DEL FORMULARI =====
form.addEventListener("submit", (event) => {
  event.preventDefault();
  resultat.textContent = "";

  // Es validen TOTS els camps, també els que l'usuari no ha tocat
  const errors = camps.filter((camp) => comprovar(camp) !== "");

  if (errors.length > 0) {
    errors[0].focus();                 // focus al primer camp erroni (no s'esborra res del que s'ha escrit)
    return;
  }

  resultat.textContent = `Compte creat. Benvingut/da, ${form.elements.usuari.value.trim()}.`;
  form.reset();
  camps.forEach(netejarError);
});
