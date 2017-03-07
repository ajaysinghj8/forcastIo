import { Router, Request, Response } from 'express';
import { WeatherCtrl, WeatherCtrlFactory } from '../Controllers';

/**
 * creating router instance.
 */
const WeatherRouter = Router();

/**
 * Registering middlerwares in router
 *
 **/

WeatherRouter
.get('/:location', WeatherCtrlFactory().get)
.get('/:location/today', WeatherCtrlFactory().forToday().get)
.get('/:location/:weekday', WeatherCtrlFactory().forWeekDay().get);


export { WeatherRouter };
