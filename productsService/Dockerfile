FROM python:3.8-slim-buster


COPY ./requirements.txt /requirements.txt

RUN apt update \
 && apt install -y libcurl4-openssl-dev libssl-dev gcc \
 && rm -rf /var/lib/apt/lists/* \
 && pip install -r /requirements.txt \
 && useradd products_service_be --user-group \
 && mkdir /backend \
 && chown -R products_service_be:products_service_be /backend

USER products_service_be

COPY ./ /backend
WORKDIR /backend

USER root
# RUN chmod -R a+X /backend/media/images

EXPOSE 7000
