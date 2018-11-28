
# Run frontend

1) Open terminal > Go to OSS folder
2) Type: npm start > This will start the node application on port 8000
3) Go on your browser and type: localhost:8000
4) This will give the html file

# Run Mock Back-end to see the card placement
1) Go into Mock-back end folder and type 'npm start'
2) Make sure both front and back end servers are running to see the changes

# Running local environment

To start the local database run the following:
    `make docker-up`

To stop the local database run the following:
    `make docker-down`

## Database parameters:

    - user: pgadmin
    - pass: docker
    - db: oss
    - url: localhost
    - port: 5432


NOTE: Local environment does not store data persistently. When docker is shutdown all data in the db will be lost

## View database with adminer

You can view the db through a visual tool called adminer. To access it navigate to localhost:3001 while the local docker environment is running. Use the above database parameters to login. 
