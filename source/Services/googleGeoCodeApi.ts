import * as Request from 'request';
import * as Promise from 'bluebird';
const QueryString = require('query-string');

/**
 *
 *
 * @class GeoCodeAPI
 *
 *
 * google maps's geocode api which search address based on text
 * result from google api include coordinates full address etc.
 */

class GeoCodeAPI{
  private _baseUrl: string = 'https://maps.googleapis.com/maps/api/geocode/';
  private _outputFormat: string = 'json';
  private _address: string;
  constructor(private API_KEY: string){}

  private _compiledURIObject() {
    let qs = '?' + QueryString.stringify({
      address : this._address,
      key: this.API_KEY
    });
    return {
      uri :  this._baseUrl + this._outputFormat + qs
    };
  }

  address(val: string ): GeoCodeAPI {
    this._address = val;
    return this;
  }
  private _validateThis(): any {
    let errors: string[] = [];
    if (!this._address) {
      errors.push('Address is not provided');
    }
    if (errors.length) {
      throw new Error(errors.join(','));
    }
  }

  fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._validateThis();
      Request.get(this._compiledURIObject(),
      (error: any, response: Request.RequestResponse, body: any) => {
        if (error) {
              return reject(`GeoCode Api request failed. Error : ${error}`);
            }
          return (response.statusCode !== 200) ?
          reject(`GeoCode Api request failed. Response: ${response.statusCode} ${response.statusMessage}`) :
          resolve(JSON.parse(body));
      });
    });
  }

}

export { GeoCodeAPI };
