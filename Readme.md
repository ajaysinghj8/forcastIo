## Weather ForcastIO v2

The Project is wrriten in typescript, i personally perfer typescript because it is easy to use, provide
contracts between multiple modules.

### Configuation


### Scripts

### Dependencies


### File Structures
<pre>
 .
├── Dockerfile
├── Readme.md
├── config.json
├── deployToDocker.sh
├── docker-compose.debug.yml
├── docker-compose.yml
├── package.json
├── source
│   ├── Controllers
│   │   ├── index.ts
│   │   └── weatherCtrl.ts
│   ├── Routes
│   │   ├── index.ts
│   │   └── weather.ts
│   ├── Services
│   │   ├── cache.ts
│   │   ├── config.ts
│   │   ├── forcastioApi.ts
│   │   ├── googleGeoCodeApi.ts
│   │   ├── index.ts
│   │   └── request.ts
│   ├── index.ts
│   ├── server.ts
│   └── test
│       ├── Services
│       │   ├── cache.specs.ts
│       │   ├── forcastIo.specs.ts
│       │   └── googleGeoCodeAPi.specs.ts
│       └── app
│           └── app.specs.ts
├── start.sh
├── static_assests
│   └── js
│       ├── main.js
│       └── moment.min.js
├── tsconfig.json
├── tslint.json
├── views
    ├── 404.ejs
    └── index.ejs



</pre>


### Some thoughts
Some optimization can be done as the results from darksky.net can be some how cached.
The more effective approach would be using IOC with inversify (npm package), which provide
good dependency injection and mocking of modules would be extermly easy.


### Efforts
~ 22 Hours
