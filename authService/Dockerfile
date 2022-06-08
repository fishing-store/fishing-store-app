FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN pip install --upgrade pip
RUN pip install -r /requirements.txt

COPY ./ /authService
WORKDIR /authService

RUN python manage.py migrate
RUN DJANGO_SUPERUSER_USERNAME=testuser \
DJANGO_SUPERUSER_PASSWORD=testpass \
python manage.py createsuperuser --noinput --email admin@example.com

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
