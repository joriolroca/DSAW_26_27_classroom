# Django MVT

## Índex

1. [Introducció a Django i el patró MVT](#1-introducció-a-django-i-el-patró-mvt)
2. [Entorn de treball](#2-entorn-de-treball)
3. [Git — treball amb branques](#3-git--treball-amb-branques)
4. [Estructura del projecte](#4-estructura-del-projecte)
5. [Configuració — settings.py](#5-configuració--settingspy)
6. [Gestió d'aplicacions](#6-gestió-daplicacions)
7. [Enrutament — urls.py](#7-enrutament--urlspy)
8. [Vistes — views.py](#8-vistes--viewspy)
9. [Plantilles — Templates](#9-plantilles--templates)
10. [Models](#10-models)
11. [Capa de serveis i repositori](#11-capa-de-serveis-i-repositori)
12. [Formularis — forms.py](#12-formularis--formspy)
13. [CRUD complet](#13-crud-complet)
14. [Excepcions i gestió d'errors](#14-excepcions-i-gestió-derrors)
15. [Allotjament de la base de dades (Neon + Oracle Cloud)](#15-allotjament-de-la-base-de-dades)
16. [Sessions i manteniment d'estat](#16-sessions-i-manteniment-destat)
17. [Autenticació completa: login, logout i protecció de vistes](#17-autenticació-completa-login-logout-i-protecció-de-vistes)
18. [Sintaxi bàsica de Python](#18-sintaxi-bàsica-de-python) → [`python_basics.md`](python_basics.md)
19. [Proves i depuració del codi](#19-proves-i-depuració-del-codi)

---

## 1. Introducció a Django i el patró MVT

### Què és Django?

Django és un **framework web de Python** que permet crear aplicacions web completes de forma ràpida i segura. Segueix el principi **"batteries included"**: porta integrat tot el que cal per fer una web (autenticació, ORM, formularis, panel d'administració...).

> **Diferència amb Java:** A Java usàveu classes i mètodes separats amb molt de codi boilerplate. Django redueix dràsticament aquest codi gràcies a les convencions del framework.

### El patró MVT

Django segueix el patró **MVT (Model · View · Template)**. És similar al MVC que potser heu vist a Java, però amb nomenclatura diferent:

| Concepte MVT | Fitxer Django | Equivalent Java MVC |
|---|---|---|
| **Model** | `models.py` | Entity / DAO |
| **View** (Vista) | `views.py` | Controller |
| **Template** (Plantilla) | `.html` a `/templates` | JSP / Thymeleaf |

**Flux d'una petició Django:**

<img src="./img/mvt_django.png"></img>

## Flux complet pas a pas

![Diagrama MVC clàssic](img/flux_complet_pas_a_pas.png)


## Com Django implementa MVC → MVT

Django segueix el patró MVC però amb noms propis. Ho anomena **MVT** (Model–View–Template):

| MVC clàssic | Django MVT | Fitxer típic | Ús |
|---|---|---|---|
| **Model** | **Model** | `models.py` | Defineix les dades: cada classe és una taula i cada atribut, un camp. Inclou les relacions (`ForeignKey`, `ManyToManyField`) i les restriccions dels camps (`max_length`, `unique`…). |
| **View** | **Template** | `templates/*.html` | Decideix *com* es mostren les dades. Rep les dades de la vista i, amb `{{ }}` i `{% %}`, Django en genera l'HTML **al servidor**. No hi ha lògica de negoci. |
| **Controller** | **View** | `views.py` | Rep la petició HTTP, llegeix els paràmetres i els formularis, crida el mètode del *service* que toca i retorna la resposta (`render`, `redirect`). Ha de ser curta. |
| — | **URL** | `urls.py` | Associa cada URL amb la vista (views.py) que l'ha d'atendre. |
| **Service** |  **Service** | `services.py` | Lògica de negoci: càlculs, regles i validacions que impliquen diverses dades. Llança excepcions de negoci si alguna cosa no es compleix. El *service* no sap com es consulten les dades. |
| **Repository** | **Repository** | `repository.py` | Accés a dades: **NOMÉS** consultes ORM (`objects.filter(...)`, `get(...)`). |

> **Services i repository no formen part del patró MVT ni MVC.** Django no els crea ni els exigeix: és una convenció que fem servir al curs (vegeu `01_django_mvt_teoria.md` 11) perquè les vistes no creixin. El flux és `views.py` → `services.py` → `repository.py` → `models.py`.

> **Per a que el canvi de nom?** Django anomena "View" al que en MVC seria el Controller perquè, des del punt de vista de Django, la View decideix *quines dades* mostrar (responsabilitat del Controller en MVC pur). El Template s'ocupa de *com* mostrar-les (responsabilitat de la View en MVC pur).

---

## 2. Entorn de treball

### Versió de Python recomanada per al curs 26-27

> **Recomanació:** Usar **Python 3.12** amb **Django 5.1**.  
> Python 3.10 entra en fi de vida l'octubre del 2026 i ja no és la versió recomanada.  
> Python 3.12 és una versió estable amb suport fins al 2028, totalment compatible amb `psycopg2-binary` i Django 5.x.

### Creació de l'entorn virtual

#### Linux / Mac

```bash
# Crear l'entorn virtual amb Python 3.12
python3.12 -m venv venv

# Activar l'entorn virtual
source venv/bin/activate
```

#### Windows

A Windows no existeix la comanda `python3.12`. L'instal·lador de python.org crea la comanda `python` (si es marca "Add to PATH") i el **Python Launcher** `py`, que permet triar la versió.

Si ja teniu instal·lada una altra versió (per exemple, la 3.15), podeu instal·lar la 3.12 al costat: cada versió va a la seva carpeta i poden conviure sense problemes.

1. Descarregueu l'instal·lador de **Python 3.12** de python.org (*Windows installer (64-bit)*).
2. En instal·lar-lo, **no** marqueu "Add python.exe to PATH" si ja teniu una altra versió: així `python` continua apuntant a la que ja teníeu. Deixeu marcada l'opció del *py launcher*.
3. Comproveu les versions instal·lades i creeu l'entorn amb la 3.12:

```powershell
# Veure les versions de Python instal·lades
py --list

# Crear l'entorn virtual amb Python 3.12
py -3.12 -m venv venv

# Activar l'entorn virtual
venv\Scripts\activate

# Comprovar que l'entorn fa servir la 3.12
python --version
```

Un cop activat l'entorn, `python` i `pip` ja són els de la 3.12, i la resta de comandes del curs són iguals que a Linux.

| Situació | Què passa | Com evitar-ho |
|---|---|---|
| Fer servir `python` o `pip` sense activar el `venv` | Es fa servir l'altra versió i les llibreries s'hi instal·len | Activar sempre el `venv` abans: el terminal mostra `(venv)` al davant |
| Executar `py` sense indicar la versió | S'obre la versió més nova | Crear el `venv` sempre amb `py -3.12` |
| L'editor (VS Code) agafa una altra versió | El projecte no troba les llibreries | Triar l'intèrpret `.\venv\Scripts\python.exe` ("Python: Select Interpreter") |
| PowerShell no deixa executar `activate` | Error de política d'execució de scripts | Executar un cop `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, o activar-lo des del `cmd` |

> **Diferència amb Java:** A Java s'usen eines com Maven o Gradle per gestionar dependències. A Python s'usa `pip` amb un entorn virtual (`venv`) per aïllar les llibreries de cada projecte.

### requirements.txt

El fitxer `requirements.txt` conté totes les dependències del projecte, com el `pom.xml` de Maven:

```text
Django==5.1
psycopg2-binary==2.9.9
djangorestframework==3.15.2
```

**Instal·lar totes les dependències d'una vegada:**

```bash
pip install -r requirements.txt
```

**Generar el requirements.txt de les llibreries instal·lades:**

```bash
pip freeze > requirements.txt
```

### Instal·lació manual de les dependències

```bash
python3 -m pip install django==5.1
python3 -m pip install psycopg2-binary
```

### Docker per a PostgreSQL en local

Per treballar amb PostgreSQL en local s'usa Docker. Crear un fitxer `docker-compose.yml` a l'arrel del projecte:

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: nom_base_dades
      POSTGRES_USER: usuari
      POSTGRES_PASSWORD: contrasenya
    ports:
      - "5432:5432"
```

Engegar el contenidor:

```bash
docker compose up -d
```
Aturar contenidor:

```bash
docker compose stop
```

Eliminar contenidor:

```bash
docker compose down
```
Aturar i eliminar contenidor i eliminar volums:

```bash
docker compose down -v
```

#### Resum comandes Docker

| Comanda | Contenidors | Xarxes | Volums |
|---|---|---|---|
| `docker compose up -d` | es creen i s'engeguen | es creen (si no existeixen) | es creen o es reutilitzen |
| `docker compose stop` | aturats (es conserven) | es conserven | es conserven |
| `docker compose down` | eliminats | eliminades | es conserven |
| `docker compose down -v` | eliminats | eliminades | **eliminats** |

---

## 3. Git — treball amb branques

> **Important:** Tot el treball amb Git es fa des del terminal. No s'usen eines gràfiques.

### Conceptes bàsics

Git és un sistema de control de versions que permet:
- Guardar l'historial de canvis del codi.
- Treballar en paral·lel amb **branques** sense afectar el codi principal.
- Col·laborar amb altres persones.

> **Analogia Java:** Git és com tenir un historial complet de cada versió de la vostra aplicació. Si trencau alguna cosa, podeu tornar enrere.

### Configuració inicial (una sola vegada)

```bash
git config --global user.name "El vostre nom"
git config --global user.email "el_vostre@email.com"
```

### Flux de treball habitual

```bash
# 1. Clonar un repositori nou
git clone < url-repositori >

# 2. Veure l'estat actual dels fitxers
git status

# 3. Afegir fitxers al staging area (preparat per guardar)
git add nom_fitxer.py

# 4. Guardar els canvis amb un missatge descriptiu
git commit -m "Afegit model de producte i migracions"

# 5. Pujar els canvis al repositori remot (GitHub)
git push
```

### Treball amb branques

Les branques permeten treballar en funcionalitats noves sense tocar el codi estable (`main`):

```bash
# Crear una branca nova i canviar-hi
git checkout -b feature/login

# Veure totes les branques
git branch

# Canviar a una branca existent
git switch main
```

**Convenció de noms de branques:**

| Tipus | Exemple |
|---|---|
| Funcionalitat nova | `feature/nom-funcionalitat` |
| Correcció d'error | `fix/descripcio-error` |
| Activitat de classe | `act/ACT01-entorn` |

### .gitignore

Crear un fitxer `.gitignore` a l'arrel del projecte per no pujar fitxers innecessaris:

```
venv/
__pycache__/
*.pyc
.env
db.sqlite3
*.log
```

---

## 4. Estructura del projecte

Quan es crea un projecte Django s'usa una de les segÜents comandes:

```bash
# Comanda recomanasda
django-admin startproject nom_projecte

# Comanda alternativa
django-admin startproject nom_projecte .
```

> - **Sense punt:** es crea una carpeta `nom_projecte/` i, a dins, `manage.py` i una subcarpeta `nom_projecte/` amb la configuració.
> - **Amb punt (`.`):** `manage.py` i la carpeta de configuració `nom_projecte/` es creen directament al directori actual, sense la carpeta exterior.  

Estructura resultant després d'usar la comanda sense punt:

```
nom_projecte/
├── nom_projecte/
│   ├── __init__.py
│   ├── settings.py      ← Configuració global
│   ├── urls.py          ← Enrutament principal
│   ├── asgi.py
│   └── wsgi.py
├── manage.py            ← Eina de gestió del projecte
├── requirements.txt
├── docker-compose.yml
└── .gitignore
```

**Comandes principals de `manage.py`:**

```bash
python manage.py runserver          # Executa el servidor (port 8000)
python manage.py runserver 8080     # Executa al port 8080
python manage.py startapp nom_app   # Crea una nova aplicació
python manage.py makemigrations     # Genera les migracions
python manage.py migrate            # Aplica les migracions a la BD
python manage.py createsuperuser    # Crea un usuari administrador
```


## 5. Configuració — settings.py

El fitxer `settings.py` és la configuració global del projecte. Els apartats més importants:

### INSTALLED_APPS

Cada aplicació creada s'ha d'afegir aquí:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app1.apps.App1Config',    # ← La nostra aplicació
]
```

### DATABASES

Configuració de la connexió a PostgreSQL (Docker local):

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nom_base_dades',
        'USER': 'usuari',
        'PASSWORD': 'contrasenya',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```

### TEMPLATES

Per detectar les carpetes `templates` de cada aplicació:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### Variables sensibles amb variables d'entorn

Les credencials no s'han de pujar mai a Git. S'usa un fitxer `.env`:

```python
# settings.py
import os

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'clau-per-defecte-dev')
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'nom_bd'),
        'USER': os.environ.get('DB_USER', 'usuari'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'contrasenya'),
        'HOST': os.environ.get('DB_HOST', '127.0.0.1'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

---

## 6. Gestió d'aplicacions

Crear una aplicació dins del projecte:

```bash
python manage.py startapp nom_app
```

Estructura d'una aplicació:

```
nom_app/
├── migrations/          ← Historial de canvis a la BD
├── templates/           ← Plantilles HTML (cal crear-la)
├── __init__.py
├── admin.py
├── apps.py
├── forms.py             ← Formularis (cal crear-lo)
├── models.py            ← Definició de les taules
├── services.py          ← Lògica de negoci (cal crear-lo)
├── repository.py        ← Accés a dades (cal crear-lo)
├── tests.py
├── urls.py              ← Rutes de l'app (cal crear-lo)
└── views.py             ← Controladors
```

**Registrar l'aplicació a `settings.py`** (obligatori):

```python
INSTALLED_APPS = [
    ...
    'nom_app.apps.NomAppConfig',
]
```
---

## 7. Enrutament — urls.py

### urls.py del projecte

El fitxer `urls.py` del projecte és el punt d'entrada de totes les peticions. Redirigeix cap a les URLs de cada aplicació:

```python
# nom_projecte/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('nom_app.urls')),          # Ruta base
    path('productes/', include('productes.urls')),  # Altra app
]
```

### urls.py de l'aplicació

Cada aplicació té el seu propi `urls.py` amb els camins específics:

```python
# nom_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.inici, name='inici'),
    path('usuaris/', views.llista_usuaris, name='llista_usuaris'),
    path('usuari/<int:pk>/', views.detall_usuari, name='detall_usuari'),
    path('usuari/<int:pk>/editar/', views.editar_usuari, name='editar_usuari'),
    path('usuari/<int:pk>/eliminar/', views.eliminar_usuari, name='eliminar_usuari'),
    path('usuari/nou/', views.crear_usuari, name='crear_usuari'),
]
```

**Paràmetres a les URLs:**

| Sintaxi | Descripció | Exemple |
|---|---|---|
| `<int:pk>` | Enter (id) | `/usuari/5/` |
| `<str:nom>` | Cadena de text | `/categoria/electronics/` |
| `<slug:slug>` | Text amb guions | `/article/mon-article/` |

> **Per què `name`?** El paràmetre `name` permet referenciar la URL des de les plantilles sense escriure el camí sencer. Si canvieu la URL, les plantilles no s'han de tocar.

---

## 8. Vistes — views.py

Les vistes reben la petició HTTP i retornen una resposta. Actuen com a controladors.

### Vista bàsica

```python
# nom_app/views.py
from django.shortcuts import render

def inici(request):
    context = {'missatge': 'Benvingut!'}
    return render(request, 'inici.html', context)
```

### Mètodes HTTP

```python
def crear_usuari(request):
    if request.method == 'POST':
        # Processar les dades enviades pel formulari
        nom = request.POST.get('nom')
        ...
    else:
        # Mostrar el formulari buit (GET)
        return render(request, 'formulari.html', {})
```

### Redirecció

```python
from django.shortcuts import render, redirect

def crear_usuari(request):
    if request.method == 'POST':
        ...
        return redirect('llista_usuaris')   # Redirigeix per name de url
    return render(request, 'formulari.html', {})
```
---

## 9. Plantilles — Templates

### Estructura de carpetes

```
nom_app/
└── templates/
    └── nom_app/
        ├── base.html          ← Plantilla base del projecte
        ├── inici.html
        ├── llista_usuaris.html
        └── detall_usuari.html
```

### Tags de Django

Django té dos tipus de tags per treballar des de les plantilles:

| Tag | Ús |
|---|---|
| `{% %}` | Lògica: condicionals, bucles, blocs |
| `{{ }}` | Mostrar valors de variables |

**Exemples de tags:**

```html
<!-- Variable -->
<p>{{ usuari.nom }}</p>

<!-- Condicional -->
{% if usuari.rol == 'teacher' %}
    <p>Ets professor</p>
{% elif usuari.rol == 'student' %}
    <p>Ets alumne</p>
{% else %}
    <p>Rol desconegut</p>
{% endif %}

<!-- Bucle -->
{% for producte in productes %}
    <li>{{ producte.nom }} — {{ producte.preu }}€</li>
{% empty %}
    <li>No hi ha productes</li>
{% endfor %}
```

**Filtres (helpers):** (Informatiu: No es preguntarà)

```html
{{ text|upper }}                    <!-- Majúscules -->
{{ data|date:"d/m/Y" }}            <!-- Format de data -->
{{ preu|floatformat:2 }}           <!-- 2 decimals -->
{{ llista|length }}                 <!-- Longitud -->
{{ text|truncatechars:50 }}        <!-- Tallar text -->
```

### Herència de plantilles (extends)

La plantilla **base** defineix l'estructura HTML comuna:

```html
<!-- templates/nom_app/base.html -->
<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}El meu projecte{% endblock %}</title>
</head>
<body>
    <nav>
        <a href="{% url 'inici' %}">Inici</a>
        <a href="{% url 'llista_usuaris' %}">Usuaris</a>
    </nav>

    <main>
        {% block content %}
        {% endblock %}
    </main>

    <footer>
        <p>Peu de pàgina</p>
    </footer>
</body>
</html>
```

Les plantilles filles **hereten** la base i omplen els blocs:

```html
<!-- templates/nom_app/llista_usuaris.html -->
{% extends 'nom_app/base.html' %}

{% block title %}Llista d'usuaris{% endblock %}

{% block content %}
    <h1>Usuaris del sistema</h1>
    <ul>
        {% for usuari in usuaris %}
            <li>
                {{ usuari.nom }} {{ usuari.cognom }}
                <a href="{% url 'detall_usuari' usuari.id %}">Veure detall</a>
            </li>
        {% empty %}
            <li>No hi ha usuaris registrats</li>
        {% endfor %}
    </ul>
    <a href="{% url 'crear_usuari' %}">Afegir nou usuari</a>
{% endblock %}
```

### Includes

Els `{% include %}` permeten reutilitzar fragments de plantilla:

```html
<!-- Fragment reutilitzable: templates/nom_app/_navbar.html -->
<nav>
    <a href="{% url 'inici' %}">Inici</a>
    <a href="{% url 'llista_usuaris' %}">Usuaris</a>
</nav>
```

```html
<!-- Usar el fragment des d'una altra plantilla -->
{% include 'nom_app/_navbar.html' %}
```

### Incloure un formulari en una plantilla

```html
{% extends 'nom_app/base.html' %}

{% block content %}
    <h1>Nou usuari</h1>
    <form action="" method="POST">
        {% csrf_token %}
        {{ formulari.as_p }}
        <button type="submit">Guardar</button>
    </form>
{% endblock %}
```

> **`{% csrf_token %}`** és obligatori en tots els formularis POST. Django el valida per prevenir atacs CSRF.

### URLs dinàmiques a les plantilles

```html
<!-- Sense paràmetre -->
<a href="{% url 'llista_usuaris' %}">Tots els usuaris</a>

<!-- Amb paràmetre enter -->
<a href="{% url 'detall_usuari' usuari.id %}">Veure detall</a>

<!-- Amb paràmetre de text -->
<a href="{% url 'categoria' 'electronics' %}">Electronics</a>
```
---

## 10. Models

### Definició d'un model

A `models.py` es defineixen les taules de la base de dades com a classes Python:

```python
# nom_app/models.py
from django.db import models

class Usuari(models.Model):

    class Rol(models.TextChoices):
        PROFESSOR = 'professor', 'Professor'
        ALUMNE = 'alumne', 'Alumne'
        ADMIN = 'admin', 'Administrador'

    nom = models.CharField(max_length=50)
    cognom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    edat = models.IntegerField()
    rol = models.CharField(max_length=20, choices=Rol.choices, default=Rol.ALUMNE)
    data_creacio = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nom} {self.cognom} ({self.rol})"
```

> **`__str__()`** és equivalent al `toString()` de Java. Defineix com es mostra un objecte quan es converteix a text (al panel d'administració, a la consola...).

### Tipus de camps principals

| Camp | Equivalent Java | Descripció |
|---|---|---|
| `CharField(max_length=n)` | `String` (limitat) | Text curt |
| `TextField()` | `String` (llarg) | Text llarg |
| `IntegerField()` | `int` | Enter |
| `DecimalField(max_digits, decimal_places)` | `BigDecimal` | Decimal |
| `BooleanField()` | `boolean` | Cert/Fals |
| `DateField()` | `LocalDate` | Data |
| `DateTimeField()` | `LocalDateTime` | Data i hora |
| `EmailField()` | `String` + validació | Email |
| `ImageField()` | — | Imatge |
| `FileField()` | — | Fitxer |

**Opcions comunes:**

```python
nom = models.CharField(max_length=50, null=False, blank=False)
descripcio = models.TextField(null=True, blank=True)
actiu = models.BooleanField(default=True)
data = models.DateTimeField(auto_now_add=True)  # Es posa automàticament en crear
actualitzat = models.DateTimeField(auto_now=True)  # S'actualitza en cada save()
```

### Relacions entre models

#### ForeignKey (molts a un)

Una relació **ForeignKey** significa que molts registres d'una taula apunten a un registre d'una altra. Per exemple: molts productes pertanyen a una categoria.

```python
class Categoria(models.Model):
    nom = models.CharField(max_length=50)

    def __str__(self):
        return self.nom

class Producte(models.Model):
    nom = models.CharField(max_length=100)
    preu = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.CASCADE,    # Si s'elimina la categoria, s'eliminen els productes
        related_name='productes'     # Nom per accedir des de Categoria
    )

    def __str__(self):
        return self.nom
```

**`on_delete` opcions:**

| Opció | Comportament |
|---|---|
| `CASCADE` | Elimina els registres fills |
| `PROTECT` | Impedeix eliminar si té fills |
| `SET_NULL` | Posa `null` al camp (cal `null=True`) |
| `SET_DEFAULT` | Posa el valor per defecte |

**Consultes amb ForeignKey:**

```python
# Tots els productes d'una categoria
categoria = Categoria.objects.get(id=1)
productes = categoria.productes.all()   # Usa el related_name

# La categoria d'un producte
producte = Producte.objects.get(id=1)
categoria = producte.categoria
```

#### ManyToManyField (molts a molts)

Un producte pot tenir moltes etiquetes i una etiqueta pot estar en molts productes:

```python
class Etiqueta(models.Model):
    nom = models.CharField(max_length=30)

    def __str__(self):
        return self.nom

class Article(models.Model):
    titol = models.CharField(max_length=200)
    etiquetes = models.ManyToManyField(Etiqueta, blank=True)

    def __str__(self):
        return self.titol
```

Django crea automàticament una taula intermèdia a la base de dades.

**Consultes amb ManyToMany:**

```python
article = Article.objects.get(id=1)

# Obtenir totes les etiquetes d'un article
etiquetes = article.etiquetes.all()

# Afegir una etiqueta
article.etiquetes.add(etiqueta)

# Eliminar una etiqueta
article.etiquetes.remove(etiqueta)

# Tots els articles d'una etiqueta
etiqueta = Etiqueta.objects.get(id=1)
articles = etiqueta.article_set.all()
```

### Model d'usuari de Django

Django porta un model d'usuari integrat (`auth_user`) amb camps com `username`, `password`, `email`, `is_staff`, `is_superuser`...

**Crear usuari, grup i rol des del panel d'administració:**

```bash
python manage.py createsuperuser
```

**Usar el model d'usuari de Django com a ForeignKey:**

```python
from django.contrib.auth.models import User

class Perfil(models.Model):
    usuari = models.OneToOneField(User, on_delete=models.CASCADE)
    telefon = models.CharField(max_length=15, blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f"Perfil de {self.usuari.username}"
```

### Migracions

Les migracions tradueixen els canvis dels models Python a canvis reals a la base de dades:

```bash
# 1. Generar el fitxer de migració (detecta els canvis a models.py)
python manage.py makemigrations

# 2. Aplicar les migracions a la base de dades
python manage.py migrate
```

**Modificació d'un model existent:**

1. Modifiqueu la classe a `models.py`
2. Executeu `makemigrations` → es crea un fitxer `0002_xxx.py`
3. Executeu `migrate` → Django fa `ALTER TABLE` sense perdre dades

> **IMPORTANT:** Mai eliminar fitxers de la carpeta `migrations/`. Django necessita tot l'historial per mantenir l'estat de la base de dades.

### Consultes ORM (QuerySets)

```python
# Tots els registres
usuaris = Usuari.objects.all()

# Filtrar per condicions
professors = Usuari.objects.filter(rol='professor')
adults = Usuari.objects.filter(edat__gte=18)

# Obtenir un registre per id (llança DoesNotExist si no existeix)
usuari = Usuari.objects.get(id=pk)

# Ordenar
usuaris_ordenats = Usuari.objects.all().order_by('cognom')

# Comptar
total = Usuari.objects.count()

# Verificar si existeix
existeix = Usuari.objects.filter(email='test@test.com').exists()
```

---

## 11. Capa de serveis i repositori

### Per què separar la lògica?

Quan les vistes comencen a tenir molta lògica de negoci, és millor separar les responsabilitats seguint el principi de **Single Responsibility**:

| Fitxer | Responsabilitat |
|---|---|
| `views.py` | Rep la petició, crida services, retorna resposta |
| `services.py` | Lògica de negoci (càlculs, validacions, orquestració) |
| `repository.py` | Accés a la base de dades (consultes ORM) |
| `models.py` | Definició de l'estructura de dades |

> **Analogia Java:** És el patró Repository + Service que segurament heu vist o veureu a Spring Boot.

### Exemple pràctic

```python
# nom_app/repository.py
from .models import Usuari

def get_all_usuaris():
    return Usuari.objects.all().order_by('cognom')

def get_usuari_by_id(pk):
    return Usuari.objects.get(id=pk)

def save_usuari(usuari):
    usuari.save()

def delete_usuari(pk):
    Usuari.objects.get(id=pk).delete()
```

```python
# nom_app/services.py
from . import repository

def obtenir_usuaris():
    return repository.get_all_usuaris()

def obtenir_usuari(pk):
    return repository.get_usuari_by_id(pk)

def calcular_estadistiques():
    usuaris = repository.get_all_usuaris()
    total = len(usuaris)
    professors = sum(1 for u in usuaris if u.rol == 'professor')
    alumnes = total - professors
    return {'total': total, 'professors': professors, 'alumnes': alumnes}
```

```python
# nom_app/views.py
from django.shortcuts import render
from . import services

def llista_usuaris(request):
    usuaris = services.obtenir_usuaris()
    estadistiques = services.calcular_estadistiques()
    context = {'usuaris': usuaris, 'stats': estadistiques}
    return render(request, 'nom_app/llista_usuaris.html', context)
```

---

## 12. Formularis — forms.py

### Formulari basat en model (ModelForm)

```python
# nom_app/forms.py
from django import forms
from .models import Usuari

class UsuariForm(forms.ModelForm):
    class Meta:
        model = Usuari
        fields = ['nom', 'cognom', 'email', 'edat', 'rol']
        # O bé: fields = '__all__'  per tots els camps

        widgets = {
            'nom': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
            'rol': forms.Select(attrs={'class': 'form-select'}),
        }

        labels = {
            'nom': 'Nom',
            'cognom': 'Cognom',
            'email': 'Correu electrònic',
        }
```

### Tots els tipus de camps

```python
class FormulariComplet(forms.Form):
    # Text
    nom = forms.CharField(max_length=100, label='Nom')

    # Email
    email = forms.EmailField(label='Correu electrònic')

    # Data
    data_naixement = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        label='Data de naixement'
    )

    # Fitxer
    foto = forms.ImageField(required=False, label='Foto de perfil')
    document = forms.FileField(required=False, label='Document')

    # Select (llista desplegable)
    OPCIONS_ROL = [
        ('alumne', 'Alumne'),
        ('professor', 'Professor'),
    ]
    rol = forms.ChoiceField(choices=OPCIONS_ROL, label='Rol')

    # Camp ocult
    token = forms.CharField(widget=forms.HiddenInput())

    # Checkbox (un sol)
    accepta_termes = forms.BooleanField(label='Accepto els termes i condicions')

    # Checkbox múltiple
    INTERESSOS = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('web', 'Desenvolupament web'),
    ]
    interessos = forms.MultipleChoiceField(
        choices=INTERESSOS,
        widget=forms.CheckboxSelectMultiple(),
        required=False,
        label='Interessos'
    )

    # Radio buttons
    NIVELL = [
        ('basic', 'Bàsic'),
        ('mitja', 'Mitjà'),
        ('avançat', 'Avançat'),
    ]
    nivell = forms.ChoiceField(
        choices=NIVELL,
        widget=forms.RadioSelect(),
        label='Nivell'
    )

    # Textarea
    bio = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4}),
        required=False,
        label='Biografia'
    )

    # URL
    web = forms.URLField(required=False, label='Pàgina web')

    # Telèfon
    telefon = forms.CharField(
        max_length=15,
        required=False,
        label='Telèfon'
    )
```

### Validació amb expressions regulars (sense JavaScript)

Django pot validar camps amb expressions regulars directament al servidor:

```python
from django import forms
from django.core.validators import RegexValidator

class RegistreForm(forms.Form):
    telefon = forms.CharField(
        validators=[
            RegexValidator(
                regex=r'^\+?[0-9]{9,15}$',
                message='Format de telèfon invàlid. Ex: +34600000000'
            )
        ],
        label='Telèfon'
    )

    codi_postal = forms.CharField(
        validators=[
            RegexValidator(
                regex=r'^\d{5}$',
                message='El codi postal ha de tenir exactament 5 dígits'
            )
        ],
        label='Codi postal'
    )
```

### Validació personalitzada amb `clean()`

```python
class UsuariForm(forms.ModelForm):
    class Meta:
        model = Usuari
        fields = ['nom', 'email', 'edat']

    def clean_edat(self):
        edat = self.cleaned_data.get('edat')
        if edat < 16 or edat > 100:
            raise forms.ValidationError('L\'edat ha d\'estar entre 16 i 100 anys')
        return edat

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Usuari.objects.filter(email=email).exists():
            raise forms.ValidationError('Aquest correu electrònic ja està registrat')
        return email

    def clean(self):
        cleaned_data = super().clean()
        nom = cleaned_data.get('nom')
        cognom = cleaned_data.get('cognom')
        if nom and cognom and nom == cognom:
            raise forms.ValidationError('El nom i el cognom no poden ser iguals')
        return cleaned_data
```

### Mètodes principals del formulari

| Mètode | Descripció |
|---|---|
| `form.is_valid()` | Valida les dades i omple `cleaned_data`. Retorna `True/False` |
| `form.save()` | Guarda el formulari a la BD (només ModelForm) |
| `form.save(commit=False)` | Crea l'objecte però no el guarda. Permet modificar-lo abans |
| `form.errors` | Diccionari d'errors de validació |
| `form.cleaned_data` | Dades vàlides després de `is_valid()` |

### Vista amb formulari

```python
def crear_usuari(request):
    if request.method == 'POST':
        form = UsuariForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('llista_usuaris')
    else:
        form = UsuariForm()

    return render(request, 'nom_app/formulari.html', {'formulari': form})
```

---

## 13. CRUD complet

### Create (Crear)

```python
# views.py
def crear_usuari(request):
    if request.method == 'POST':
        form = UsuariForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('llista_usuaris')
    else:
        form = UsuariForm()
    return render(request, 'nom_app/formulari.html', {'formulari': form, 'accio': 'Crear'})
```

### Read (Llegir)

```python
def llista_usuaris(request):
    usuaris = services.obtenir_usuaris()
    return render(request, 'nom_app/llista.html', {'usuaris': usuaris})

def detall_usuari(request, pk):
    usuari = services.obtenir_usuari(pk)
    return render(request, 'nom_app/detall.html', {'usuari': usuari})
```

### Update (Actualitzar)

```python
def editar_usuari(request, pk):
    usuari = services.obtenir_usuari(pk)
    if request.method == 'POST':
        form = UsuariForm(request.POST, instance=usuari)
        if form.is_valid():
            form.save()
            return redirect('llista_usuaris')
    else:
        form = UsuariForm(instance=usuari)   # Pre-omple el formulari
    return render(request, 'nom_app/formulari.html', {'formulari': form, 'accio': 'Editar'})
```

### Delete (Eliminar)

```python
def eliminar_usuari(request, pk):
    usuari = services.obtenir_usuari(pk)
    if request.method == 'POST':
        usuari.delete()
        return redirect('llista_usuaris')
    return render(request, 'nom_app/confirmar_eliminar.html', {'usuari': usuari})
```

```html
<!-- confirmar_eliminar.html -->
{% extends 'nom_app/base.html' %}
{% block content %}
    <h1>Confirmar eliminació</h1>
    <p>Esteu segur que voleu eliminar <strong>{{ usuari.nom }} {{ usuari.cognom }}</strong>?</p>
    <form method="POST">
        {% csrf_token %}
        <button type="submit">Sí, eliminar</button>
        <a href="{% url 'llista_usuaris' %}">Cancel·lar</a>
    </form>
{% endblock %}
```

---

## 14. Excepcions i gestió d'errors

### Per què gestionar excepcions per capes?

Cada capa (view, service, repository) pot llançar errors de naturalesa diferent. Cal capturar-los al lloc adequat i mostrar missatges útils a l'usuari sense exposar detalls interns.

| Capa | Tipus d'error típic | On capturar |
|---|---|---|
| `repository.py` | `DoesNotExist`, `IntegrityError` | `repository.py` o `service.py` |
| `services.py` | Errors de negoci, validació | `services.py` |
| `views.py` | Errors d'accés, retornar HTTP 404/500 | `views.py` |

### Excepcions habituals de Django ORM

```python
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError

# ObjectDoesNotExist / Model.DoesNotExist
try:
    usuari = Usuari.objects.get(id=pk)
except Usuari.DoesNotExist:
    # L'usuari amb aquest id no existeix

# IntegrityError (camp únic duplicat, FK inexistent...)
try:
    form.save()
except IntegrityError:
    # Error de restricció a la base de dades
```

### Exemple complet per capes

```python
# repository.py
from django.core.exceptions import ObjectDoesNotExist

def get_usuari_by_id(pk):
    try:
        return Usuari.objects.get(id=pk)
    except Usuari.DoesNotExist:
        return None
```

```python
# services.py
from . import repository

class UsuariNoTrobat(Exception):
    pass

def obtenir_usuari(pk):
    usuari = repository.get_usuari_by_id(pk)
    if usuari is None:
        raise UsuariNoTrobat(f"No existeix cap usuari amb id {pk}")
    return usuari
```

```python
# views.py
from django.http import Http404
from . import services
from .services import UsuariNoTrobat

def detall_usuari(request, pk):
    try:
        usuari = services.obtenir_usuari(pk)
    except UsuariNoTrobat:
        raise Http404("L'usuari sol·licitat no existeix")
    return render(request, 'nom_app/detall.html', {'usuari': usuari})
```

### get_object_or_404 (drecera de Django)

Per a casos simples, Django ofereix un shortcut:

```python
from django.shortcuts import get_object_or_404
from .models import Usuari

def detall_usuari(request, pk):
    usuari = get_object_or_404(Usuari, id=pk)
    return render(request, 'nom_app/detall.html', {'usuari': usuari})
```

---

## 15. Allotjament de la base de dades

### Opció recomanada: Neon (PostgreSQL gratuït)

**Neon** ofereix PostgreSQL gestionat amb un pla gratuït permanent, ideal per a projectes de curs:

1. Crear compte a **neon.tech**
2. Crear un nou projecte
3. Copiar la cadena de connexió (`postgresql://user:pass@host/dbname`)
4. Afegir les dades a `settings.py` (o variables d'entorn)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'nom_bd',
        'USER': 'usuari_neon',
        'PASSWORD': 'contrasenya_neon',
        'HOST': 'ep-xxxx.neon.tech',
        'PORT': '5432',
        'OPTIONS': {'sslmode': 'require'},
    }
}
```

### Opció avançada: Oracle Cloud (VM gratuïta)

Oracle Cloud ofereix una **màquina virtual "Always Free"** on es pot desplegar tot el projecte amb Docker:

**Passos principals:**

1. Crear compte a **cloud.oracle.com** (requereix targeta de crèdit, però no es cobra)
2. Crear una instància de Compute (VM Ubuntu 22.04 — Arm64 — Always Free)
3. Connectar-se per SSH:
   ```bash
   ssh -i clau_privada.pem ubuntu@IP_PUBLICA
   ```
4. Instal·lar Docker a la VM:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker ubuntu
   ```
5. Copiar el projecte a la VM (via `scp` o Git)
6. Engegar el projecte amb Docker Compose
7. Configurar les regles de firewall d'Oracle per obrir el port 8000

> Aquesta activitat es detalla a **ACT09 - Desplegament Oracle Cloud**.

---

## 16. Sessions i manteniment d'estat

### El problema: HTTP no recorda res

Cada petició HTTP és independent: el servidor no sap, per defecte, si dues peticions vénen del mateix usuari. Per mantenir informació entre peticions (un carret de la compra, si l'usuari ha fet login...) calen **sessions**.

Django porta el suport de sessions activat per defecte (`django.contrib.sessions` ja apareix a `INSTALLED_APPS`, vegeu §5). Cada visitant rep una **cookie amb un identificador de sessió**; Django guarda les dades associades a aquest identificador al servidor (per defecte, a la base de dades, taula `django_session`).

### Llegir i escriure a la sessió

```python
# nom_app/views.py

def afegir_al_carret(request, producte_id):
    carret = request.session.get('carret', [])   # Llista buida si no existeix
    carret.append(producte_id)
    request.session['carret'] = carret          # Cal tornar-la a assignar perquè Django desi el canvi
    return redirect('veure_carret')

def veure_carret(request):
    carret = request.session.get('carret', [])
    return render(request, 'nom_app/carret.html', {'productes_ids': carret})

def buidar_carret(request):
    request.session.pop('carret', None)   # Elimina la clau si existeix
    return redirect('veure_carret')
```

> **`request.session`** es comporta com un diccionari normal, però Django s'encarrega de guardar-lo i recuperar-lo automàticament a cada petició del mateix navegador.

### Cookies vs. sessions

| | Cookie | Sessió Django |
|---|---|---|
| On es guarden les dades | Al navegador del client | Al servidor (BD per defecte) |
| Mida màxima | ~4 KB | Sense límit pràctic |
| Visible/editable pel client | Sí | No (només l'identificador) |
| Ús típic al curs | Recordar preferències sense dades sensibles | Carret, usuari logat, missatges flash |

### Configuració bàsica (`settings.py`)

```python
SESSION_ENGINE = 'django.contrib.sessions.backends.db'   # Per defecte: BD
SESSION_COOKIE_AGE = 1209600   # 2 setmanes, en segons
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
```

---

## 17. Autenticació completa: login, logout i protecció de vistes

El model d'usuari (§10) ja permet crear usuaris; ara cal la part que falta: **que un usuari es pugui identificar i que algunes vistes només siguin accessibles si ha fet login**.

### Vista de login amb `AuthenticationForm`

```python
# nom_app/views.py
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect

def login_vista(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            usuari = form.get_user()
            login(request, usuari)          # Crea la sessió de l'usuari
            return redirect('inici')
    else:
        form = AuthenticationForm()
    return render(request, 'nom_app/login.html', {'form': form})

def logout_vista(request):
    logout(request)                          # Elimina la sessió
    return redirect('inici')
```

### Protegir vistes: `@login_required`

```python
from django.contrib.auth.decorators import login_required

@login_required(login_url='login')
def zona_privada(request):
    return render(request, 'nom_app/zona_privada.html', {'usuari': request.user})
```

Dins de qualsevol vista o plantilla es pot consultar l'usuari actual:

```python
request.user                    # Objecte User (o AnonymousUser si no ha fet login)
request.user.is_authenticated   # True/False
```

```html
{% if user.is_authenticated %}
    <p>Hola, {{ user.username }}</p>
    <a href="{% url 'logout' %}">Tancar sessió</a>
{% else %}
    <a href="{% url 'login' %}">Iniciar sessió</a>
{% endif %}
```

### Restringir per rol (reutilitzant el camp `rol` de §10)

```python
from django.core.exceptions import PermissionDenied

@login_required
def panell_professor(request):
    if request.user.perfil.rol != 'professor':
        raise PermissionDenied("Només els professors poden accedir aquí")
    return render(request, 'nom_app/panell_professor.html')
```

> Quan es llança `PermissionDenied`, Django respon amb un **403 Forbidden**: l'usuari ha iniciat sessió, però no té permís. És diferent de `@login_required`, que, si l'usuari no ha iniciat sessió, el **redirigeix** a la pàgina de login.

---

## 18. Sintaxi bàsica de Python

> La sintaxi de Python (tipus, operadors, condicionals, bucles, llistes, tuples, diccionaris, funcions i POO) és al document **[`python_basics.md`](python_basics.md)**.

---

## 19. Proves i depuració del codi (Per activitats, però no per exàmens)

### Per què provar el codi?

Cada canvi a `models.py`, `services.py` o `views.py` pot trencar alguna cosa que ja funcionava. Les **proves automatitzades** permeten executar en segons tot un conjunt de comprovacions i saber immediatament si alguna cosa s'ha trencat.

### `TestCase` de Django (basat en `unittest`)

Cada aplicació ja porta un fitxer `tests.py` (vegeu l'estructura a §6):

```python
# nom_app/tests.py
from django.test import TestCase
from .models import Usuari

class UsuariModelTest(TestCase):

    def setUp(self):
        self.usuari = Usuari.objects.create(
            nom="Marta", cognom="Puig", email="marta@test.com", edat=23
        )

    def test_str_retorna_nom_complet(self):
        self.assertEqual(str(self.usuari), "Marta Puig (alumne)")

    def test_es_pot_filtrar_per_rol(self):
        alumnes = Usuari.objects.filter(rol='alumne')
        self.assertEqual(alumnes.count(), 1)
```

```python
# nom_app/tests.py — provant una vista
from django.test import TestCase, Client

class VistesTest(TestCase):

    def setUp(self):
        self.client = Client()

    def test_llista_usuaris_respon_200(self):
        resposta = self.client.get('/usuaris/')
        self.assertEqual(resposta.status_code, 200)
```

**Executar les proves:**

```bash
python manage.py test
```

### Depuració (*debugging*)

| Tècnica | Ús |
|---|---|
| `print()` | Ràpid, però cal recordar treure'l abans de fer commit |
| `logging` (vegeu `02_django_rest_framework_teoria.md` §9) | Persistent, amb nivells (`DEBUG`, `INFO`, `ERROR`) |
| `breakpoint()` | Atura l'execució i obre una consola interactiva (`pdb`) en aquell punt exacte |
| `DEBUG = True` a `settings.py` | Django mostra la traça completa de l'error al navegador (només en desenvolupament!) |

```python
def calcular_estadistiques():
    usuaris = repository.get_all_usuaris()
    breakpoint()   # L'execució s'atura aquí; es pot inspeccionar 'usuaris' des del terminal
    total = len(usuaris)
    return total
```

### Documentar el codi

Una funció ben documentada explica **què fa i què retorna**, no com ho fa (això ja ho diu el codi):

```python
def calcular_estadistiques(usuaris):
    """
    Calcula el nombre total d'usuaris i el desglossament per rol.

    Retorna un diccionari amb les claus 'total', 'professors' i 'alumnes'.
    """
    ...
```
