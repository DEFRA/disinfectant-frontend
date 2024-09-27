# Disinfectant-Frontend

## Project Overview

This project serves as a frontend for the Core Delivery Platform(CDP), utilising Node.js for the server-side functionslity. It provides an easy-to-use interface for managing CDP services, with built-in support for caching, Redis integration, and Docker-based development environments.

Core delivery platform Node.js Frontend Template.

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Redis](#redis)
- [Server-side Caching](#server-side-caching)
- [Local Development](#local-development)
  - [Setup](#setup)
  - [Development](#development)
  - [Local JSON API](#local-json-api)
  - [Production](#production)
  - [Npm scripts](#npm-scripts)
- [Docker](#docker)
  - [Development Image](#development-image)
  - [Production Image](#production-image)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v18` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd disinfectant-frontend
nvm use
```

## Redis

Redis is an in-memory key-value store. Every instance of a service has access to the same Redis key-value store similar to how services might have a database (or MongoDB). All frontend services are given access to a namespaced prefixed that matches the service name. e.g. `my-service` will have access to everything in Redis that is prefixed with `my-service`.

Redis has been **disabled** in newly created services by setting the `redis.enabled` property to `false`. The CDP platform team have to inject Redis configuration into your service first. Your service will death-loop if Redis is enabled without speaking to us first.

> [!IMPORTANT]
> If enabling Redis, contact the CDP Platform Team first. Deploying your service with Redis enabled, before we've injected Redis configuration will cause your service to death-loop.

## Server-side Caching

We use Catbox for server-side caching. Specifically CatboxRedis, the Redis adapter for CatBox. It is important that in memory caching isn't used for server-side caching as this will cause issues when there is more than one instance of your service running. Server-side caching has been **disabled** in newly created services by setting the `redis.enabled` property to `false`. Please see [Redis](#redis) for more information.

> [!IMPORTANT]
> If you want to enable server-side caching using Catbox, contact the CDP Platform Team first. Deploying your service with Redis enabled, before we've injected Redis configuration will cause your service to death-loop.

## Local Development

### Setup Instructions

#### Cloning the Repository

To set up the project locally on your machine, follow these steps:

1. open your terminal or command prompt.
2. Navigate to the directory where you'd like to clone the project.
3. Run the following `git` command to the clone repository:

```bash
git clone https://github.com/DEFRA/disinfectant-frontend.git
```

4. After cloning the repository, navigate to the project folder:

```bash
cd disinfectant-frontend
```

[!CAUTION]
Please make sure you have the appropriate Node.js and npm packages installed. For more details, please consult the section above titled `Requirements`.

#### Installing Dependencies

Install application dependencies:

```bash
npm install
```

#### Running the Application

To run the application in `development` mode run:

```bash
npm run dev
```

#### Local JSON API

Whilst the APIs are being developed this app uses a local JSON mock API. To start this locally run:

```bash
npm run mockApi
```

#### Simulate Production Mode

To mimic the application running in `production` mode locally run:

```bash
npm start
```

#### Npm scripts

All available Npm scripts can be seen in [package.json](./package.json)
To view them in your command line run:

```bash
npm run
```

## Docker

### Development image

Build:

```bash
docker build --target development --no-cache --tag disinfectant-frontend:development .
```

Run:

```bash
docker run -p 3000:3000 disinfectant-frontend:development
```

### Production image

Build:

```bash
docker build --no-cache --tag disinfectant-frontend .
```

Run:

```bash
docker run -p 3000:3000 disinfectant-frontend
```

### Docker Compose

A local environment with:

- Localstack for AWS services (S3, SQS)
- Redis
- MongoDB
- This service.
- A commented out backend example.

```bash
docker compose up --build -d
```

## Contributing

If a need to alter/add code to this prject arises, please follow the steps below to contribute:

1. Make sure you have cloned the repository as shown in the `Setup Instructutions` above.
2. Create a new branch with a descriptive name:

```bash
git checkout -b feature/new-feature-name
```

3. Make your changes.
4. Before committing your code, please ensure that your code is properly formatted and free of linting errors. Run the following commands in your code editor terminal in the respecitive order:

```bash
npm run format
```

```bash
npm run lint
```

Address any issues that may have been flagged 5. Commit your changes:

```bash
git commit -m "describe what you have done"
```

6. Submit a pull request and describe your changes

Once your code has been reviewed and tested it will be ready to push to the main branch

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
