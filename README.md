# fishing-store-app

## Enviroment setup

Initialize venv

```bash
python -m venv env
```

Activate venv

```bash
source ./env/Scripts/activate
```

Install dedependencies

```bash
python -m pip install -r requirements.txt
```

If you added some dependencies this command might be usefull

```
python -m pip freeze > requirements.txt
```

### Load envs

Copy `.env.example` to `.env.local` for local use then load it with f.e direnv, next copy `.env.example` to `.env.development` for docker

https://direnv.net/


## Django setup

```bash
cd fishingstore
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate
```

### Run
```bash
python manage.py runserver
```

To generate data model as SQL
```bash
python fishingstore/manage.py sqlmigrate fishingstoreapp 0001
```
## Docker
If we want to run backend + db in docker containers we can use
```bash
docker-compose -f docker-compose.dev.yml up -d
```

## Database

Only run db in docker
```bash
docker-compose -f docker-compose.dev.yml up -d postgres
```

# Windows installation

## Setup venv
```bash
python -m venv env
env\Scripts\activate.bat
```

## Setup Django
```bash
cd .\fishingstore
python -m pip install -r requirements.txt
python -m pip freeze > requirements.txt
python manage.py makemigrations
python manage.py makemigrations api
python manage.py migrate
```

## Setup Django
```bash
python manage.py runserver
```