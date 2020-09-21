# full stack web app

to connect both React and NodeJs (ExpressJs) you nwwd to follow these steps

```
$ npm init
```

or you can use the default initial by using

```
$ npm init -y
```

then you need to install some packages

```
$ npm i express
$ npm i nodemon --save-dev
$ npm i concurrently

```

for sure you need to create **.gitignore** , **.env** and then create folder server

to create React app you need to run, here we name our app clinet

```
$ npx create-react-app client
```

so your directory should look like

```
Project
│   README.md
│   package.json
|   package-lock.json
└───server
│   └───server.js
│   │
|   └───app.js
│   │
|   └───models
│   │
|   └───controllers
└───client
    │   README.md
    │   package.json
    |   package-lock.json
    └─── public.js
    |
    └───src
        └───main.scss


```

in **package.json** you need to add some scripts, where we run both front-end server and back-end server on the same time using concurrently package

```"scripts": {
    "start": "node server/server.js",
    "server": "nodemon server/server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently  \"npm run server\" \"npm run client\""
  },
```

in **package.json** on clinet directory we need to add proxy to fetch from our server

```
 "proxy": "http://localhost:5000"
```

Lastly you need to run

```
$ npm run dev
```

for farther steps refer to our [live-coding example ](https://github.com/FBw-26/live-coding/tree/master/sep/21-09)
