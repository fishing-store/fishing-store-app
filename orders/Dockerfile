FROM python:3.8-slim-buster


COPY ./requirements.txt /requirements.txt

RUN apt update \
 && apt install -y libcurl4-openssl-dev libssl-dev gcc \
 && rm -rf /var/lib/apt/lists/* \
 && pip install -r /requirements.txt \
 && useradd orders_be --user-group \
 && mkdir /backend \
 && chown -R orders_be:orders_be /backend

USER orders_be

COPY ./ /backend
WORKDIR /backend

EXPOSE 7001
