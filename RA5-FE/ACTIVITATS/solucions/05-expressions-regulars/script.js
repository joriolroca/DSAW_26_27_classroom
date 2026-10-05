/* Funcions comunes de les demos (mostrar/esborrar errors i llista d'errors amb enllaços). */
function errEl(camp) {
  return document.querySelector("#error-" + (camp.type === "radio" ? "via" : camp.id));
}

function mostrarError(camp, missatge) {
  const e = errEl(camp);
  e.textContent = missatge;
  e.classList.remove("ok");
  camp.classList.add("invalid");
  camp.classList.remove("valid");
  camp.setAttribute("aria-invalid", "true");
}

function mostrarOk(camp) {
  const e = errEl(camp);
  e.textContent = "✔ Correcte";
  e.classList.add("ok");
  camp.classList.remove("invalid");
  camp.classList.add("valid");
  camp.setAttribute("aria-invalid", "false");
}

function netejarCamp(camp) {
  const e = errEl(camp);
  if (e) { e.textContent = ""; e.classList.remove("ok"); }
  camp.classList.remove("invalid", "valid");
  camp.removeAttribute("aria-invalid");
}

/* Pinta una llista d'errors [{camp, missatge}] amb enllaços que fan focus() al camp. */
function pintarLlista(contenidor, errors, titol) {
  contenidor.innerHTML = "";
  if (errors.length === 0) { contenidor.classList.remove("visible"); return; }
  const t = document.createElement("strong");
  t.textContent = titol;
  const ul = document.createElement("ul");
  errors.forEach(({ camp, missatge }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + camp.id;
    a.textContent = missatge;
    a.addEventListener("click", (ev) => { ev.preventDefault(); camp.focus(); });
    li.append(a);
    ul.append(li);
  });
  contenidor.append(t, ul);
  contenidor.classList.add("visible");
}

function textErrors(n) {
  return n === 1 ? "Hi ha 1 error al formulari:" : `Hi ha ${n} errors al formulari:`;
}

const form = document.querySelector("#form-comanda");
    const errorsFinal = document.querySelector("#errors-final");
    const resultat = document.querySelector("#resultat");

    const regles = {
      nom:      { regex: /^[\p{L}'-]+(\s+[\p{L}'-]+)+$/u, missatge: "Escriu el nom i almenys un cognom, només amb lletres" },
      cp:       { regex: /^\d{5}$/,                        missatge: "El codi postal ha de tenir exactament 5 dígits" },
      telefon:  { regex: /^(\+34 ?)?[67]\d{8}$/,           missatge: "9 dígits que comencin per 6 o 7 (prefix +34 opcional)" },
      dni:      { regex: /^\d{8}[A-Z]$/,                  missatge: "El DNI són 8 números i una lletra majúscula" },
      email:    { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,    missatge: "El format del correu no és correcte" }
    };
    const camps = [...form.querySelectorAll("input")];

    function validarCamp(camp) {
      const valor = camp.value.trim();
      if (valor === "") return "Aquest camp és obligatori";
      const regla = regles[camp.name];
      if (!regla.regex.test(valor)) return regla.missatge;
      if (camp.name === "dni") {
        const lletres = "TRWAGMYFPDXBNJZSQVHLCKE";
        if (valor[8] !== lletres[Number(valor.slice(0, 8)) % 23]) return "La lletra del DNI no és correcta";
      }
      return "";
    }

    function actualitzar(camp) {
      const m = validarCamp(camp);
      const marca = document.querySelector("#marca-" + camp.id);
      const error = document.querySelector("#error-" + camp.id);
      error.textContent = m;
      camp.classList.toggle("invalid", m !== "");
      camp.classList.toggle("valid", m === "");
      camp.setAttribute("aria-invalid", m !== "");
      marca.textContent = m === "" ? "✔" : "✖";
      marca.classList.remove("ok", "ko");
      marca.classList.add(m === "" ? "ok" : "ko");
      return m;
    }

    camps.forEach((camp) => {
      // No es mostra cap marca fins que l'usuari surt del camp una vegada
      camp.addEventListener("blur", () => { camp.dataset.tocat = "1"; actualitzar(camp); });
      camp.addEventListener("input", () => { if (camp.dataset.tocat) actualitzar(camp); });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      resultat.textContent = "";
      const errors = [];
      camps.forEach((camp) => {
        camp.dataset.tocat = "1";
        const m = actualitzar(camp);
        if (m) errors.push({ camp, missatge: `${form.querySelector(`label[for="${camp.id}"]`).childNodes[0].textContent.trim()}: ${m}` });
      });
      pintarLlista(errorsFinal, errors, textErrors(errors.length));
      if (errors.length > 0) { errors[0].camp.focus(); return; }

      resultat.textContent = `Comanda confirmada per a ${form.elements.nom.value.trim()} (CP ${form.elements.cp.value}, tel. ${form.elements.telefon.value.trim()}).`;
      form.reset();
      camps.forEach((camp) => {
        delete camp.dataset.tocat;
        netejarCamp(camp);
        const marca = document.querySelector("#marca-" + camp.id);
        marca.textContent = ""; marca.classList.remove("ok", "ko");
      });
    });
