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