## Postgres - Express.js - React.js Boilerplate

### Introduction

This is a PREN-Stack Dockerized boilerplate.
A vanilla infrastructure made to simplify the develpoment and deploying processes using pern stack and docker.

### Prerequisites

Make sure you have the below installed on your machine.

- [x] **Docker** : https://docs.docker.com/engine/install/
- [x] **Docker-Compose** : https://docs.docker.com/compose/install/
- [x] **Node** : https://nodejs.org/en/

### File strcutre

```
project-name
    |
    |---/ client
            |
            |---/ public
            |---/ src
            |
            .env
            .dockerignore
            .gitignore
            Dockerfile
            Dockerfile.dev
            nginx.conf
            tsconfig.json
            package.json
    |
    |---/ database
            .env
            initdb.sql
            .gitignore
    |---/ server
            |
            |---/ config
            |---/src
            |
            .env
            .dockerignore
            .gitignore
            Dockerfile
            Dockerfile.dev
            nodemon.json
            package.json
            wait-for-it.sh
    |
    |
    docker-compose.yml
    docker-compose-dev.yml
    .prettierrc
    README.md
```

### Quick start

Clone this repo to your local machine

```
git clone https://github.com/nadavpodjarski/postgres-express-react-typescript-boilerplate.git project-name
```

Run the following command to check this demo

```
cd project-name/ && sudo docker-compose --file docker-compose-dev.yml up
```

it will be served on `http://localchost:3000`
**Replace project-name with your own**

## Client

Client has been created with create-react-app and located in `./project-name/client`

#### Development

In develpoment mode the client will be run in a container built with `./client/Dockerfile.dev` and will be exposed on port 3000, with docker volumes every change thats been saved will be reflected within the running container.

#### Production

In production mode the client build will be created and will run in a container built with `./client/Dockerfile`.
The client build/static-files will be served with nginx server and will be exposed on port 80.

#### Environment Variables

Enviornment variables are located in `./client/.env` but can be declared into the dockerfile itself under ENV or in the docker compose file under enviornemt property.
**In order to use docker stack deploy** its needed to use one of the other options and not env_file.

**note that nginx server has a minimalistic configuration**

## Data-base

Postgres data-base is created with an official postgres image which can be found in docker hub https://hub.docker.com/_/postgres
the data-base will be initialized with `./database/initdb.sql` script. feel free to change it to your own needs.

Enviornment variables will be located in `./database/.env`
and will contain our database credentials :

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=pern_db
```

Volumes of our database will be located in `./database/data`

> Production volume is located in `./data/prod` > </br>
> Development volume is located in `./data/dev`

## Server

Server is located in `./projec-name/server` using express.

#### Development

In development mode the server will run in a container built with `./server/Dockerfile.dev`.
and will be exposed on port 5500 to the "outside" world, with docker volumes and nodemon, every change thats been saved will be refelected within the running container.

#### Production

In production mode the server will run in a container built with `./server/Dockerfile`.
and be exposed on port 5500 only to the docker composer internal services within the same network.
in our case server and client are on the same network "webapp" , hence only the client can communicate with the server.

#### Environment

Enviornment variables will be located in `./server/.env`
and will contain postgres credentials to establish connection to our data-base.
Thanks to https://github.com/vishnubob/wait-for-it for the wait-for-it.sh script, we can set that the server image will run only after getting confirmation that postgres container is available.
by that we wont get connection failures due to bad order of docker composing.

## Docker compose

### Development

To establish a development environment, simply run the following command from the project root folder.

```
sudo docker-compose --file docker-compose-dev.yml up
```

On save changes in client and server, containers will be automatically updated, no need to restart any servers.
</br>

### Production

To establish production environment, simply run the following command from the root folder.

```
sudo docker-compose up
```

This will creates build for both server and client, will serve client build with nginx server on port 80 and will communicate with server on port 5500 in the location /api.

## Demo

Demo is a simple Todolist using React and Material-UI on client side, express on backend and postgres as our database
demo can be started in development mode and in production mode as well.

<img src="./demo1.png" style="box-shadow 0px 10px 10px rgba(0,0,0,0.3);" />

## Enjoy
