# macid-authentication-php-example

A sample project that shows developers how they can add Single Sign-On (SSO) to their PHP web application to allow users to sign using their MacID credentials.

## Build

### Requirements

- [Docker](https://docs.docker.com/engine/install/) 20.10 or newer
- [docker-compose](https://docs.docker.com/compose/install/) 1.29 or newer

### Usage

Before building the container, duplicate the `config/.env.sample` file to a new file named `config/.env`. Fill out all the information required in the `config/.env` file.  

To build and run the container, simply run:  
```bash
docker-compose -p $USERNAME-container --env-file config/.env --file docker-compose.yaml up --build
```

## Support Guide

This project is created and maintained by the McMaster University Research Software Development Team.  

Please review the following documents to find out how you may contribute or get support.  
- [Support and Help](https://github.com/McMasterRS/.github/blob/main/SUPPORT.md)
- [Contributing Guidelines](https://github.com/McMasterRS/.github/blob/main/CONTRIBUTING.md)
- [Security Policy](https://github.com/McMasterRS/.github/blob/main/SECURITY.md)

You might also want to reach out to [Information Security for Researchers (IS4R)](https://informationsecurity.mcmaster.ca/people/researchers/) or refer to their [SSO guideline](https://informationsecurity.mcmaster.ca/macid-authentication-options-at-mcmaster-university/).  
