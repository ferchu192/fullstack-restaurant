import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const path = require('path');

import { API_CONFIG } from './config'
import routers from './routes';

/* 
 ---------------------------------- CONFIG ----------------------------------
*/
const {
  PORT,
} = API_CONFIG;

const app = express();
app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* 
 ---------------------------------- ROUTERS ----------------------------------
*/
const {
  restaurantRouter,
  productRouter,
  orderRouter,
} = routers;

const pathPublic = path.join(__dirname, '../public');

app.use(restaurantRouter);
app.use(productRouter);
app.use(orderRouter);
app.use('/public', express.static(pathPublic));

export default app;