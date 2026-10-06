/* Tema clar/fosc compartit per les pàgines i per les demos (iframes). */
(function () {
  var root = document.documentElement;
  var esFrame = window.parent !== window;

  function guardat() { try { return localStorage.getItem("tema"); } catch (e) { return null; } }
  function guarda(t) { try { localStorage.setItem("tema", t); } catch (e) { /* res */ } }
  function actual() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  function actualitzaBoto() {
    var b = document.getElementById("tema-toggle");
    if (b) b.textContent = actual() === "dark" ? "☀️ Mode clar" : "🌙 Mode fosc";
  }

  var inicial = guardat();
  if (inicial) root.setAttribute("data-theme", inicial);

  window.addEventListener("message", function (e) {
    var d = e.data || {};
    if (esFrame && d.tema) { root.setAttribute("data-theme", d.tema); return; }
    if (!esFrame && d.demoReady) { e.source.postMessage({ tema: actual() }, "*"); return; }
    if (!esFrame && d.altura) {
      var fr = document.querySelectorAll("iframe");
      for (var i = 0; i < fr.length; i++) {
        if (fr[i].contentWindow === e.source) fr[i].style.height = (d.altura + 4) + "px";
      }
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    var b = document.getElementById("tema-toggle");
    if (b) {
      actualitzaBoto();
      b.addEventListener("click", function () {
        var nou = actual() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", nou);
        guarda(nou);
        actualitzaBoto();
        var fr = document.querySelectorAll("iframe");
        for (var i = 0; i < fr.length; i++) fr[i].contentWindow.postMessage({ tema: nou }, "*");
      });
    }
    if (esFrame) {
      parent.postMessage({ demoReady: 1 }, "*");
      if (window.ResizeObserver) {
        new ResizeObserver(function () {
          // Es mesura el cos de la pàgina (no l'html, que mai és més petit que l'iframe): així l'iframe pot créixer i també encongir-se
          parent.postMessage({ altura: Math.ceil(document.body.getBoundingClientRect().height) }, "*");
        }).observe(document.body);
      }
    }
  });
})();
