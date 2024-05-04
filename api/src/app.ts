import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

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
  menuRouter
} = routers;

app.use(menuRouter);


export default app;