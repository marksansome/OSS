docker-up:
	docker-compose -f ./sql/docker-compose.yml up -d

docker-down:
	docker-compose -f ./sql/docker-compose.yml down