# Makefile for Club Funding technical Test App
# Author : Alan HEDOUX.

up:
	docker compose up -d

down:
	docker compose down

install:
	docker exec -it laravel_app composer install

migrate:
	docker exec -it laravel_app php artisan migrate

migrate-fresh:
	docker exec -it laravel_app php artisan migrate:fresh

migrate-fresh-seed:
	docker exec -it laravel_app php artisan migrate:fresh --seed

bash:
	docker exec -it laravel_app bash

test:
	docker exec -it laravel_app php artisan test

test-front:
	docker exec -it react_app npm run test
