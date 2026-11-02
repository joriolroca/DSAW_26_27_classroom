/* ==========================================================================
   ENDEVINA EL FETCH
   Cada fragment és dins d'una funció. La pàgina mostra el contingut de cada
   una (el codi del fragment, sense la funció que l'embolcalla) i l'executa
   amb el botó Executa. També es poden executar des de la consola:
   fragment1(), fragment2()...
   Bloc 1: peticions als fitxers de la carpeta dades/.
     lletra.json    { "lletra": "Z" }
     lletres.json   { "lletres": ["X", "Y", "Z"] }
   Bloc 2 i repte: peticions a PokéAPI (https://pokeapi.co/api/v2/), una API
   pública que no necessita registre. Necessiten connexió a internet.
   El fragment 10 fa la petició a pokeapi.invalid, un domini que no existeix.
   Cal obrir la pàgina amb Live Server: fetch no funciona amb file://.
   No has de modificar aquest fitxer.
   ========================================================================== */


/* --------------------------------------------------------------------------
   BLOC 1. LLEGIR UN FITXER JSON
   -------------------------------------------------------------------------- */

// Fragment 1. Què retorna fetch?
const fragment1 = function () {
  const promesa = fetch("dades/lletra.json");

  console.log(promesa);
};


// Fragment 2. Els dos await
const fragment2 = function () {
  const carregar = async function () {
    const resposta = await fetch("dades/lletra.json");
    const dades = await resposta.json();

    console.log(dades);
    console.log(dades.lletra);
  };

  carregar();
};


// Fragment 3. Un JSON amb una llista
const fragment3 = function () {
  const carregar = async function () {
    const resposta = await fetch("dades/lletres.json");
    const dades = await resposta.json();

    console.log(dades.lletres.length);
    console.log(dades.lletres[0]);
    console.log(dades.lletres.join(""));
  };

  carregar();
};


/* --------------------------------------------------------------------------
   BLOC 2. CONSULTAR UN ENDPOINT
   -------------------------------------------------------------------------- */

// Fragment 4. La resposta
const fragment4 = function () {
  const consultar = async function () {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");

    console.log(resposta.ok);
    console.log(resposta.status);
  };

  consultar();
};


// Fragment 5. Els dos await amb dades reals
const fragment5 = function () {
  const consultar = async function () {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemon = await resposta.json();

    console.log(pokemon.name);
    console.log(pokemon.id);
  };

  consultar();
};


// Fragment 6. Un await oblidat
const fragment6 = function () {
  const consultar = async function () {
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemon = resposta.json();

    console.log(pokemon);
    console.log(pokemon.name);
  };

  consultar();
};


// Fragment 7. La pàgina no s'atura
const fragment7 = function () {
  const consultar = async function () {
    console.log("B");
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemon = await resposta.json();
    console.log(pokemon.name);
  };

  console.log("A");
  consultar();
  console.log("C");
};


// Fragment 8. Un recurs que no existeix
const fragment8 = function () {
  const consultar = async function () {
    try {
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/noexisteix");
      console.log(resposta.ok);
      console.log(resposta.status);
    } catch (error) {
      console.log("A");
    }
  };

  consultar();
};


// Fragment 9. Comprovar ok
const fragment9 = function () {
  const consultar = async function () {
    try {
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/noexisteix");
      if (!resposta.ok) {
        throw new Error(`Error ${resposta.status}`);
      }
      console.log("A");
    } catch (error) {
      console.log(error.message);
    }
  };

  consultar();
};


// Fragment 10. Un servidor que no existeix
const fragment10 = function () {
  const consultar = async function () {
    try {
      console.log("A");
      const resposta = await fetch("https://pokeapi.invalid/api/v2/pokemon/pikachu");
      console.log("B", resposta.status);
    } catch (error) {
      console.log("C", error.name);
    }
    console.log("D");
  };

  consultar();
};


// Fragment 11. El patró complet: ok, status i finally
const fragment11 = function () {
  const consultar = async function () {
    try {
      console.log("B");
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
      if (!resposta.ok) {
        throw new Error(`C ${resposta.status}`);
      }
      console.log("D", resposta.ok, resposta.status);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("E");
    }
  };

  console.log("A");
  consultar();
  console.log("F");
};


// Fragment 12. Una variable fora de la funció
const fragment12 = function () {
  let nom = "desconegut";

  const consultar = async function () {
    try {
      console.log("B", nom);
      const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
      console.log("C", nom);
      if (!resposta.ok) {
        throw new Error(`D ${resposta.status}`);
      }
      const pokemon = await resposta.json();
      nom = pokemon.name;
      console.log("E", nom);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("F", nom);
    }
  };

  console.log("A", nom);
  consultar();
  console.log("G", nom);
};


// Fragment 13. Cridar la funció dues vegades
const fragment13 = function () {
  const consultar = async function (nomPokemon) {
    try {
      console.log("C", nomPokemon);
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomPokemon}`);
      if (!resposta.ok) {
        throw new Error(`D ${resposta.status}`);
      }
      const pokemon = await resposta.json();
      console.log("E", pokemon.id);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("F", nomPokemon);
    }
  };

  const provar = async function () {
    console.log("B");
    await consultar("pikachu");
    await consultar("bulbasaur");
    console.log("G");
  };

  console.log("A");
  provar();
  console.log("H");
};


// Fragment 14. El mateix amb then
const fragment14 = function () {
  console.log("A");

  fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error(`B ${resposta.status}`);
      }
      return resposta.json();
    })
    .then((pokemon) => console.log("C", pokemon.name))
    .catch((error) => console.log(error.message))
    .finally(() => console.log("D"));

  console.log("E");
};


/* --------------------------------------------------------------------------
   REPTE (opcional). PARÀMETRES A LA URL
   -------------------------------------------------------------------------- */

// Fragment 15. Una llista i les dades de cada element
const fragment15 = function () {
  // Retorna la llista de pokémon: el nom i la url de cada un
  const consultarLlista = async function (quantitat) {
    const parametres = new URLSearchParams({ limit: quantitat, offset: 0 });
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?${parametres}`);
    if (!resposta.ok) {
      throw new Error(`Error ${resposta.status}`);
    }
    const dades = await resposta.json();
    return dades.results;
  };

  // Retorna les dades d'un pokémon a partir de la url del seu endpoint
  const consultarDades = async function (url) {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Error ${resposta.status}`);
    }
    return resposta.json();
  };

  const provar = async function () {
    try {
      const llista = await consultarLlista(2);
      const primer = await consultarDades(llista[0].url);
      const segon = await consultarDades(llista[1].url);

      console.log("A", primer.name, primer.id);
      console.log("B", segon.name, segon.id);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("C");
    }
  };

  provar();
};
