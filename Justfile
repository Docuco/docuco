SERVICE := "docuco"

default:
	@just --list

next_upgrade:
	@docker compose run --rm {{SERVICE}} npm i next@latest react@latest react-dom@latest eslint-config-next@latest
	@docker compose run --rm {{SERVICE}} chown -R node:node .

install:
	@docker compose run --rm {{SERVICE}} npm install
	@docker compose run --rm {{SERVICE}} chown -R node:node .

add deps:
	@docker compose run --rm {{SERVICE}} npm install {{deps}}
	@docker compose run --rm {{SERVICE}} chown -R node:node .

lint:
	@docker compose run --rm {{SERVICE}} npm run lint

build:
	@docker compose run --rm {{SERVICE}} npm run build
	@docker compose run --rm {{SERVICE}} chown -R node:node .

start:
	@docker compose run --rm --service-ports {{SERVICE}} npm run start

dev:
	@docker compose run --rm --service-ports {{SERVICE}} npm run dev

back_test_unit:
	@docker compose run --rm {{SERVICE}} npm run back:test:unit

back_test_unit_watch:
	@docker compose run --rm {{SERVICE}} npm run back:test:unit:watch

back_test_unit_coverage:
	@docker compose run --rm {{SERVICE}} npm run back:test:unit:coverage

back_test_unit_watch_coverage:
	@docker compose run --rm {{SERVICE}} npm run back:test:unit:watch:coverage

db_migration_create params:
	@docker compose run --rm {{SERVICE}} npm run db:migration:create -- {{params}}
	@docker compose run --rm {{SERVICE}} chown -R node:node .

db_migration_up:
	@docker compose run --rm {{SERVICE}} npm run db:migration:up

db_migration_down:
	@docker compose run --rm {{SERVICE}} npm run db:migration:down

db_migration_fresh:
	@docker compose run --rm {{SERVICE}} npm run db:migration:fresh

db_seed_create params:
	@docker compose run --rm {{SERVICE}} npm run db:seed:create -- {{params}}
	@docker compose run --rm {{SERVICE}} chown -R node:node .

db_seed_run:
	@docker compose run --rm {{SERVICE}} npm run db:seed:run