build-image:
	docker build -t 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-snippets-service:latest .

publish-image:
	docker push 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-snippets-service:latest

start:
	MONGO_HOST=mongo_database MONGO_PORT=27017 docker-compose up -d

stop:
	docker-compose down

test: start
	cd service && npm test