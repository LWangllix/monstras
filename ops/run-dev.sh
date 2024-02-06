docker build . -f docker/node/Dockerfile  -t biip/zvejyba:dev
docker-compose -f docker-compose-dev.yml up --build -d