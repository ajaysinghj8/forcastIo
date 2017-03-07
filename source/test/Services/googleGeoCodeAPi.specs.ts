import { suite, test } from 'mocha-typescript';
import 'should';
import { GeoCodeAPI, APP_CONFIG } from '../../Services';

@suite('GeoCode API')
class GeoCodeAPISpecs {
  private _geocode: GeoCodeAPI;
  constructor() { }
  static before(done: Function) {
    done();
  }

  before() {
    this._geocode = new GeoCodeAPI(APP_CONFIG.GOOGLE_API_KEY);
  }
  @test 'should return data for an address'(done: Function) {
    this._geocode
     .address('delhi')
      .fetch()
      .then((result) => {
        result.should.be.an.Object();
        result.should.have.property('results');
        done();
      });
  }
  @test 'should throw an error'(done: Function) {
    this._geocode
      .fetch()
      .then((result) => {
        done(new Error('it should not work'));
      }).catch((exception) => {
        done();
      });
  }

}
