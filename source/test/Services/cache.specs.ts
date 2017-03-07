import { suite, test } from 'mocha-typescript';
import 'should';
import { InMemoryCache, APP_CONFIG } from '../../Services';

@suite('Cache API')
class CacheAPISpecs {
  private _cache: InMemoryCache;
  private _somedata:any = {name:'xyz'};

  constructor() {
      this._cache = new InMemoryCache('xyz');
  }
  static before(done: Function) {
     done();
  }


  @test 'should be able to store value with key and return data'(done: Function) {
    this._cache.set('akey',this._somedata).then((_data)=>{
          _data.should.be.eql(this._somedata);
          done();
    });
  }
  @test 'should be able to reterive value from cache'(done: Function) {
    this._cache.get('akey').then((_data)=>{
      _data.should.be.eql(this._somedata);
          done();
    });
  }
  @test 'should not be able to reterive value from cache'(done: Function) {
    this._cache.get('bkey').then((_data)=>{
        done(new Error('it should not be working'));
    },
    ()=> done());
  }

}
