import { readFileSync } from 'fs';
import { join } from 'path';

class ConfigProvider {
  private _config: any = {};
  constructor() {
    try {
      this._config = JSON.parse(readFileSync(join(process.cwd(), 'config.json'), 'utf-8'));
      this._validateThis();
    } catch (exception) {
      // TODO :: look up for process environment variables
      console.log(exception);
      process.exit(1);
    }
  }

  private _validateThis(): any {
    let errors: string[] = [];
    if (!this._config) {
      errors.push('Config is not provided');
    }
    if (!this._config.FORCAST_API_KEY) {
      errors.push('FORCAST_API_KEY must be defined in config.json.');
    }
    if (!this._config.PORT || typeof this._config.PORT !== 'number') {
      errors.push('PORT must be defined in config.json and should be number.');
    }
    if (errors.length) {
      throw new Error(errors.join(','));
    }
  }

  get FORCAST_API_KEY(): string {
    return this._config.FORCAST_API_KEY;
  }
  get GOOGLE_API_KEY(): string {
    return this._config.GOOGLE_API_KEY;
  }
  get HOST(): string {
    return this._config.HOST;
  }
  get PORT(): number {
    return this._config.PORT;
  }

}


const APP_CONFIG = new ConfigProvider();


export { APP_CONFIG };





