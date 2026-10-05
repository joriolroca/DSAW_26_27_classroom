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

const form = document.querySelector("#form-reserva");
    const errorsFinal = document.querySelector("#errors-final");
    const resultat = document.querySelector("#resultat");
    const preu = document.querySelector("#preu");
    const f = form.elements;
    const camps = [f.nom, f.email, f.telefon, f.entrada, f.sortida, f.habitacio, f.adults, f.nens, f.codi];

    const MAX_NITS = 14;

    // ---- Dates ----
    const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const avui = iso(new Date());
    function diaSeguent(dataIso) {
      const d = new Date(dataIso + "T00:00:00");
      d.setDate(d.getDate() + 1);
      return iso(d);
    }
    function iniciarDates() {
      f.entrada.min = avui;
      f.sortida.min = diaSeguent(avui);
    }
    iniciarDates();

    function nits() {
      if (!f.entrada.value || !f.sortida.value) return 0;
      return Math.round((new Date(f.sortida.value) - new Date(f.entrada.value)) / 86400000);
    }

    // ---- Validació ----
    function validarCamp(camp) {
      camp.setCustomValidity("");
      let personalitzat = "";
      if (camp.id === "telefon" && camp.value && !/^[6-9]\d{8}$/.test(camp.value.trim())) {
        personalitzat = "9 dígits que comencin per 6, 7, 8 o 9";
      } else if (camp.id === "codi" && camp.value.trim() && !/^HOTEL-\d{4}$/.test(camp.value.trim())) {
        personalitzat = "El format és HOTEL- seguit de 4 números (ex. HOTEL-2026)";
      } else if (camp.id === "sortida" && camp.value && f.entrada.value && nits() > MAX_NITS) {
        personalitzat = `L'estada màxima és de ${MAX_NITS} nits`;
      } else if ((camp.id === "adults" || camp.id === "nens") && f.habitacio.value) {
        const cap = Number(f.habitacio.selectedOptions[0].dataset.capacitat);
        const total = Number(f.adults.value) + Number(f.nens.value);
        if (total > cap) personalitzat = `Aquesta habitació només admet ${cap} persona${cap > 1 ? "es" : ""} (n'has indicat ${total})`;
      }
      camp.setCustomValidity(personalitzat);

      const v = camp.validity;
      if (v.valueMissing) return "Aquest camp és obligatori";
      if (v.customError) return personalitzat;
      if (v.typeMismatch) return "El format del correu no és correcte";
      if (v.patternMismatch) return "Només lletres i espais";
      if (v.tooShort) return `Mínim ${camp.minLength} caràcters`;
      if (v.rangeUnderflow) {
        if (camp.id === "entrada") return "La data d'entrada no pot ser anterior a avui";
        if (camp.id === "sortida") return "La sortida ha de ser posterior a l'entrada";
        return `El valor mínim és ${camp.min}`;
      }
      if (v.rangeOverflow) return `El valor màxim és ${camp.max}`;
      if (v.badInput) return "El valor no és vàlid";
      return "";
    }

    function comprovar(camp) {
      const m = validarCamp(camp);
      if (m) mostrarError(camp, m);
      else if (camp.value.trim() !== "" || camp.tagName === "SELECT") mostrarOk(camp);
      else netejarCamp(camp);
      return m;
    }

    // ---- Preu ----
    function calcularPreu() {
      const ok = [f.entrada, f.sortida, f.habitacio].every((c) => validarCamp(c) === "");
      if (!ok) { preu.textContent = "—"; return null; }
      const n = nits();
      const nit = Number(f.habitacio.selectedOptions[0].dataset.preu);
      const descompte = validarCamp(f.codi) === "" && f.codi.value.trim() !== "";
      const total = n * nit * (descompte ? 0.9 : 1);
      const text = `${total.toFixed(2).replace(".", ",")} € (${n} nit${n > 1 ? "s" : ""}${descompte ? ", amb 10 % de descompte" : ""})`;
      preu.textContent = text;
      return { n, total: text };
    }

    // ---- Esdeveniments ----
    const dependents = [f.habitacio, f.adults, f.nens];
    camps.forEach((camp) => {
      const sortida = camp.tagName === "SELECT" || camp.type === "date" ? "change" : "blur";
      camp.addEventListener(sortida, () => { camp.dataset.tocat = "1"; comprovar(camp); });
      camp.addEventListener("input", () => {
        if (camp.classList.contains("invalid")) comprovar(camp);
      });
      camp.addEventListener("change", () => {
        if (dependents.includes(camp)) dependents.forEach((c) => { if (c.dataset.tocat) comprovar(c); });
        if (camp === f.entrada && f.entrada.value) {
          f.sortida.min = diaSeguent(f.entrada.value);
          if (f.sortida.value) comprovar(f.sortida);
        }
        if (camp === f.sortida && f.entrada.dataset.tocat) comprovar(f.entrada);
        calcularPreu();
      });
      camp.addEventListener("input", calcularPreu);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      resultat.textContent = "";
      const errors = [];
      camps.forEach((camp) => {
        camp.dataset.tocat = "1";
        const m = comprovar(camp);
        if (m) {
          const nomCamp = form.querySelector(`label[for="${camp.id}"]`).textContent.trim();
          errors.push({ camp, missatge: `${nomCamp}: ${m}` });
        }
      });
      pintarLlista(errorsFinal, errors, textErrors(errors.length));
      if (errors.length > 0) { errors[0].camp.focus(); return; }

      const p = calcularPreu();
      resultat.textContent = `Reserva confirmada per a ${f.nom.value.trim()}: del ${f.entrada.value} al ${f.sortida.value}, ${p.n} nit${p.n > 1 ? "s" : ""}. Total: ${p.total}.`;
      form.reset();
      camps.forEach((c) => { delete c.dataset.tocat; netejarCamp(c); });
      iniciarDates();
      preu.textContent = "—";
    });
