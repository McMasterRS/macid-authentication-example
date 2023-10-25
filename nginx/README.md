# NGINX

NGINX is a web server instance that acts as a reverse proxy for Flask to handle client requests as well as serve up statics files of the Next.js frontend.

## Routing Configuration

The production configuration is stored in `template-nginx.prod.conf`.

### `proxy_pass` setting

The most important configuration step in an NGINX reverse proxy configuration is the addition of a `proxy_pass` setting that maps an incoming URL request to the servers in the Docker images.

```
server {
    listen          8080;
    server_name     localhost;

    location / {
        proxy_pass        http://client:3000/;
    }
}
```

In the example above, the server is running on localhost at port 8080. The `proxy_pass` is configured in the `location` section of the configuration file. The `client` refers to the Docker image containing the Next.js frontend and the `api` refers to the Docker image containing the Flask beckend.

When an URL request `localhost:8080/` is made to the server, it would request and return the static files served in the `localhost` of the `client` Docker image. And when an URL request `localhost:8080/api` is made to the server, it would request an API call from `localhost` of the `api` Docker image. This API call would respect the route configuration in the Flask backend, for example, an URL request, `localhost:8080/api/hello`, would request the `/hello` service from the Flask backend hosted in the `localhost` of the `api` Docker image.

## References

- [Dockerizing Flask with Postgres, Gunicorn, and Nginx](https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx/)
- [How to setup an Nginx reverse proxy server example](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/How-to-setup-Nginx-reverse-proxy-servers-by-example)
- [Gitlab CI/CD for Dockerize Flask and NextJS application](https://martinlabs.me/blog/ci-cd-flask-nextjs-docker)
- [How to dockerize a flask python application](https://www.clickittech.com/devops/dockerize-flask-python-application/)