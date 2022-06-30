# Full Stack Application scaffold

author: Darius DeSpain (gihub user: darius-despain)

This repo is designed to aid in speeding up development of a full-stack application by giving a running scaffold with a react front-end, express server, and datbase.

## To set up application:

clone this repository

    git clone <url>

Replace placeholder db name in docker-compose.yml (optional)
- several lines read dailyblogger_db, replace them with a new name if desired. (must ensure this is done before initialization of docker volumes, otherwise you will have to remove the volumes to trigger re-initialization)

*Not sure why we need this next step, but it doesn't work without it*

install dependencies for the api prior to docker-compose

    npm install

install docker on your desktop if you havent already.
- Visit https://docs.docker.com/get-docker/ for more information

check docker is running in the command line

    docker -v

build app using docker-compose (must be in root directory of this repo)

    docker-compose up

You can now view the application at the following URLs

 - UI: localhost:3000

 - API: localhost:8080


## Setup Troubleshooting

- If you get the message, ```PostgreSQL Database directory appears to contain a database; Skipping initialization```, followed by the error, ``` FATAL:  database "[db name]" does not exist```, then you likely changed the name of the database, which is fine, but you need to re-initialize the database now to make the new name take effect.

  - remove the volume from docker, this will trigger re-initialization. The first way uses compose down and will destroy the volume after it is finished.

        docker-compose down --volumes

  - another method for removing the volume manually

        docker volume ls
        docker volume rm [volumeName]
