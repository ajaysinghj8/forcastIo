import { boot } from './server';
import {APP_CONFIG} from './Services';

boot({port: APP_CONFIG.PORT, hostname: APP_CONFIG.HOST}).then(() => {
  console.log('application booted successfully');
});
