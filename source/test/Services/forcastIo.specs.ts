import { suite, test } from 'mocha-typescript';
import 'should';
import { ForcastIOAPI, APP_CONFIG } from '../../Services';

@suite('ForecastIO API')
class ForcastIOAPISpecs {
  private _forcast: ForcastIOAPI;
  constructor() { }
  static before(done: Function) {
    done();
  }

  before() {
    this._forcast = new ForcastIOAPI(APP_CONFIG.FORCAST_API_KEY);
  }
  @test 'should return data for a latitude and longitude'(done: Function) {
    this._forcast
      .setLaltitude(20.5937)
      .setLongitude(78.9629)
      .fetch()
      .then((report) => {
        report.should.be.an.Object();
        done();
      });
  }
  @test 'should throw an error'(done: Function) {
    this._forcast
      .fetch()
      .then((report) => {
        done(new Error('it should not work'));
      }).catch((exception) => {
        done();
      });
  }

}
