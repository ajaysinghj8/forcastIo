import { boot } from './server';
import {APP_CONFIG} from './Services';
import * as Debug from 'debug';

const logger = Debug('app:boot');

boot({port: APP_CONFIG.PORT, hostname: APP_CONFIG.HOST}).then(() => {
  logger('application booted successfully');
  logger(`Listing on  ${APP_CONFIG.HOST || 'localhost'} :  ${APP_CONFIG.PORT}`);
});
