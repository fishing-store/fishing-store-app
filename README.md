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

Install Django apps

```bash
python fishingstore/manage.py migrate
```

If data model has changed update it

```bash
python fishingstore/manage.py makemigrations fishingstoreapp
```

To generate data model as SQL

```bash
python fishingstore/manage.py sqlmigrate fishingstoreapp 0001
```

# instalation windows

```
python -m venv env
env\Scripts\activate.bat
python -m pip install -r requirements.txt
python -m pip freeze > requirements.txt
python .\fishingstore\manage.py migrate
python .\fishingstore\manage.py runserver
```
