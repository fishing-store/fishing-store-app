# Build docker
docker build -t auth_service .

# Run docker on default port (hostPort:containerPort)
docker run -p 8000:8000 auth_service
