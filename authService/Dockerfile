FROM python:3.8-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN apt update \
 && apt install -y libcurl4-openssl-dev libssl-dev gcc \
 && rm -rf /var/lib/apt/lists/* \
 && pip install -r /requirements.txt \
 && useradd auth_be --user-group \
 && mkdir /backend \
 && chown -R auth_be:auth_be /backend

USER auth_be

COPY ./ /backend
WORKDIR /backend

EXPOSE 7004
