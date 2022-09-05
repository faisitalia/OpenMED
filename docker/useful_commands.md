# Useful docker commands:

To be used from inside this folder

## To check whatever is running onto your machine

docker ps

## To shutdown whatever is up at the moment

docker compose down -v

## To COMPLETELY erase instances and caches of ALL our containers

docker system prune -a -f --volumes

## To compose our containers and launch them

docker compose up -d --build
