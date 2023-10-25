# macid-authentication-example

### Description
A sample project that shows developers how they can add Single Sign-On (SSO) to their Next.js single-page application to allow users to sign using their MacID credentials.

## Build

### Requirements

- [Docker](https://docs.docker.com/engine/install/) 20.10 or newer
- [docker-compose](https://docs.docker.com/compose/install/) 1.29 or newer

### Usage

To build and run the container, simply run:
```bash
docker-compose -p $USERNAME-container --env-file config/.env.development.local up --build
```

`.env.development.local` or `.env.*.local` in the `config` directory is an environment file containing all environment variables required by the docker images (and `next`), including:

- `HOST_PORT`
- `MAC_AZURE_CLIENT_ID`
- `MAC_AZURE_TENANT_ID`
- `MAC_AZURE_REDIRECT_URI`

You may duplicate the `.env.sample` file and fill out the variables to create your own environment file.

By default, the Next.js frontend service (`app`) will attach at port 3000 and Flask backend service (`server`) will attach at port 5000 on the host.

When working on the development server, you will first need to fill in the port number for which the NGINX service is attached to the server in `docker-compose.yaml` using the environment variable `HOST_PORT`.

Please also refer to the `README.md` files in [`client/`](client/README.md) and [`nginx/`](nginx/README.md).

### Production Usage

To build and run the container in a production environment, simply run:
```bash
docker-compose --file docker-compose.production.yaml --env-file config/.env.production.local up --build
```
