import * as HTTPS from 'https';


const Request: any = {
  get: (options:any, cb: Function) => {
      HTTPS.get(options.uri, (resp) => {
        let body = '';
        resp.on('data', (chunk) => body += chunk);
        resp.on('end', () => cb(null, resp, body));
      }).on('error', (error) => cb(error, null, null));
  }
};

export { Request };
