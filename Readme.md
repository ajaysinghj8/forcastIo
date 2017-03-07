## Weather ForcastIO v2

This Project is wrriten in typescript, i personally perfer typescript because it is easy to use, provide
contracts between multiple modules, less prone to type errors.

### Configuation

Please Configuation `config.json` file before running any scripts.
```json
  "HOST":"localhost",
  "PORT":3000,
  "GOOGLE_API_KEY":"",
  "FORCAST_API_KEY":""  // provide your forcastio/darksky API key.
```
### Scripts

```bash
./start.sh
```
Above single script will install npm modules, then execute the test cases and after then run the application in debug mode.

```bash
./deployToDocker.sh
```
Above script will create a docker image. Assuming that npm packages already installed using `npm install`.

```bash
npm install
```
Above command will install all the npm dependency defined under `package.json` file.

```bash
npm run compile
```
Above command will compile the typescript files to js(es6) files.

```bash
npm start
```
Above command will start the application.

```bash
npm test
```
Above command will execute the test cases.



### NPM Dependencies

#### Main deps

package   | Usage
---       | ---
bluebird  | Good A+ specs promise library, cost 15% performance degradation but good error handling, no callback hell etc.
debug     | logger for the application.
ejs       | Templating engine.
express   | Nodejs framework
moment    | date time manipluation becomes easy with it.
query-string | for stringify the queries to form the url.

#### Development deps

package   | Usage
---       | ---
mocha     | JS Test framework.
mocha-typescript     | Class based test cases with decorators .
should    | JS Assertion library
supertest | JS HTTP test framework.
tslint    | for linting of typescript.
typescript | typescript to js compiler.
reflect-metadata | metadata for decorators, helps typescript to compile in js with decorators.

Some type definitions also defined under devDependencies.

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
