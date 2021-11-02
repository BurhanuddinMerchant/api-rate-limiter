# API Rate Limiting Middleware

A rate limiting solution for API's where the server itself is constrained to a Rate Limited API

## There are Two ways To Get Started With:

1.  Using **Docker** :whale:
2.  Using **npm/yarn**

<hr></hr>

### Method 1 - If you have Docker And Docker Compose Installed on your system:

Change permissions for the entrypoint,logs and exit file

```console
foo@bar:~$ chmod +x ./entrypoint.sh
foo@bar:~$ chmod +x ./logs.sh
foo@bar:~$ chmod +x ./exit.sh
```

To start the application :

```console
foo@bar:~$ ./entrypoint.sh
```

To get logs :

```console
foo@bar:~$ ./logs.sh
```

To stop the application :

```console
foo@bar:~$ ./exit.sh
```

The docker and docker-compose commands are added to these files

you can also manually start the server using docker-compose

```console
foo@bar:~$ sudo docker-compose up
```

<hr>

### Method 2 : Using NPM/YARN:

**Note** : Make sure you have '**npm**' or '**yarn**' installed on your local machine

To test the project on your local machine run :

```console

foo@bar:~$ npm install

```

alternatively

```console

foo@bar:~$ yarn install

```

**create** a **.env** file which should contain the following **environment variables** configured :

- **PORT**=3000

- **REDIS_PORT**=6379

- **REDIS_HOST**=localhost

To spin up the server run :

```console

foo@bar:~$ npm run dev

```

This will fire off :rocket: the 'dev' script which will spin a local server on your machine on port PORT_NUMBER

  <hr></hr>

To use the API, use this URL as your base URL :

http://localhost:PORT_NUMBER

To Test the Rate Limiting Feature go to:

http://localhost:3000/api/getData

On Your Browser, and try hitting the url 20 times within a minute, on crossing that threshold within a minute, you won't be able to access that endpoint.

As Redis is ACID compliant, it ensures that the rate is never exceded,as at one given time only one updation is allowed to a single resource.

<b>NOTE : This will limit the requests to 20 as a whole instead of tracking for individual users</b>

## System Architecture

![System Architecture (can be found in root "system_architecture.png")](https://github.com/BurhanuddinMerchant/api-rate-limiter/blob/main/system_architecture.png?raw=true)

### Happy Coding :wink: !!
