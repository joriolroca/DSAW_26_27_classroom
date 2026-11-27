# Preparació entorn de treball

## PASSES FETES A CLASSE


1. Crear i clonar Repositori privat:
    - De nom **djangoMVT_sigles**
    - Afegir com a col·laboradors **joriolroca** i **rsobrinog**.
    - Crear branca **mvt_Aav1**.
2. Instal·lar Docker
    - **Docker engine** per Linux
    - **Docker Desktop** per Windows
3. Instal·lar Python3
    - Les comandes de python en Linux son **python3 -m...**.
    - Les comandes de Python en Windows son **py -3.13 -m...** (per exemple, `py -3.13 -m venv venv`). La comanda `py3` no existeix.
4. Instal·lar Virtualenv (venv)
    - Es pot crear l'entorn en una carpeta normal **venv**
    - Es pot crear l'entorn en una carpeta oculta **.venv**
5. Crear issue a Github

## OBJECTIUS

- Crear un entorn virtual (venv) amb Python 3.12
- Instal·lar Django i psycopg2-binary
- Configurar la connexió a PostgreSQL via Docker
- Fer el primer commit i pujar la branca a GitHub

## Part 1 — Preparació de l'entorn (NO AVALUABLE)

### 1.1 Crear el repositori a GitHub

1. Ves a GitHub i crea un repositori **privat** nou anomenat `djangoMVT_sigles(CognomCognomNom)`.  
Exemple: el nom del meu repositori (Roger  Sobrino Gil) seria **djangoMVT_SGR**
2. Afegir de Col·laborador a **rsobrinog** i **joriolroca**.

### 1.2 Clonar i preparar el directori

Crear una carpeta de nom **backend** i ubicar-se a aquesta carpeta amb la terminal de VSCode. Clonar el repositori amb les següents comandes:

```bash
git clone url-del-repositori-creat
# Ubicar-se dintre del projecte
cd nom_repositori
```

### 1.3 Crear l'entorn virtual

```bash
python3 -m venv venv_django # Linux. Windows cal canviar python3 per py3 o py
source venv_django/bin/activate    # Linux/Mac
venv_django\Scripts\Activate.ps1     # Windows
```

Verifiqueu que esteu dins l'entorn virtual: la terminal ha de mostrar `(venv_django)` o semblant (depenent del nom que li hageu posat al venv).

### 1.4 Crear branca en git i instal·lar les dependències

Crear una branca de git (segons activitat) per gestionar les versions de l'activitat.
```bash
git branch mvt_Aav1
```
Abans de crear el projecte, situa't a la branca creada 

```bash
git switch mvt_Aav1
```

Instal·lació de les dependències i creació del fitxer requirements.txt (havent verificat que estàs treballant amb l'entorn virtual actiu `(venv_django)`)

```bash
pip install Django==5.1
pip install psycopg2-binary
pip freeze > requirements.txt #Es crea el fitxer requirements.txt amb la versió de les llibreries instal·lades
```

### 1.5 Crear el .gitignore

Crear el fitxer `.gitignore` a l'arrel del repositori:

```
venv_django/
__pycache__/
*.pyc
.env
db.sqlite3
*.log
```

---

## Part 2 — Base de dades amb Docker (NO AVALUABLE)

### 2.1 Crear el docker-compose.yml

Dintre de la carpeta del repositori crear el fitxer **docker-compose.yml** amb el següent contingut:

```yaml
services:
 db:
   image: postgres:13
   container_name: db_django
   environment:
     - POSTGRES_DB=biblioteca_db
     - POSTGRES_PASSWORD=biblioteca_pass
     - POSTGRES_USER=biblioteca_user
   ports:
     - "5432:5432"
   volumes:
     - local_pgdata:/var/lib/postgresql/data
 pgadmin:
   image: dpage/pgadmin4
   container_name: pg_django
   ports:
     - "80:80"
   environment:
     PGADMIN_DEFAULT_EMAIL: admin@django.com
     PGADMIN_DEFAULT_PASSWORD: admin
   volumes:
     - pgadmin-data:/var/lib/pgadmin
volumes:
 local_pgdata:
 pgadmin-data:
```
> Vigileu al copiar el contingut ja que es pot copiar en un format incorrecte i que la indentació sigui diferent.

Per utilitzar docker(https://docs.docker.com/) al teu PC, visita la pàgina web i busca com instal·lar **docker-desktop** per windows o **docker engine** per Linux.

### 2.2 Engegar el contenidor

Un cop instal·lat i creat el fitxer **docker-compose.yml** ja es pot engegar el contenidor des de la terminal.

**RECOMANACIÓ** Si feu servir windows, la terminal **git bash** us pot ajudar a evitar mals de cap amb git i python.

Amb aquesta comanda aixequem els serveis del **yml**.

```bash
docker compose up -d #windows
sudo docker compose up -d #linux
```

Verifiqueu que el contenidor funciona:

```bash
docker ps #windows
sudo docker ps #linux
```


## FALTA A FER. Ho farem a classe 

### GRUP A

1. Instal·lar Docker 
    - **Docker engine** per Linux
    - **Docker Desktop** per Windows
2. Instal·lar django, psycopg2 i requirements
3. Crear .gitignore
4. Issues amb Github

Crear issue a Github i posar aquestes tasques indicant quines s'han aconseguit fer. Copiar la issue del .md i no del preview:

- [ ] El projecte funciona i mostra el catàleg de llibres a `/catalog/list_all`.
- [ ] El fitxer **docker-compose.yml** està al repositori amb les dades de la BD i l'executable de l'activitat (seguir desplegament.md).
- [ ] El model `Llibre` existeix i les migracions estan aplicades i pujades al Github.
- [ ] La branca `mvt_Aav1` és a GitHub i s'ha fusionat a la branca main.
- [ ] El fitxer de l'activitat conté les respostes a les preguntes.
- [ ] El `requirements.txt` inclou totes les dependències.


### GRUP B

1. Issues amb Github

Crear issue a Github i posar aquestes tasques indicant quines s'han aconseguit fer. Copiar la issue del .md i no del preview:

- [ ] El projecte funciona i mostra el catàleg de llibres a `/catalog/list_all`.
- [ ] El fitxer **docker-compose.yml** està al repositori amb les dades de la BD i l'executable de l'activitat (seguir desplegament.md).
- [ ] El model `Llibre` existeix i les migracions estan aplicades i pujades al Github.
- [ ] La branca `mvt_Aav1` és a GitHub i s'ha fusionat a la branca main.
- [ ] El fitxer de l'activitat conté les respostes a les preguntes.
- [ ] El `requirements.txt` inclou totes les dependències.