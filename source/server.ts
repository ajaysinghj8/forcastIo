import * as Express from 'express';
import * as Promise from 'bluebird';
// import * as BodyParser from 'body-parser';
import * as Path from 'path';
import { WeatherRouter } from './Routes';

const app = Express();

app.set('view engine', 'ejs');

app.use('/static', Express.static(Path.join(process.cwd(), 'static_assests')));

// app.use(BodyParser.urlencoded({
//   extended: true
// }));

// app.use(BodyParser.json());

// Routeing

app.use('/weather', WeatherRouter);


function errorHandler(error: any, request: Express.Request, response: Express.Response, next: Function ):any {
  response.status(500);
  response.send(error.message);
}

function notFoundErrorHandler(request: Express.Request, response: Express.Response, next: Function):any {
  response.status(404);
  // respond with html page
  if (request.accepts('html')) {
    return response.render('404', { url: request.url });
  }

  // respond with json
  if (request.accepts('json')) {
    return response.send({ error: 'Not found' });
  }

  // default to plain-text. send()
 return response.type('txt').send('Not found');
}

app.use(errorHandler);
app.use('*', notFoundErrorHandler);

const boot = (config: {  port: number; hostname?: string; }): Promise<any>  => {
  return new Promise((resolve, reject) => {
     app.listen(config.port, config.hostname || 'localhost', ( ) => {
       return resolve(app);
     });
  });
};

export { boot, app };
