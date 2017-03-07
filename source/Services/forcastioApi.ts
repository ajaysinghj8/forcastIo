import * as Request from 'request';
import * as Promise from 'bluebird';
import * as Moment from 'moment';
import * as Path from 'path';
const QueryString = require('query-string');

/**
 *
 *
 * @class ForcastIOAPI
 *
 * Wrapper on raw requests for weather forcast api service provided by darksky.net
 *
 */

class ForcastIOAPI {
  private _baseUrl: string = 'https://api.darksky.net/forecast/';
  private _latitude: number;
  private _longitude: number;
  private _acceptedUnits: string[] = ['auto', 'ca', 'uk2', 'us', 'si'];
  private _acceptedLanguage: string[] = [
    'ar', 'az', 'be', 'bs', 'cs', 'de', 'el', 'en', 'es', 'fr', 'hr', 'hu', 'id',
    'it', 'is', 'kw', 'nb', 'nl', 'pl', 'pt', 'ru', 'sk', 'sr', 'sv', 'tet', 'tr',
    'uk', 'x-pig-latin', 'zh', 'zh-tw'];
  private _query: any = { lang: 'en', units: 'ca' };
  private _time: string;

  /**
   * Creates an instance of ForcastIOAPI.
   * @param {string} API_KEY
   *
   * @memberOf ForcastIOAPI
   *
   * required API to make requests
   */
  constructor(private API_KEY: string) { }

  private _compiledURIObject() {
    let uri = this._baseUrl + Path.join(this.API_KEY, this._latitude + ',' + this._longitude);
    uri = this._time ? (uri + ',' + this._time) : uri;
    uri +=  '?' + QueryString.stringify(this._query);
    return { uri };
  }

  setTime(time: any) {
    if (time) {
      let t = Moment(time);
      if (t.isValid()) {
        this._time = t.format('YYYY-MM-DDTHH:mm:ss');
      }
    }
    return this;
  }

  setLaltitude(val: number): ForcastIOAPI {
    this._latitude = val;
    return this;
  }

  setLongitude(val: number): ForcastIOAPI {
    this._longitude = val;
    return this;
  }

  setLanguage(lang: string) {
    if (this._acceptedLanguage.indexOf(lang) !== -1) {
      this._query.lang = lang;
    }
    return this;
  }

  setUnit(unit: string) {
    if (this._acceptedUnits.indexOf(unit) !== -1) {
      this._query.unit = unit;
    }
    return this;
  }

  excludeBlocks(blocks: string[]) {
    if (blocks && Array.isArray(blocks)) {
      this._query.exclude = blocks.join(',');
    }
    return this;
  }

  private _validateThis(): any {
    let errors: string[] = [];
    if (!this._latitude) {
      errors.push('Laltitude is not provided');
    }
    if (!this._longitude) {
      errors.push('Longitude is not provided.');
    }
    if (errors.length) {
      throw new Error(errors.join(','));
    }
  }

  fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._validateThis();
      console.log(this._compiledURIObject().uri);
      Request.get(this._compiledURIObject(),
        (error: any, response: Request.RequestResponse, body: any) => {
          if (error) {
            return reject(`Forecasting request failed. Error : ${error}`);
          }
          return (response.statusCode !== 200) ?
            reject(`Forecasting request failed. Response: ${response.statusCode} ${response.statusMessage}`) :
            resolve(JSON.parse(body));
        });
    });
  }


}

export { ForcastIOAPI };
