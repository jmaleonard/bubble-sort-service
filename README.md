# Bubble Sort Service

[![Build Status](https://travis-ci.org/jmaleonard/bubble-sort-service.svg?branch=master)](https://travis-ci.org/jmaleonard/bubble-sort-service)

Bubble Sort Service is a service that implements the bubble sort as service. It can be run in various ways.

  - Locally by using local installed version of Node
  - Docker Container that exposes a server
  - Run locally within a docker container by providing an array as an env vairable (BUBBLE_SORT_ARRAY)

### Tech

Bubble Sort Service uses a number of open source projects to work properly:
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [eslint](https://eslint.org/) - The pluggable linting utility for JavaScript and JSX
* [husky](https://www.npmjs.com/package/husky) - Git hooks made easy
* [Docker](https://www.docker.com/) - Building and Running Containers
* [node-docker](https://github.com/tarampampam/node-docker) - Small Docker Image to run node application - tarampampam/node:alpine
* [Jest](https://jestjs.io/) - Unit Testing
* [TravisCI](https://docs.travis-ci.com) - CI Server
* [DockerHub](https://cloud.docker.com/repository/docker/jmaleonard/bubble-sort-service) - AutoBuilds Docker Container on Commit

And of course bubble-sort-service itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Bubble Sort Service requires [Node.js](https://nodejs.org/) v6+ to run.

To build the container locally

```sh
$ cd bubble-sort-service
$ yarn
$ yarn clean-build-docker
```

Install the dependencies and devDependencies and start the server.

```sh
$ cd bubble-sort-service
$ yarn
$ yarn docker-run
```
Once you have it up and running you can simply test it by 

```sh
$ curl -X POST \
  http://localhost:8000/bubblesort \
  -H 'Content-Type: application/json' \
  -d '{"unsortedArray":[6, 2, [4, 3],[[[5], null], 1],6, 2, [4, 3],[[[5], null], 1],6, 2, [4, 3],[[[5], null], 1],6, 2, [4, 3],[[[5], null], 1]]}'
```
Your respone will be a sorted array

To start the process locally and provide an array to sort edit the package.json file and simply run.

```sh
$ cd bubble-sort-service
$ yarn
$ yarn docker-run-local
```

Other commands include docker-run-with-max-items that allows you to specify the number of items the bubble-sort-service will support.
If no value is provided it defaults to 10000

```sh
$ cd bubble-sort-service
$ yarn
$ yarn docker-run-with-max-items
```
 The raw command for this is 
 
 ```sh
$ docker run -e MAX_AMOUNT_OF_ITEMS_PER_ARRAY=100000 -p 8000:8000 -d bubble-sort-service
```
# Extra Added Features!
In the repo you will see there is a folder labelled Cloudformation
  - This contains a CF Template that can be used in conjunction with the serverless framework to rapidly deploy bubble-sort-service to cloud infrastructure.
  - The template contains 3 resources:
    - BubbleSortRole - Dictates the permissions for our service
    - BubbleSortRoleInstaceProfile - Attaches BubbleSortRole to a Instance Profile
    - EC2InstanceBubbleSort - Is the EC2 Machine that will run the docker container that expects some parameters
        -  InstanceType - The instance type: t2.nano should be suffienct
        -  KeyName - Our SSH Key which was created in the EC2 Console
        -  UserData: Provides the startup script for our machine when it provisioned. Here it installs docker, pulls jmaleonard/bubble-sort-service and start a container that exposes the service on port 8000
        
- The serverless folder contains a template for our cloudformation stack "bubble-sort-service"
    - Replace call the parameters that are marked as #CHANGE ME 
 
To Run:
  - To Run this template we can use the serverless framework as it provides a nice pattern when using CF
  - Install serverless 
  ```sh
  $ npm install -g serverless
  $ cp -f serverless/EC2_Deployment.yml ./serverless.yml && sls deploy --stage personal --aws-profile personal && rm serverless.yml
  ```

Ways to improve this solution: 

> Add AWS Elastic Load Balancer that will allow us to not expose the EC2 Instaces 
> Add a Launch Configuration that can be used with Auto Scaling so that bubble-sort-service can scale under load
> Add a VPC and place all Instances within the VPC and only exposing traffic through the AWS Elastic Load Balancer
