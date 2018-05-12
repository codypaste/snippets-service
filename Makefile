build:
	docker-compose build

start:
	docker-compose up

start-for-tests:
	docker-compose up -d 

stop:
	docker-compose down

test: start-for-tests
	cd service && npm test