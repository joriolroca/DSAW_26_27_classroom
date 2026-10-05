/* Botons "Copiar" dels blocs de codi: copia el contingut del bloc al porta-retalls
   (amb una alternativa per a pàgines obertes directament com a fitxer). */
document.querySelectorAll(".copia").forEach(function (b) {
  b.addEventListener("click", function () {
    var text = document.getElementById(b.dataset.copia).textContent;
    var fet = function () { b.textContent = "Copiat ✔"; setTimeout(function () { b.textContent = "Copiar"; }, 1500); };
    var alternativa = function () {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.append(ta); ta.select();
      try { document.execCommand("copy"); fet(); } catch (e) { b.textContent = "Selecciona-ho i copia-ho a mà"; }
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(fet, alternativa);
    else alternativa();
  });
});
