build:
	docker-compose build

start:
	docker-compose up

stop:
	docker-compose down

test: start
	cd service && npm test