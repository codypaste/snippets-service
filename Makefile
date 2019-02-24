IMAGE_TAG ?= latest

build-image:
	docker build -t 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-snippets-service:$(IMAGE_TAG) .

publish-image:
	docker push 140303875034.dkr.ecr.eu-west-1.amazonaws.com/codypaste-snippets-service:$(IMAGE_TAG)

npm:
	cd ./service && npm i

start: build-image
	docker-compose up -d

stop:
	docker-compose down

test:
	cd service && npm test

deploy-development:
	cd service && PRISMA_ENDPOINT=http://localhost:4466/codypaste/development npm run deploy

generate:
	cd service && npm run deploy