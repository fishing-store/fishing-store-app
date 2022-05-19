FROM python:3.8-slim-buster


COPY ./requirements.txt /requirements.txt

RUN apt update \
 && apt install -y libcurl4-openssl-dev libssl-dev gcc \
 && rm -rf /var/lib/apt/lists/* \
 && pip install -r /requirements.txt \
 && useradd fishingstore_be --user-group \
 && mkdir /backend \
 && chown -R fishingstore_be:fishingstore_be /backend

USER fishingstore_be

COPY ./ /backend
WORKDIR /backend

EXPOSE 8000
