import { Request, Response } from 'express';
import { GeoCodeAPI, ForcastIOAPI, InMemoryCache, APP_CONFIG } from '../Services';
import * as Moment from 'moment';
import * as Debug from 'debug';

const logger = Debug('app:controllers:weather');

interface ICoordinates {
  lat: number;
  lng: number;
}

/**
 * @class WeatherCtrl
 *  constructor(
 *     GeocodeAPI to get string location to geo coordinates,
 *     forcastAPI gets weather reports based on coordinates and time,
 *     cache wrapping GeocodeAPI results.
 *  )
 *
 */

class WeatherCtrl {
  private _forToday: boolean = false;
  private _forWeekday: boolean = false;

  /**
   * Creates an instance of WeatherCtrl.
   * @param {GeoCodeAPI} _geoCodeApi
   * @param {ForcastIOAPI} _forcastIO
   * @param {InMemoryCache} _cacheGeoCodes
   *
   * @memberOf WeatherCtrl
   */
  constructor(
    private _geoCodeApi: GeoCodeAPI,
    private _forcastIO: ForcastIOAPI,
    private _cacheGeoCodes: InMemoryCache
  ) { }


  forToday() {
    this._forToday = true;
    return this;
  }

  forWeekDay() {
    this._forWeekday = true;
    return this;
  }

  /**
   *
   *Function will be registered as middlerware in the express application.
   * @memberOf WeatherCtrl
   */
  get = (request: Request, response: Response, next: Function) => {
    this._get(request.params).then(
      (report) => {
        if (request.accepts('html')) {
          logger('responding as html');
          return response.render('index', { weather_report: report });
        }
        logger('responding as json');
        return response.json(report);
      },
      (error) => {
        logger(error);
        next(error);
      }
    )
      .catch((exception) => {
        logger(exception);
        next(exception);
      });
    ;
  }

  private _get(params: any) {
    let location = params.location;
    let weekday = params.weekday;
    logger(`Processing new request for ${location} with weekday ${weekday}`);
    return this._getGeoCodesCacheWrapper(location)
      .then((coordinates: ICoordinates) => this._getWeather(coordinates, weekday));
  }

  /**
   *
   *
   * @private
   * @param {ICoordinates} coordinates
   * @param {string} weekday
   * @returns {Promise}
   *
   * @memberOf WeatherCtrl
   * making forcast request from forcastIOAPI with current options.
   * conditions
   * if today then the date will be configure as today for forcastAPI
   *
   * if weekdays then date will be calcuted as
   *   case 1 example if today is monday then request to be made for next monday.
   *   case 2 example if today is monday and requested for sunday then it will process with coming sunday.
   */
  private _getWeather(coordinates: ICoordinates, weekday: string) {
    let forcast = this._forcastIO.setLaltitude(coordinates.lat)
      .setLongitude(coordinates.lng)
      .excludeBlocks(['flags']);

    if (this._forToday) {
      forcast.setTime(Moment());
    }

    if (this._forWeekday) {
      let date = Moment().day(weekday).startOf('day');
      if (Moment().day() >= date.day()) {
        date.add(1, 'weeks');
      }
      forcast.setTime(date);
    }
    logger('fetch called for weather');
    return forcast.fetch();
  }

  /**
   *
   * @private
   * @param {string} location
   * @returns {Promise<any>}
   *
   * @memberOf WeatherCtrl
   * Try cache first if failed then make a request on result cache it.
   *
   */
  private _getGeoCodesCacheWrapper(location: string):Promise<any> {
    return new Promise((resolve, reject) => {
      return this._cacheGeoCodes.get(location).then(
        (coordinates: ICoordinates) => resolve(coordinates),
        () => {
          return this._getGeoCodes(location)
            .tap((coordinates: ICoordinates) => this._cacheGeoCodes.set(location, coordinates))
            .then(resolve, reject);
        });
    });
  }

  /**
   * @private
   * @param {string} location
   * @returns {Promise}
   * @memberOf WeatherCtrl
   *
   * Processing results from gecode API and returning it.
   */
  private _getGeoCodes(location: string) {
    logger(' fresh request for ' + location);
    return this._geoCodeApi
      .address(location)
      .fetch()
      .then((address: any) => {
        try {
          return address.results[0].geometry.location;
        } catch (exception) {
          logger(exception);
          throw new Error('Unknown Location');
        }
      });
  }
}




/**
 *
 *
 * @param {GeoCodeAPI} [geocodeApi=new GeoCodeAPI(APP_CONFIG.GOOGLE_API_KEY)]
 * @param {ForcastIOAPI} [forcastIOAPI=new ForcastIOAPI(APP_CONFIG.FORCAST_API_KEY)]
 * @param {InMemoryCache} [cache=new InMemoryCache('gecode_cache')]
 * @returns {WeatherCtrl}
 *
 * factory for WeatherCtrl
 * default are passed but for mocking these default Injections can be overrideable.
 */

const WeatherCtrlFactory: Function = (
  geocodeApi: GeoCodeAPI = new GeoCodeAPI(APP_CONFIG.GOOGLE_API_KEY),
  forcastIOAPI: ForcastIOAPI = new ForcastIOAPI(APP_CONFIG.FORCAST_API_KEY),
  cache: InMemoryCache = new InMemoryCache('gecode_cache')
): WeatherCtrl => {
  logger(' Creating new instance of weather controller');
  return new WeatherCtrl(geocodeApi, forcastIOAPI, cache);
};

export { WeatherCtrl, WeatherCtrlFactory };
