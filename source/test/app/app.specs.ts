import { suite, test } from 'mocha-typescript';
import 'should';
import * as Request from 'supertest';
import { boot, app } from '../../server';
import { APP_CONFIG } from '../../Services';
import * as Moment from 'moment';
import * as Promises from 'bluebird';

@suite('Application Specs')
class ApplicationSpecs {
  constructor() {
  }
  static before(done: Function) {
    done();
  }

  @test 'should be able to boot'(done: Function) {
    boot({ port: APP_CONFIG.PORT }).then(() => {
      done();
    }, (exception) => {
      throw exception;
    });
  }

  @test 'should return a weather forcast'(done: Function) {
    Request(app).get('/weather/delhi')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        response.should.be.an.Object();
        response.body.should.have.property('currently');
        done();
      }, (error) => done(error))
      .catch((exception) => done(exception));
  }

  @test 'should return a weather forcast for today'(done: Function) {
    Request(app).get('/weather/delhi/today')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        response.should.be.an.Object();
        response.body.should.have.property('currently');
        Moment(response.body.currently.time * 1000).format('YYYY-MM-DD').should.be.eql(Moment().format('YYYY-MM-DD'));
        done();
      }, (error) => done(error))
      .catch((exception) => done(exception));
  }

  @test 'should return a weather forcast for  weekdays (if today is monday then it should forcast for next monday)'(done: Function) {
    let promises = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_')
      .map(weekday => this._weekdayRequest(weekday));
    Promise.all(promises).then(
      () => done(),
      (error) => done(error)
    ).catch((exception) => done(exception));
 }

  _weekdayRequest(weekday: string) {
    let date = Moment().day(weekday).startOf('day');
    if (Moment().day() >= date.day()) {
      date.add(1, 'weeks');
    }
    return Request(app).get('/weather/delhi/' + weekday)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        response.should.be.an.Object();
        response.body.should.have.property('currently');
        Moment(response.body.currently.time * 1000).format('YYYY-MM-DD').should.be.eql(date.format('YYYY-MM-DD'));
      });
  }
}
