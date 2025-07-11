# Makefile for Club Funding technical Test App
# Author : Alan HEDOUX.

up:
	docker compose up -d

down:
	docker compose down

install:
	docker exec -it laravel_app composer install

bash:
	docker exec -it laravel_app bash

console:
	docker exec -it laravel_app php artisan

test:
	docker exec -it laravel_app php artisan test
