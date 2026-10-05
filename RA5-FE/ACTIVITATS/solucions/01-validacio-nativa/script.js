// Només per a la demo: en lloc de recarregar la pàgina, mostra que l'enviament seria correcte.
    document.querySelector("#f").addEventListener("submit", (e) => {
      e.preventDefault();
      document.querySelector("#resultat").textContent = "✔ Formulari vàlid: el navegador l'hauria enviat.";
    });
