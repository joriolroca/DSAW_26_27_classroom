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

const form = document.querySelector("#form-contacte");
    const resum = document.querySelector("#resum-errors");
    const resultat = document.querySelector("#resultat");
    const blocTelefon = document.querySelector("#bloc-telefon");
    const telefon = form.elements.telefon;
    const comptador = document.querySelector("#comptador");
    const missatgeCamp = form.elements.missatge;
    const radios = form.querySelectorAll('input[name="via"]');
    const primerRadio = radios[0];

    // Errors que ara mateix es mostren (camp -> missatge), per poder-los treure del resum un a un
    const errorsMostrats = new Map();

    function missatgeDe(camp) {
      switch (camp.id) {
        case "nom":
          if (camp.value.trim() === "") return "El nom i els cognoms són obligatoris";
          if (camp.value.trim().length < 3) return "El nom ha de tenir 3 caràcters com a mínim";
          return "";
        case "email":
          if (camp.value.trim() === "") return "El correu és obligatori";
          if (camp.validity.typeMismatch) return "El format del correu no és correcte";
          return "";
        case "assumpte":
          return camp.value === "" ? "Cal triar un assumpte" : "";
        case "via-correu":
          return form.elements.via.value === "" ? "Cal triar com vols que et contactem" : "";
        case "telefon":
          if (camp.disabled) return "";
          if (camp.value.trim() === "") return "El telèfon és obligatori";
          if (!/^\d{9}$/.test(camp.value.trim())) return "El telèfon ha de tenir 9 dígits";
          return "";
        case "missatge": {
          const n = camp.value.trim().length;
          if (n === 0) return "El missatge és obligatori";
          if (n < 20) return `El missatge ha de tenir 20 caràcters com a mínim (ara en té ${n})`;
          return "";
        }
      }
      return "";
    }

    const campsValidables = () => [form.elements.nom, form.elements.email, form.elements.assumpte,
                                   primerRadio, telefon, missatgeCamp];

    function aplicar(camp, m) {
      if (m) { mostrarError(camp, m); errorsMostrats.set(camp, m); }
      else { netejarCamp(camp); errorsMostrats.delete(camp); }
    }

    function renderResum() {
      const errors = [...errorsMostrats].map(([camp, missatge]) => ({ camp, missatge }));
      pintarLlista(resum, errors, textErrors(errors.length));
    }

    // Quan es corregeix un camp, desapareix el seu error i s'actualitza el resum
    function corregir(camp) {
      if (errorsMostrats.has(camp)) { aplicar(camp, missatgeDe(camp)); renderResum(); }
    }
    ["nom", "email", "assumpte", "telefon", "missatge"].forEach((id) => {
      const camp = form.elements[id];
      camp.addEventListener("input", () => corregir(camp));
      camp.addEventListener("change", () => corregir(camp));
    });
    radios.forEach((r) => r.addEventListener("change", () => {
      corregir(primerRadio);
      const volTelefon = form.elements.via.value === "telefon";
      blocTelefon.hidden = !volTelefon;
      telefon.disabled = !volTelefon;
      if (!volTelefon) { telefon.value = ""; aplicar(telefon, ""); renderResum(); }
    }));

    missatgeCamp.addEventListener("input", () => {
      comptador.textContent = `${missatgeCamp.value.length} / 300`;
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      resultat.textContent = "";
      errorsMostrats.clear();
      campsValidables().forEach((camp) => aplicar(camp, missatgeDe(camp)));
      if (errorsMostrats.size > 0) {
        renderResum();
        [...errorsMostrats.keys()][0].focus();      // focus al primer camp erroni
        return;
      }
      renderResum();
      resultat.textContent = `Gràcies, ${form.elements.nom.value.trim()}. Hem rebut el teu missatge sobre «${form.elements.assumpte.selectedOptions[0].text}».`;
      form.reset();
      comptador.textContent = "0 / 300";
      blocTelefon.hidden = true;
      telefon.disabled = true;
    });
