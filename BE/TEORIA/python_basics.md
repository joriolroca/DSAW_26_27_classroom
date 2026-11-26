# Python bàsic

> Aquest document és un **repàs** de la sintaxi de Python que es fa servir a tot el mòdul. Es dona per fet que ja sabeu programar en Java: l'objectiu és veure com s'escriu en Python el que ja coneixeu.
>
> És la base de la RA2 (sentències, tipus, operadors) i de la RA3 (estructures de control, col·leccions i funcions).

## Índex

1. [Diferències principals amb Java](#1-diferències-principals-amb-java)
2. [Variables i tipus de dades](#2-variables-i-tipus-de-dades)
3. [Operadors](#3-operadors)
4. [Text: concatenació i f-strings](#4-text-concatenació-i-f-strings)
5. [Condicionals: `if`, `elif`, `else`](#5-condicionals-if-elif-else)
6. [Bucles: `for` i `while`](#6-bucles-for-i-while)
7. [Llistes (`list`)](#7-llistes-list)
8. [Tuples (`tuple`)](#8-tuples-tuple)
9. [Diccionaris (`dict`)](#9-diccionaris-dict)
10. [Funcions](#10-funcions)
11. [Àmbit de les variables](#11-àmbit-de-les-variables)
12. [Comentaris i docstrings](#12-comentaris-i-docstrings)
13. [Programació orientada a objectes (POO)](#13-programació-orientada-a-objectes-poo)
14. [Errors habituals](#14-errors-habituals)
15. [Prompts per practicar a casa amb IA](#15-prompts-per-practicar-a-casa-amb-ia)

---

## 1. Diferències principals amb Java

| Java | Python |
|---|---|
| Els blocs van entre `{ }` | Els blocs es marquen amb **`:`** i **indentació** (4 espais) |
| Cada sentència acaba amb `;` | No cal `;` |
| Cal declarar el tipus: `int edat = 23;` | El tipus es dedueix del valor: `edat = 23` |
| `&&`, `\|\|`, `!` | `and`, `or`, `not` |
| `true`, `false`, `null` | `True`, `False`, `None` (amb majúscula) |
| `// comentari` | `# comentari` |
| `new Producte("Teclat")` | `Producte("Teclat")` (sense `new`) |
| `this` | `self` |

> **La indentació no és opcional.** A Java és només estètica; a Python és el que indica quines línies són dins d'un `if`, d'un `for` o d'una funció. Si no està ben indentat, Python dona `IndentationError`.

---

## 2. Variables i tipus de dades

Python és de **tipatge dinàmic**: no cal declarar el tipus, es dedueix del valor assignat.

```python
nom = "Marta"             # str
edat = 23                 # int
preu = 19.99              # float
actiu = True              # bool
res = None                # NoneType (equivalent a null)
etiquetes = ["python", "django", "web"]   # list  (equivalent a array/ArrayList)
coordenades = (41.38, 2.17)               # tuple (llista que no es pot modificar)
persona = {"nom": "Marta", "edat": 23}    # dict  (equivalent a Map/HashMap)
```

| Java | Python | Exemple |
|---|---|---|
| `int`, `double` | `int`, `float` | `edat = 23` |
| `String` | `str` | `nom = "Marta"` |
| `boolean` | `bool` | `actiu = True` |
| `null` | `None` | `res = None` |
| `ArrayList<T>` | `list` | `["a", "b", "c"]` |
| — (array immutable) | `tuple` | `(1, 2)` |
| `HashMap<K,V>` | `dict` | `{"clau": "valor"}` |

### Conversió de tipus

```python
int("23")        # 23      (de text a enter)
float("19.99")   # 19.99
str(23)          # "23"    (d'enter a text)
type(edat)       # <class 'int'>  (saber el tipus d'una variable)
```

---

## 3. Operadors

```python
# Aritmètics
suma = 5 + 3
divisio_real = 7 / 2          # 3.5
divisio_entera = 7 // 2       # 3  (equivalent a / entre int a Java)
residu = 7 % 2                # 1
potencia = 2 ** 3             # 8
arrodonit = round(30.2512, 2)  # 30.25 (arrodonir a 2 decimals)

# Assignació
total = 0
total = total + 5
total += 5                    # equivalent a l'anterior

# Comparació
a == b      # igualtat de valor
a != b      # diferent
a > b
a >= b

# Lògics (paraules, no símbols com a Java)
actiu and edat >= 18
actiu or edat < 18
not actiu

# Pertinença
"django" in etiquetes         # True si l'element és a la llista
"nom" in persona              # True si la clau és al diccionari
```

> **Compte amb `=` i `==`:** `=` assigna un valor; `==` compara. `stock["Monitor"] = 5` afegeix la clau; `stock["Monitor"] == 5` només compara i no canvia res.

---

## 4. Text: concatenació i f-strings

```python
nom = "Marta"
quantitat = 3

# Concatenar textos amb +
salutacio = "Hola " + nom

# Un número no es pot concatenar directament amb un text
missatge = "Tens " + quantitat + " productes"         # TypeError
missatge = "Tens " + str(quantitat) + " productes"    # Correcte

# f-string: la manera recomanada (equivalent a String.format de Java)
missatge = f"Tens {quantitat} productes"
missatge = f"{nom} té {quantitat * 2} punts"          # dins de { } hi pot anar qualsevol expressió
```

Les f-strings es fan servir a tot el curs, per exemple al mètode `__str__` dels models.

---

## 5. Condicionals: `if`, `elif`, `else`

```python
edat = 20

if edat < 12:
    print("Infant")
elif edat < 18:            # equivalent a "else if" de Java
    print("Adolescent")
else:
    print("Adult")
```

- Cada condició acaba amb **`:`**.
- No cal posar parèntesis a la condició.
- El bloc de cada branca va **indentat**.

---

## 6. Bucles: `for` i `while`

### `for`: recórrer una col·lecció

A Python, el `for` sempre recorre els elements d'una col·lecció (és com el *for-each* de Java):

```python
productes = ["Teclat", "Ratolí", "Monitor"]

for producte in productes:
    print(producte)
```

### `for` amb números: `range()`

Per repetir un nombre de vegades, com el `for (int i = 0; i < 5; i++)` de Java:

```python
for i in range(5):         # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):      # 1, 2, 3, 4, 5  (el límit superior NO s'inclou)
    print(i)
```

### `while`: repetir mentre es compleixi una condició

```python
intents = 0
while intents < 3:
    print(f"Intent {intents}")
    intents += 1            # A Python no existeix intents++
```

### `break` i `continue`

```python
for producte in productes:
    if producte == "Ratolí":
        continue            # salta a la següent volta
    if producte == "Monitor":
        break               # surt del bucle
    print(producte)
```

---

## 7. Llistes (`list`)

Una llista és una col·lecció **ordenada i modificable**. És l'equivalent a l'`ArrayList` de Java.

```python
productes = ["Teclat", "Ratolí", "Monitor"]

# Accedir per índex (comença per 0)
primer = productes[0]          # "Teclat"
ultim = productes[-1]          # "Monitor" (els índexs negatius compten des del final)
productes[1] = "Ratolí USB"    # modificar un element

# Trossos (slicing): [inici:fi], el fi no s'inclou
productes[0:2]                 # ["Teclat", "Ratolí USB"]
productes[:2]                  # els 2 primers

# Afegir i eliminar
productes.append("Altaveus")       # afegir al final
productes.insert(0, "Cable")       # afegir a la posició 0
productes.remove("Monitor")        # eliminar per valor
del productes[0]                   # eliminar per índex

# Altres operacions
total = len(productes)             # mida
existeix = "Teclat" in productes   # True / False

# Recórrer
for p in productes:
    print(p)
```

> Si s'accedeix a un índex que no existeix (`productes[10]`), Python dona `IndexError`.

> Els `QuerySet` de Django es comporten com una `list`: es poden recórrer amb `for`, mesurar amb `len()` o `.count()` i accedir per índex.

---

## 8. Tuples (`tuple`)

Una tupla és com una llista però **no es pot modificar** un cop creada. Es fa servir per a dades fixes.

```python
coordenades = (41.38, 2.17)

# Accedir per índex, igual que una llista
latitud = coordenades[0]       # 41.38

# No es pot modificar
coordenades[0] = 40.0          # TypeError

# Desempaquetar: assignar cada element a una variable
latitud, longitud = coordenades
```

A Django les tuples surten, per exemple, a les opcions dels formularis:

```python
OPCIONS_ROL = [
    ('alumne', 'Alumne'),           # cada opció és una tupla (valor, text)
    ('professor', 'Professor'),
]
```

---

## 9. Diccionaris (`dict`)

Un diccionari guarda parelles **clau → valor**. És l'equivalent al `HashMap` de Java.

```python
stock = {"Teclat": 12, "Ratolí": 30}

# Accedir per clau
stock["Teclat"]                    # 12
stock["Monitor"]                   # KeyError: la clau no existeix

# Accedir amb get(): no falla si la clau no existeix
stock.get("Monitor")               # None
stock.get("Monitor", 0)            # 0 (valor per defecte)

# Afegir o modificar
stock["Monitor"] = 5               # si la clau no existeix, s'afegeix
stock["Teclat"] = 15               # si existeix, es modifica

# Eliminar
del stock["Ratolí"]

# Comprovar si existeix una clau
"Teclat" in stock                  # True

# Recórrer
for nom_producte in stock:                    # només les claus
    print(nom_producte)

for nom_producte, quantitat in stock.items(): # claus i valors alhora
    print(nom_producte, quantitat)

stock.keys()       # totes les claus
stock.values()     # tots els valors
```

> Molts objectes de Django es fan servir com un diccionari: el context de `render()`, `request.POST`, `request.GET`, `request.session` i `form.cleaned_data`. Per això s'hi accedeix amb `.get('clau', valor_per_defecte)`.

---

## 10. Funcions

```python
def calcular_iva(preu, iva=21):        # iva té un valor per defecte
    return preu * (1 + iva / 100)

calcular_iva(100)          # 121.0   (fa servir iva=21)
calcular_iva(100, 10)      # 110.0
calcular_iva(preu=100, iva=4)   # també es poden passar pel nom
```

- Es defineixen amb `def` i acaben amb `:`.
- No cal indicar el tipus dels paràmetres ni el del retorn.
- Si una funció no fa `return`, retorna `None`.

---

## 11. Àmbit de les variables

```python
total = 0   # variable global

def sumar(a, b):
    resultat = a + b   # variable local: només existeix dins la funció
    return resultat

print(sumar(2, 3))     # 5
print(resultat)        # NameError: 'resultat' no existeix fora de la funció
```

Una variable s'ha d'haver creat abans de llegir-la:

```python
def calcular_total(preus):
    for p in preus:
        total = total + p      # UnboundLocalError: es llegeix 'total' abans de crear-la
    return total

def calcular_total(preus):
    total = 0                  # Correcte: s'inicialitza abans del bucle
    for p in preus:
        total = total + p
    return total
```

---

## 12. Comentaris i docstrings

```python
# Comentari d'una sola línia

"""
Comentari (o docstring) de diverses línies.
S'usa sovint just sota una funció per documentar què fa.
"""

def calcular_iva(preu):
    """Retorna el preu amb el 21% d'IVA aplicat."""
    return preu * 1.21
```

---

## 13. Programació orientada a objectes (POO)

### Definir una classe i crear-ne objectes

```python
class Producte:

    def __init__(self, nom, preu):       # constructor
        self.nom = nom                   # atributs de l'objecte
        self.preu = preu

    def preu_amb_iva(self):              # mètode
        return self.preu * 1.21

    def __str__(self):                   # com es mostra l'objecte com a text
        return f"{self.nom} ({self.preu} €)"


# Crear objectes (sense "new")
teclat = Producte("Teclat", 25)
ratoli = Producte("Ratolí", 10)

teclat.nom               # "Teclat"
teclat.preu_amb_iva()    # 30.25
print(teclat)            # Teclat (25 €)  → crida __str__
```

| Java | Python |
|---|---|
| Constructor amb el nom de la classe | `def __init__(self, ...)` |
| `this.nom = nom;` | `self.nom = nom` |
| `public double preuAmbIva() {...}` | `def preu_amb_iva(self):` |
| `toString()` | `__str__(self)` |
| `new Producte("Teclat", 25)` | `Producte("Teclat", 25)` |

> **`self`** és l'objecte sobre el qual es crida el mètode (com el `this` de Java). A Python s'ha d'escriure **sempre** com a primer paràmetre de cada mètode, però **no** es passa en cridar-lo: `teclat.preu_amb_iva()`.

> Els atributs es creen dins de `__init__` amb `self.`. Si es posen directament a la classe (fora de `__init__`), els comparteixen tots els objectes.

### Herència i `super()`

```python
class ProducteOferta(Producte):          # hereta de Producte (com "extends" a Java)

    def __init__(self, nom, preu, descompte):
        super().__init__(nom, preu)      # crida el constructor de la classe pare
        self.descompte = descompte

    def preu_amb_iva(self):              # sobreescriu el mètode del pare
        return super().preu_amb_iva() * (1 - self.descompte / 100)


oferta = ProducteOferta("Monitor", 200, 10)
oferta.preu_amb_iva()    # 217.8
```

### On surt la POO a Django

| Codi del curs | Què és |
|---|---|
| `class Usuari(models.Model):` | Una classe que hereta de `models.Model` |
| `def __str__(self):` als models | El mètode que diu com es mostra l'objecte |
| `class UsuariForm(forms.ModelForm):` | Un formulari que hereta de `ModelForm` |
| `class RecursNoTrobat(Exception):` | Una excepció pròpia que hereta d'`Exception` |
| `super().__init__(self.missatge)` | Crida el constructor d'`Exception` |
| `super().clean()` | Crida el `clean()` original del formulari |

---

## 14. Errors habituals

| Error | Quan surt | Exemple |
|---|---|---|
| `SyntaxError` | El codi està mal escrit | Falten els `:` al final d'un `if`, `for` o `def` |
| `IndentationError` | El bloc no està ben indentat | El cos d'un `for` no està indentat |
| `NameError` | Es fa servir una variable que no existeix | Una variable local fora de la funció |
| `UnboundLocalError` | Es llegeix una variable local abans de crear-la | `total = total + p` sense `total = 0` abans |
| `TypeError` | Operació amb tipus incompatibles | `"Tens " + 3` |
| `IndexError` | L'índex d'una llista no existeix | `productes[10]` en una llista de 3 elements |
| `KeyError` | La clau d'un diccionari no existeix | `stock["Monitor"]` sense haver-la afegit |
| `AttributeError` | L'objecte no té aquest atribut o mètode | `None.nom` |

---

## 15. Prompts per practicar a casa amb IA

Aquests prompts serveixen per demanar a una IA (Claude, ChatGPT, Gemini…) exercicis per repassar cada apartat d'aquest document. Copieu el prompt de l'apartat que vulgueu repassar i enganxeu-lo al xat.

> **Com treure'n profit:**
> - Intenteu fer els exercicis **sense mirar les solucions** i, si cal, proveu el codi a l'ordinador.
> - Quan tingueu les respostes, escriviu `solucions` per comparar-les.
> - Si un exercici no l'enteneu, demaneu a la IA que us l'expliqui pas a pas o que us en faci més de semblants.
> - La IA també s'equivoca: si una solució no us quadra amb aquest document, comproveu-la executant el codi.

### Prompt 1. Diferències principals amb Java

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis per practicar les diferències de sintaxi entre Java i Python: blocs amb `:` i indentació (sense `{}` ni `;`), `True`/`False`/`None`, `and`/`or`/`not`, comentaris amb `#` i crear objectes sense `new`. Inclou exercicis on et dono un fragment en Java i l'he de traduir a Python, i fragments en Python amb errors típics d'algú que ve de Java. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 2. Variables i tipus de dades

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis sobre variables i tipus de dades a Python: `int`, `float`, `str`, `bool`, `None`, `list`, `tuple` i `dict`, el tipatge dinàmic, `type()` i les conversions amb `int()`, `float()` i `str()`. Inclou exercicis on he de dir quin tipus té cada variable i quin resultat dona una conversió (també alguna que falli). Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 3. Operadors

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis sobre operadors a Python: aritmètics (`+`, `-`, `*`, `/`, `//`, `%`, `**`), d'assignació (`=`, `+=`), de comparació (`==`, `!=`, `<`, `>=`…), lògics (`and`, `or`, `not`) i de pertinença (`in`). Insisteix en la diferència entre `/` i `//` i entre `=` i `==`. Inclou exercicis de calcular a mà el resultat d'expressions. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 4. Text: concatenació i f-strings

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 12 exercicis sobre text a Python: concatenar amb `+`, l'error de concatenar un número sense `str()`, i les f-strings (`f"Tens {quantitat} productes"`), també amb expressions dins de les claus. Inclou exercicis de transformar concatenacions en f-strings i de construir missatges a partir de variables (noms, preus, quantitats). Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 5. Condicionals: if, elif, else

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis de condicionals a Python amb `if`, `elif` i `else`, condicions compostes amb `and`/`or`/`not` i la indentació dels blocs. Fes servir situacions properes a una aplicació web: classificar una edat, calcular un descompte segons l'import, comprovar si un usuari és professor o alumne, posar una nota en text (Suspès, Aprovat, Notable, Excel·lent)… Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 6. Bucles: for i while

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis de bucles a Python: `for` sobre una llista, `for` amb `range()` (amb un i dos arguments, recordant que el límit superior no s'inclou), `while` amb comptador (sense `++`, amb `+= 1`), `break` i `continue`. Inclou exercicis de predir quants cops s'executa un bucle i què mostra, i problemes com sumar preus, comptar elements que compleixen una condició o buscar un element. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 7. Llistes (list)

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis sobre llistes a Python: crear-les, accedir per índex (també negatiu), trossos (`[0:2]`, `[:2]`), modificar elements, `append()`, `insert()`, `remove()`, `del`, `len()`, `in` i recórrer-les amb `for`. Inclou exercicis on salti `IndexError` i he de dir per què, i problemes amb una llista de productes o d'alumnes. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 8. Tuples (tuple)

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 10 exercicis sobre tuples a Python: crear-les, accedir per índex, que no es poden modificar (`TypeError`), desempaquetar-les (`latitud, longitud = coordenades`), recórrer una llista de tuples i la diferència entre una tupla i una llista. Inclou algun exercici amb una llista d'opcions del tipus `[('alumne', 'Alumne'), ('professor', 'Professor')]`, com les que es fan servir als formularis de Django. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 9. Diccionaris (dict)

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis sobre diccionaris a Python: crear-los, accedir per clau amb `[]` i amb `.get()` (amb i sense valor per defecte), l'error `KeyError`, afegir i modificar claus, `del`, `in`, i recórrer-los amb `for`, `.items()`, `.keys()` i `.values()`. Inclou problemes amb un diccionari d'estoc de productes i amb una llista de diccionaris (per exemple, alumnes amb nom i nota). Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 10. Funcions

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis sobre funcions a Python: definir-les amb `def`, paràmetres, `return`, paràmetres amb valor per defecte, cridar-les passant els arguments pel nom, i què retorna una funció sense `return` (`None`). Inclou funcions que rebin llistes o diccionaris, com calcular el total d'una comanda, filtrar productes per preu o calcular l'IVA. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 11. Àmbit de les variables

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 10 exercicis sobre l'àmbit de les variables a Python: variables locals i globals, `NameError` en fer servir una variable local fora de la funció i `UnboundLocalError` en llegir una variable abans de crear-la (per exemple, un acumulador no inicialitzat). La majoria han de ser fragments de codi on he de dir què mostra o quin error dona i com es corregeix. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 12. Comentaris i docstrings

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 10 exercicis sobre comentaris i docstrings a Python: comentaris d'una línia amb `#`, comentaris de diverses línies amb `"""` i docstrings just sota una funció o classe. Inclou exercicis de trobar comentaris mal escrits (amb la sintaxi de Java o HTML) i d'escriure el docstring adequat per a funcions que et donaré. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 13. Programació orientada a objectes (POO)

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis de programació orientada a objectes a Python: definir classes, el constructor `__init__`, `self`, atributs, mètodes, `__str__`, crear objectes (sense `new`), herència i `super().__init__()`, i sobreescriure mètodes. Compara-ho amb Java quan sigui útil. Inclou exercicis amb classes com `Producte`, `Alumne` o `Llibre`, i errors típics, com oblidar `self` en un mètode. Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```

### Prompt 14. Errors habituals

```text
Sóc alumne de 2n de DAW i estic aprenent Python (ja sé programar en Java). Crea'm 15 exercicis on cada un sigui un fragment de codi Python que dona un error: `SyntaxError`, `IndentationError`, `NameError`, `UnboundLocalError`, `TypeError`, `IndexError`, `KeyError` o `AttributeError`. Per a cada fragment he de dir quin error dona, per què i com es corregeix. Fes servir codi semblant al d'una aplicació web (productes, usuaris, estoc, notes). Numera els exercicis i ordena'ls de més fàcil a més difícil. Barreja exercicis d'escriure codi, de predir què mostra un codi i de trobar l'error. No em donis les solucions fins que t'escrigui "solucions"; llavors, dona-les amb una explicació curta de cada una.
```
